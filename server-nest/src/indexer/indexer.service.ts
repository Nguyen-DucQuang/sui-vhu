import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

let fetchFn: any = null;
try { fetchFn = (global as any).fetch || require('node-fetch'); } catch (e) {}

@Injectable()
export class IndexerService implements OnModuleInit {
  private readonly logger = new Logger(IndexerService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Simple poller to fetch events from a Sui fullnode URL (if provided) and persist as OnChainEvent
  async start() {
    const url = process.env.SUI_FULLNODE_URL;
    if (!url) {
      this.logger.log('No SUI_FULLNODE_URL configured — indexer idle');
      return;
    }
    this.logger.log('Indexer started — polling ' + url);
    // Start a simple polling loop to fetch recent transactions/events
    const pollInterval = Number(process.env.SUI_INDEX_POLL_MS || 15000);
    const fetchLatest = async () => {
      try {
        const res = await fetchFn(`${url}/txs`);
        const data = await res.json();
        if (Array.isArray(data)) {
          for (const item of data.slice(0, 20)) {
            const txHash = item?.digest || item?.txHash || item?.hash || `tx-${Date.now()}`;
            await this.indexEvent({ txHash, type: 'sui_tx', payload: item });
          }
        } else {
          await this.indexEvent({ source: url, payload: data });
        }
      } catch (e) {
        this.logger.error('Indexer fetch failed: ' + (e?.message || e));
      }
    };
    // initial fetch
    await fetchLatest();
    // periodic
    setInterval(fetchLatest, pollInterval);
  }

  async onModuleInit() {
    // start indexer but don't block bootstrap
    this.start().catch((e) => this.logger.error('Indexer failed to start: ' + (e?.message || e)));
  }

  // Persist event to DB
  async indexEvent(event: any) {
    try {
      await this.prisma.onChainEvent.create({
        data: {
          txHash: event?.txHash || `evt-${Date.now()}`,
          type: event?.type || 'generic',
          payload: typeof (event.payload || event) === 'string' ? (event.payload || event) : JSON.stringify(event.payload || event)
        }
      });
      this.logger.log('Indexed event persisted');
      // Attempt to reconcile with a stored Transaction (if exists)
      try {
        const txHash = event?.txHash;
        if (txHash) {
          const tx = await this.prisma.transaction.findUnique({ where: { txHash } });
          if (tx) {
            await this.prisma.transaction.update({ where: { txHash }, data: { status: 'confirmed' } });
            this.logger.log(`Reconciled transaction ${txHash} -> confirmed`);
          }
        }
      } catch (e) {
        this.logger.error('Reconcile step failed: ' + (e?.message || e));
      }
    } catch (e) {
      this.logger.error('Failed to persist event: ' + (e?.message || e));
    }
  }
}
