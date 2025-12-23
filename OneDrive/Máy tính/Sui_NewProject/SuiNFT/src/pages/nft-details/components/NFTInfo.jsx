import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NFTInfo = ({ nft }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2">{nft?.name}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{nft?.description}</p>
          </div>
          <button
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
            aria-label="Add to favorites"
          >
            <Icon name="Heart" size={24} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={nft?.collectionAvatar}
              alt={nft?.collectionAvatarAlt}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <p className="text-xs text-muted-foreground">Bộ sưu tập</p>
              <p className="text-sm md:text-base font-medium">{nft?.collection}</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-xs text-muted-foreground">Token ID</p>
            <p className="text-sm md:text-base font-medium data-text">{nft?.tokenId}</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-xs text-muted-foreground">Blockchain</p>
            <div className="flex items-center gap-1.5">
              <Icon name="Link" size={14} color="var(--color-primary)" />
              <p className="text-sm md:text-base font-medium">{nft?.blockchain}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
        <h3 className="text-lg font-heading font-bold mb-4">Thông tin chủ sở hữu</h3>
        <div className="flex items-center gap-3 md:gap-4">
          <Image
            src={nft?.ownerAvatar}
            alt={nft?.ownerAvatarAlt}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-base md:text-lg font-medium">{nft?.ownerName}</p>
              <Icon name="BadgeCheck" size={16} color="var(--color-primary)" />
            </div>
            <p className="text-sm text-muted-foreground data-text">{nft?.ownerAddress}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <Icon name="Image" size={14} color="var(--color-muted-foreground)" />
                <span className="text-xs text-muted-foreground">{nft?.ownerNFTs} NFTs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Users" size={14} color="var(--color-muted-foreground)" />
                <span className="text-xs text-muted-foreground">{nft?.ownerFollowers} người theo dõi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
        <h3 className="text-lg font-heading font-bold mb-4">Đặc điểm hiếm</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {nft?.traits?.map((trait, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase">{trait?.type}</span>
                <span className="text-xs font-medium text-primary">{trait?.rarity}%</span>
              </div>
              <p className="text-sm font-medium">{trait?.value}</p>
              <div className="mt-2 w-full h-1.5 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${100 - trait?.rarity}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTInfo;