import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NFTPreview = ({ fileData, metadata, config }) => {
  const hasRequiredData = fileData && metadata?.name && config?.price;

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 sticky top-24">
      <h3 className="text-lg md:text-xl font-heading font-semibold mb-4 md:mb-6">
        Xem trước NFT
      </h3>
      {!hasRequiredData ? (
        <div className="text-center py-12 md:py-16">
          <Icon name="Eye" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-sm md:text-base text-muted-foreground">
            Điền thông tin để xem trước NFT
          </p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          <div className="aspect-square w-full bg-muted rounded-xl overflow-hidden">
            {fileData?.type?.startsWith('image/') ? (
              <Image
                src={URL.createObjectURL(fileData)}
                alt={`Preview of NFT artwork titled ${metadata?.name || 'Untitled'} showing the uploaded image`}
                className="w-full h-full object-cover"
              />
            ) : fileData?.type?.startsWith('video/') ? (
              <video
                src={URL.createObjectURL(fileData)}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="Box" size={64} color="var(--color-primary)" />
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xl md:text-2xl font-heading font-bold mb-2">
              {metadata?.name || 'Untitled NFT'}
            </h4>
            {metadata?.collection && (
              <p className="text-sm md:text-base text-primary mb-3">
                {metadata?.collection}
              </p>
            )}
            {metadata?.description && (
              <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
                {metadata?.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">
                {config?.listingType === 'auction' ? 'Giá khởi điểm' : 'Giá bán'}
              </p>
              <p className="text-xl md:text-2xl font-heading font-bold">
                {config?.price || '0.00'} {config?.blockchain === 'ethereum' ? 'ETH' : 'SOL'}
              </p>
            </div>
            {config?.listingType === 'auction' && (
              <div className="text-right">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Thời gian</p>
                <p className="text-base md:text-lg font-semibold">
                  {config?.auctionDuration || '7'} ngày
                </p>
              </div>
            )}
          </div>

          {metadata?.traits && metadata?.traits?.length > 0 && metadata?.traits?.[0]?.name && (
            <div>
              <h5 className="text-sm md:text-base font-heading font-semibold mb-3">Thuộc tính</h5>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {metadata?.traits?.filter(t => t?.name && t?.value)?.map((trait, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{trait?.name}</p>
                    <p className="text-sm md:text-base font-semibold truncate">{trait?.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Blockchain</span>
              <span className="font-medium capitalize">{config?.blockchain || 'Ethereum'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phí bản quyền</span>
              <span className="font-medium">{config?.royalty || 0}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Số lượng</span>
              <span className="font-medium">{config?.supply || 1}</span>
            </div>
            {config?.unlockableContent && (
              <div className="flex items-center gap-2 text-accent">
                <Icon name="Lock" size={14} />
                <span>Có nội dung mở khóa</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Đây là bản xem trước, NFT thực tế có thể khác</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTPreview;