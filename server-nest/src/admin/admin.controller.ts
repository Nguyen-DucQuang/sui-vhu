import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guard';
import { EventsService } from '../events/events.service';
import { SuiService } from '../sui/sui.service';
import * as crypto from 'crypto';

@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private eventsService: EventsService,
    private suiService: SuiService,
  ) {}

  private signToken(user: string, ttlSeconds = 3600) {
    const secret = process.env.ADMIN_JWT_SECRET || 'devsecret';
    const payload = { user, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
    const b64 = Buffer.from(JSON.stringify(payload)).toString('base64');
    const sig = crypto.createHmac('sha256', secret).update(b64).digest('hex');
    return `${b64}.${sig}`;
  }

  private verifyToken(token: string) {
    try {
      const secret = process.env.ADMIN_JWT_SECRET || 'devsecret';
      const parts = token.split('.');
      if (parts.length !== 2) return null;
      const [b64, sig] = parts;
      const calc = crypto.createHmac('sha256', secret).update(b64).digest('hex');
      if (calc !== sig) return null;
      const payload = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
      if (!payload || !payload.user || !payload.exp) return null;
      if (payload.exp < Math.floor(Date.now() / 1000)) return null;
      return payload;
    } catch (e) {
      return null;
    }
  }

  @Get('metrics')
  @UseGuards(AdminGuard)
  async metrics() {
    return { success: true, data: await this.adminService.metrics() };
  }

  @Get('health')
  async health() {
    return { success: true, status: 'ok' };
  }

  @Get('users')
  @UseGuards(AdminGuard)
  async users() {
    return { success: true, data: await this.adminService.listUsers() };
  }

  @Get('transactions')
  @UseGuards(AdminGuard)
  async transactions() {
    return { success: true, data: await this.adminService.listTransactions() };
  }

  @Get('nfts')
  @UseGuards(AdminGuard)
  async nfts() {
    return { success: true, data: await this.adminService.listNFTs() };
  }

  @Post('nfts')
  @UseGuards(AdminGuard)
  async createNft(@Body() body: any) {
    // Require a public address for transparency (owner's public Sui address)
    const publicAddress = body.publicAddress || body.mintTo || process.env.ADMIN_SUI_ADDRESS || '';
    if (!publicAddress) {
      return { success: false, error: 'publicAddress is required' };
    }

    // Accepts JSON with optional imageDataUrl (data URL) or name/description
    const created = await this.adminService.createNFTAndEmit({
      name: body.name,
      description: body.description,
      imageDataUrl: body.imageDataUrl,
      ownerAddress: publicAddress,
    });

    // optional server-side test transfer to produce a txHash you can view on explorer
    if (body.mintOnChain) {
      try {
        const to = publicAddress;
        const amount = typeof body.mintAmount === 'number' ? body.mintAmount : 0.0001;
        if (to) {
          const txHash = await this.suiService.sendTestTransfer(to, amount);
          if (txHash) {
            await this.adminService.recordOnChainEvent(txHash, 'nft_upload', JSON.stringify({ nftId: created.id, owner: publicAddress }));
            (created as any).onChainTx = txHash;
          }
        }
      } catch (e) {
        // ignore Sui errors; NFT still created locally
      }
    }

    return { success: true, data: created };
  }

  @Get('stream')
  @UseGuards(AdminGuard)
  async stream(@Req() req, @Res() res) {
    // Server-Sent Events endpoint
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();
    const onEvent = (payload) => {
      try {
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
      } catch (e) {}
    };
    // subscribe to all events
    const unsubscribe = this.eventsService.on('admin_event', onEvent);
    req.on('close', () => {
      unsubscribe();
    });
  }

  @Post('login')
  async login(@Body() body: any) {
    const { user, pass } = body || {};
    const ADMIN_USER = process.env.ADMIN_USER || 'Admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'Admin16';
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      const token = this.signToken(user, 60 * 60); // 1h
      return { success: true, token };
    }
    return { success: false, error: 'Invalid credentials' };
  }
}
