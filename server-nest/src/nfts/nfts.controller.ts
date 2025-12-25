import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { SuiService } from '../sui/sui.service';

@Controller('nfts')
export class NftsController {
  constructor(private adminService: AdminService, private sui: SuiService) {}

  // Custodial mint: server pays gas and sends a small transfer (or mint call) to recipient
  @Post('custodial')
  async custodialMint(@Body() body: any) {
    const { name, description, imageDataUrl, publicAddress, mintAmount = 0.0001, mintOnChain = true, mintMode = 'transfer', packageObjectId, module, func } = body || {};
    if (!publicAddress) return { success: false, error: 'publicAddress is required' };

    // create NFT record and emit
    const nft = await this.adminService.createNFTAndEmit({ name, description, imageDataUrl, ownerAddress: publicAddress });

    if (mintOnChain) {
      try {
        let txHash = null;
        if (mintMode === 'move') {
          // require package/module/func or use defaults
          const pkg = packageObjectId || process.env.NFT_MARKETPLACE_PACKAGE_ID || '0x0cabd300d61a61e421644255e443e278d4fcca351ef7839abd38bfacd53897d1';
          const mod = module || 'nft_marketplace';
          const fn = func || 'mint_nft';
          // construct metadata URL placeholder if not provided
          const metadataUrl = imageDataUrl || 'https://example.com/metadata/' + nft.id;
          txHash = await this.sui.mintNFTOnChain({ packageObjectId: pkg, module: mod, func: fn, name: name || '', metadataUrl, price: String(mintAmount), gasBudget: 10000000 });
        } else {
          txHash = await this.sui.sendTestTransfer(publicAddress, mintAmount);
        }

        if (txHash) {
          await this.adminService.recordOnChainEvent(txHash, 'custodial_mint', JSON.stringify({ nftId: nft.id, to: publicAddress, mode: mintMode }));
          await this.adminService.recordTransaction(txHash, publicAddress, nft.id, mintAmount, 'SUI', 'completed', { source: 'custodial_mint', mode: mintMode });
          return { success: true, data: nft, txHash };
        }
      } catch (e) {
        return { success: true, data: nft, warning: 'mint_failed', error: (e as any)?.message || String(e) };
      }
    }

    return { success: true, data: nft };
  }
}
