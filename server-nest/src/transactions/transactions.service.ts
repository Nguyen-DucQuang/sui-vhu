import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from '../events/events.service';
import { SuiService } from '../sui/sui.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService, private events: EventsService, private sui: SuiService) {}

  async completeTransaction(payload: any) {
    const {
      txHash,
      userAddress,
      userEmail,
      userName,
      nftObjectId,
      nftName,
      amount,
      currency = 'SUI',
      status = 'completed',
      metadata = {},
    } = payload;

    if (!txHash || !userAddress) {
      throw new Error('txHash and userAddress are required');
    }

    // Verify tx on-chain when possible
    try {
      const txInfo = await this.sui.getTransaction(txHash).catch(() => null);
      if (!txInfo) {
        throw new Error('txHash not found on chain');
      }
      // optionally inspect txInfo to ensure it involves userAddress or succeeded
    } catch (e) {
      throw new Error(`Transaction verification failed: ${e.message || e}`);
    }

    // upsert user by address
    const user = await this.prisma.user.upsert({
      where: { address: userAddress },
      create: { address: userAddress, email: userEmail || null, name: userName || null },
      update: { email: userEmail || undefined, name: userName || undefined },
    });

    // upsert NFT by objectId if provided
    let nft = null;
    if (nftObjectId) {
      nft = await this.prisma.nFT.upsert({
        where: { objectId: nftObjectId },
        create: {
          objectId: nftObjectId,
          name: nftName || null,
          ownerId: user.id,
          metadata: JSON.stringify(metadata || {}),
        },
        update: {
          name: nftName || undefined,
          ownerId: user.id,
          metadata: JSON.stringify(metadata || {}),
        },
      });
    }

    // create transaction record
    const tx = await this.prisma.transaction.create({
      data: {
        txHash,
        userId: user.id,
        nftId: nft ? nft.id : null,
        amount: Number(amount || 0),
        currency,
        status,
        metadata: JSON.stringify(metadata || {}),
      },
    });

    try {
      this.events.emit('admin_event', { type: 'transaction_created', data: tx });
    } catch (e) {}

    return { user, nft, transaction: tx };
  }

  async findByHash(txHash: string) {
    return this.prisma.transaction.findUnique({ where: { txHash } });
  }

  async findByUserAddress(address: string, page = 1, size = 20) {
    const user = await this.prisma.user.findUnique({
      where: { address },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * size,
          take: size,
          include: { nft: true },
        },
      },
    });

    if (!user) return { user: null, transactions: [], total: 0 };

    const total = await this.prisma.transaction.count({ where: { userId: user.id } });

    return { user, transactions: user.transactions, total };
  }
}
