import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService, private events: EventsService) {}

  async metrics() {
    const totalUsers = await this.prisma.user.count();
    const totalNFTs = await this.prisma.nFT.count();
    const totalTx = await this.prisma.transaction.count();
    const recentTx = await this.prisma.transaction.findMany({ orderBy: { createdAt: 'desc' }, take: 10 });
    return { totalUsers, totalNFTs, totalTx, recentTx };
  }

  async listUsers() {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });
  }

  async listTransactions() {
    return this.prisma.transaction.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });
  }

  async listNFTs() {
    return this.prisma.nFT.findMany({ orderBy: { createdAt: 'desc' }, take: 200 });
  }

  async createNFT(data: { name?: string; description?: string; imageDataUrl?: string; ownerAddress?: string }) {
    const ownerAddress = data.ownerAddress;
    let ownerId = null;
    if (ownerAddress) {
      const user = await this.createUserIfNotExists(ownerAddress);
      ownerId = user?.id || null;
    }
    return this.prisma.nFT.create({
      data: {
        name: data.name || null,
        metadata: data.description || null,
        image: data.imageDataUrl || null,
        ownerId: ownerId || null,
      },
    });
  }

  // create and emit admin event for realtime updates
  async createNFTAndEmit(data: { name?: string; description?: string; imageDataUrl?: string; ownerAddress?: string }) {
    const created = await this.createNFT(data);
    try {
      this.events.emit('admin_event', { type: 'nft_created', data: created });
    } catch (e) {}
    return created;
  }

  async recordOnChainEvent(txHash: string, type: string, payload: string) {
    if (!txHash) return null;
    try {
      return this.prisma.onChainEvent.create({ data: { txHash, type, payload } });
    } catch (e) {
      return null;
    }
  }

  async recordTransaction(txHash: string, userAddress: string, nftId?: string | null, amount = 0, currency = 'SUI', status = 'completed', metadata: any = {}) {
    if (!txHash || !userAddress) return null;
    // ensure user exists
    const user = await this.createUserIfNotExists(userAddress);
    const tx = await this.prisma.transaction.create({
      data: {
        txHash,
        userId: user?.id || null,
        nftId: nftId || null,
        amount: Number(amount || 0),
        currency,
        status,
        metadata: JSON.stringify(metadata || {}),
      },
    });
    try {
      this.events.emit('admin_event', { type: 'transaction_created', data: tx });
    } catch (e) {}
    return tx;
  }

  async createUserIfNotExists(address: string) {
    if (!address) return null;
    const found = await this.prisma.user.findUnique({ where: { address } });
    if (found) return found;
    return this.prisma.user.create({ data: { address } });
  }
}
