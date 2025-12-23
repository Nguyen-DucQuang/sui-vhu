import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NFTCard = ({ nft, onViewDetails }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-smooth hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] group">
      <div className="relative aspect-square overflow-hidden">
        <Image 
          src={nft?.image} 
          alt={nft?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-2 md:px-3 py-1 rounded-lg flex items-center gap-1">
          <Icon name="Sparkles" size={14} color="white" />
          <span className="text-xs md:text-sm font-bold text-white">{nft?.aiConfidence}%</span>
        </div>
        {nft?.isHot && (
          <div className="absolute top-3 left-3 bg-error/90 backdrop-blur-sm px-2 md:px-3 py-1 rounded-lg flex items-center gap-1">
            <Icon name="Flame" size={14} color="white" />
            <span className="text-xs md:text-sm font-bold text-white">Hot</span>
          </div>
        )}
      </div>
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-heading font-bold text-foreground line-clamp-1">{nft?.name}</h4>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{nft?.collection}</p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <Image 
              src={nft?.creatorAvatar} 
              alt={nft?.creatorAvatarAlt}
              className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-primary"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Giá hiện tại</p>
            <p className="text-base md:text-lg font-bold text-foreground data-text">{nft?.price} ETH</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Dự đoán 24h</p>
            <p className={`text-sm md:text-base font-bold ${nft?.prediction > 0 ? 'text-success' : 'text-error'}`}>
              {nft?.prediction > 0 ? '+' : ''}{nft?.prediction}%
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            fullWidth
            iconName="ShoppingCart"
            iconPosition="left"
            onClick={() => onViewDetails(nft?.id)}
          >
            Mua ngay
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            iconName="Eye"
            onClick={() => onViewDetails(nft?.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default NFTCard;