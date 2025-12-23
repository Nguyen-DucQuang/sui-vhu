import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FeaturedCollections = ({ collections }) => {
  const getChangeColor = (change) => {
    return change >= 0 ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
          Bộ sưu tập nổi bật
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth flex items-center gap-1">
          Xem tất cả
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {collections?.map((collection) => (
          <div
            key={collection?.id}
            className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-32 md:h-40 overflow-hidden">
              <Image
                src={collection?.banner}
                alt={collection?.bannerAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={collection?.avatar}
                    alt={collection?.avatarAlt}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-background"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm md:text-base font-heading font-semibold text-foreground">
                        {collection?.name}
                      </h3>
                      {collection?.verified && (
                        <Icon name="BadgeCheck" size={16} color="var(--color-primary)" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{collection?.items} items</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Sàn</p>
                  <div className="flex items-center gap-1">
                    <Icon name="Coins" size={14} color="var(--color-accent)" />
                    <span className="text-sm font-medium text-foreground data-text">{collection?.floorPrice}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Khối lượng</p>
                  <span className="text-sm font-medium text-foreground data-text">{collection?.volume}</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">24h</p>
                  <div className={`flex items-center gap-1 ${getChangeColor(collection?.change24h)}`}>
                    <Icon 
                      name={collection?.change24h >= 0 ? "TrendingUp" : "TrendingDown"} 
                      size={12} 
                    />
                    <span className="text-sm font-medium data-text">
                      {collection?.change24h >= 0 ? '+' : ''}{collection?.change24h}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Icon name="Sparkles" size={14} color="var(--color-accent)" />
                  <span className="text-xs text-muted-foreground">AI Score</span>
                  <span className="text-sm font-medium text-success data-text">{collection?.aiScore}%</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Users" size={12} />
                  <span>{collection?.owners}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;