import React from 'react';
import { ConnectButton } from '@mysten/dapp-kit';
import Icon from '../../../components/AppIcon';

const WalletConnection = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <Icon name="Wallet" size={32} color="var(--color-primary)" />
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2 md:mb-3">
          Kết nối ví Sui của bạn
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Kết nối ví Sui để quản lý iNFT và theo dõi danh mục đầu tư AI của bạn năm 2025
        </p>
        <div className="flex justify-center">
          <ConnectButton connectText="Kết nối Ví Sui" />
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
