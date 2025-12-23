import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarNFTs = ({ nfts }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Sparkles" size={24} color="var(--color-accent)" />
          <h3 className="text-lg md:text-xl font-heading font-bold">NFT tương tự</h3>
        </div>
        <Link to="/nft-marketplace">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            Xem tất cả
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts?.map((nft) => (
          <Link
            key={nft?.id}
            to="/nft-details"
            className="group bg-muted/30 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-smooth"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={nft?.image}
                alt={nft?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-success/20 backdrop-blur-sm rounded-lg border border-success/30">
                  <Icon name="Sparkles" size={12} color="var(--color-success)" />
                  <span className="text-xs font-medium text-success">{nft?.aiScore}%</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium mb-2 line-clamp-1 group-hover:text-primary transition-smooth">
                {nft?.name}
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Giá hiện tại</p>
                  <p className="text-sm font-bold data-text">{nft?.price}</p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/20 rounded-lg">
                  <Icon name="TrendingUp" size={12} color="var(--color-success)" />
                  <span className="text-xs font-medium text-success">+{nft?.change}%</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarNFTs;