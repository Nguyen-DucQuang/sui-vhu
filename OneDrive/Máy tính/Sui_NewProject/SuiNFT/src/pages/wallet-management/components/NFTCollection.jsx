import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const NFTCollection = ({ nft }) => {
  const gainLoss = nft?.currentValue - nft?.purchasePrice;
  const gainLossPercent = ((gainLoss / nft?.purchasePrice) * 100)?.toFixed(2);
  const isProfit = gainLoss >= 0;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-smooth group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={nft?.image}
          alt={nft?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-primary/90 backdrop-blur-sm px-2 md:px-3 py-1 rounded-lg">
          <div className="flex items-center gap-1">
            <Icon name="Sparkles" size={14} color="white" />
            <span className="text-xs md:text-sm font-medium text-white">{nft?.aiConfidence}%</span>
          </div>
        </div>
      </div>
      <div className="p-3 md:p-4 lg:p-5">
        <h4 className="text-base md:text-lg font-heading font-medium text-foreground mb-1 md:mb-2 line-clamp-1">
          {nft?.name}
        </h4>
        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-1">
          {nft?.collection}
        </p>

        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-muted-foreground">Giá mua</span>
            <span className="text-xs md:text-sm font-medium text-foreground data-text">
              {nft?.purchasePrice?.toFixed(2)} ETH
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-muted-foreground">Giá hiện tại</span>
            <span className="text-xs md:text-sm font-medium text-foreground data-text">
              {nft?.currentValue?.toFixed(2)} ETH
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-border">
            <span className="text-xs md:text-sm text-muted-foreground">Lãi/Lỗ</span>
            <div className="flex items-center gap-1 md:gap-2">
              <Icon 
                name={isProfit ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                color={isProfit ? 'var(--color-success)' : 'var(--color-error)'} 
              />
              <span className={`text-xs md:text-sm font-medium data-text ${isProfit ? 'text-success' : 'text-error'}`}>
                {isProfit ? '+' : ''}{gainLoss?.toFixed(2)} ETH ({isProfit ? '+' : ''}{gainLossPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCollection;