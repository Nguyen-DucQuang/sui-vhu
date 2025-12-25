import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class SuiService {
  private provider: any = null;
  private logger = new Logger(SuiService.name);
  private JsonRpcProvider: any = null;
  private Connection: any = null;
  private Ed25519Keypair: any = null;
  private RawSigner: any = null;
  private TransactionBlock: any = null;

  constructor() {
    // lazy init so missing ESM package doesn't crash the app at module load
    void this.init();
  }

  private async init() {
    const url = process.env.SUI_RPC_URL || '';
    if (!url) {
      this.logger.warn('SUI_RPC_URL not configured; SuiService will be disabled');
      return;
    }
    try {
      const mod = await import('@mysten/sui.js');
      const m = (mod && (mod.default || mod)) as any;
      // try to map possible export shapes
      this.JsonRpcProvider = m.JsonRpcProvider || m.SuiClient || m.JsonRpcClient || mod.JsonRpcProvider;
      this.Connection = m.Connection || mod.Connection;
      this.Ed25519Keypair = m.Ed25519Keypair || m.Ed25519KeyPair || m.Keypair || mod.Ed25519Keypair;
      this.RawSigner = m.RawSigner || m.RawSigner || mod.RawSigner;
      this.TransactionBlock = m.TransactionBlock || mod.TransactionBlock;

      // try several provider construction patterns for compatibility
      try {
        if (this.Connection && this.JsonRpcProvider) {
          try {
            const conn = new this.Connection({ fullnode: url });
            this.provider = new this.JsonRpcProvider(conn);
          } catch (e) {
            // fallback: JsonRpcProvider may accept plain options
            try {
              this.provider = new this.JsonRpcProvider({ fullnode: url });
            } catch (e2) {
              // final fallback: pass url string
              this.provider = new this.JsonRpcProvider(url);
            }
          }
        } else if (this.JsonRpcProvider) {
          this.provider = new this.JsonRpcProvider({ fullnode: url });
        } else {
          throw new Error('No JsonRpcProvider found in sui.js exports');
        }
      } catch (ctorErr) {
        throw ctorErr;
      }
    } catch (e) {
      this.logger.warn('Failed to init JsonRpcProvider (sui.js)', (e as any)?.message || e);
      this.provider = null;
    }
  }

  async getTransaction(txHash: string) {
    if (!this.provider) throw new Error('SUI RPC not configured');
    if (!txHash) throw new Error('txHash required');
    try {
      // try to fetch by transaction block digest
      if (typeof this.provider.getTransactionBlock === 'function') {
        const result = await this.provider.getTransactionBlock({ digest: txHash });
        return result;
      }
      if (typeof this.provider.getTransactionWithEffects === 'function') {
        const result = await this.provider.getTransactionWithEffects(txHash);
        return result;
      }
      // generic fallback
      const anyProv: any = this.provider;
      if (anyProv.getTransactionBlock) return await anyProv.getTransactionBlock({ digest: txHash });
      if (anyProv.getTransactionWithEffects) return await anyProv.getTransactionWithEffects(txHash);
      throw new Error('Provider does not support transaction queries');
    } catch (e) {
      throw e;
    }
  }

  async mintNFTOnChain(opts: { packageObjectId: string; module: string; func: string; name: string; metadataUrl: string; price?: string | number; gasBudget?: number }) {
    if (!this.provider) throw new Error('SUI RPC not configured');
    const sk = process.env.SUI_PRIVATE_KEY || '';
    if (!sk) throw new Error('SUI_PRIVATE_KEY not configured');
    const secret = this.parseSecretKey(sk);
    if (!secret) throw new Error('SUI_PRIVATE_KEY invalid format');

    const keypair = this.Ed25519Keypair.fromSecretKey(secret);
    const signer = new this.RawSigner(keypair, this.provider);

    const { packageObjectId, module, func, name, metadataUrl, price = '0', gasBudget = 10000000 } = opts;
    const tx = new this.TransactionBlock();
    // Prepare pure arguments: often Move functions expect bytes for strings
    const nameBytes = new TextEncoder().encode(name || '');
    const metadataBytes = new TextEncoder().encode(metadataUrl || '');
    tx.moveCall({
      target: `${packageObjectId}::${module}::${func}`,
      typeArguments: [],
      arguments: [tx.pure(Array.from(nameBytes)), tx.pure(Array.from(metadataBytes)), tx.pure(String(price))],
    });

    const res = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx, options: { showEffects: true } });
    return (res as any)?.digest || (res as any)?.transactionDigest || null;
  }

  private parseSecretKey(str: string) {
    if (!str) return null;
    // strip 0x prefix if present
    let s = str.trim();
    if (s.startsWith('0x') || s.startsWith('0X')) s = s.slice(2);
    // try hex
    try {
      if (/^[0-9a-fA-F]+$/.test(s)) {
        const buf = Buffer.from(s, 'hex');
        return Uint8Array.from(buf);
      }
    } catch {}
    // try base64
    try {
      const buf = Buffer.from(str, 'base64');
      return Uint8Array.from(buf);
    } catch {}
    return null;
  }

  async sendTestTransfer(to: string, amountSui = 0.0001) {
    if (!this.provider) throw new Error('SUI RPC not configured');
    const sk = process.env.SUI_PRIVATE_KEY || '';
    if (!sk) throw new Error('SUI_PRIVATE_KEY not configured');
    const secret = this.parseSecretKey(sk);
    if (!secret) throw new Error('SUI_PRIVATE_KEY invalid format');
    const keypair = this.Ed25519Keypair.fromSecretKey(secret);
    const signer = new this.RawSigner(keypair, this.provider);

    const tx = new this.TransactionBlock();
    tx.transferSui(tx.pure(to), amountSui.toString());

    const res = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx, options: { showEffects: true } });
    return (res as any)?.digest || (res as any)?.transactionDigest || null;
  }
}
