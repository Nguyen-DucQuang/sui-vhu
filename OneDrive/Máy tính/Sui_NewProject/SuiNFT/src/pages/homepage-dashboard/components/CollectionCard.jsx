import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CollectionCard = ({ collection }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-smooth hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] cursor-pointer group flex-shrink-0 w-64 md:w-72 lg:w-80">
      <div className="relative h-32 md:h-40 overflow-hidden">
        <Image 
          src={collection?.bannerImage} 
          alt={collection?.bannerImageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
      </div>
      <div className="p-3 md:p-4 -mt-8 relative">
        <div className="flex items-end gap-3 mb-3">
          <Image 
            src={collection?.logo} 
            alt={collection?.logoAlt}
            className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-4 border-card object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-heading font-bold text-foreground line-clamp-1">{collection?.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1">{collection?.items} items</p>
          </div>
          {collection?.verified && (
            <div className="bg-primary/20 p-1.5 rounded-lg">
              <Icon name="BadgeCheck" size={16} color="var(--color-primary)" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Floor Price</p>
            <p className="text-sm md:text-base font-bold text-foreground data-text">{collection?.floorPrice} ETH</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Volume 24h</p>
            <p className="text-sm md:text-base font-bold text-foreground data-text">{collection?.volume24h} ETH</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Icon name="TrendingUp" size={14} color="var(--color-success)" />
            <span className="text-xs md:text-sm font-medium text-success">{collection?.change24h}</span>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
            <Icon name="Sparkles" size={12} color="var(--color-primary)" />
            <span className="text-xs font-bold text-primary">AI: {collection?.aiScore}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;