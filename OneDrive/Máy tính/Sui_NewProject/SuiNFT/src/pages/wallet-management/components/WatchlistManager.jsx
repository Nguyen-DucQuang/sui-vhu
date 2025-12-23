import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WatchlistManager = ({ watchlist }) => {
  const [alertPrice, setAlertPrice] = useState('');
  const [selectedNFT, setSelectedNFT] = useState(null);

  const handleSetAlert = (nft) => {
    setSelectedNFT(nft);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
          Danh sách theo dõi
        </h3>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Thêm NFT
        </Button>
      </div>
      <div className="space-y-3 md:space-y-4">
        {watchlist?.map((item) => (
          <div 
            key={item?.id} 
            className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm md:text-base font-heading font-medium text-foreground line-clamp-1">
                  {item?.name}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                  {item?.collection}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4 flex-wrap">
              <div className="text-right">
                <p className="text-sm md:text-base font-medium text-foreground data-text">
                  {item?.currentPrice} ETH
                </p>
                <div className="flex items-center gap-1 justify-end">
                  <Icon 
                    name={item?.priceChange >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                    color={item?.priceChange >= 0 ? 'var(--color-success)' : 'var(--color-error)'} 
                  />
                  <span className={`text-xs md:text-sm ${item?.priceChange >= 0 ? 'text-success' : 'text-error'}`}>
                    {item?.priceChange >= 0 ? '+' : ''}{item?.priceChange}%
                  </span>
                </div>
              </div>

              {item?.alertPrice && (
                <div className="px-2 md:px-3 py-1 bg-warning/10 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Icon name="Bell" size={14} color="var(--color-warning)" />
                    <span className="text-xs md:text-sm text-warning data-text">
                      {item?.alertPrice} ETH
                    </span>
                  </div>
                </div>
              )}

              <Button 
                variant="ghost" 
                size="sm" 
                iconName="Bell"
                onClick={() => handleSetAlert(item)}
              >
                Cảnh báo
              </Button>
            </div>
          </div>
        ))}
      </div>
      {selectedNFT && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h4 className="text-lg md:text-xl font-heading font-bold text-foreground">
                Đặt cảnh báo giá
              </h4>
              <button
                onClick={() => setSelectedNFT(null)}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
                aria-label="Close alert dialog"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="mb-4 md:mb-6">
              <p className="text-sm md:text-base text-muted-foreground mb-2">
                NFT: {selectedNFT?.name}
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Giá hiện tại: <span className="text-foreground font-medium data-text">{selectedNFT?.currentPrice} ETH</span>
              </p>
            </div>

            <Input
              label="Giá cảnh báo (ETH)"
              type="number"
              placeholder="Nhập giá cảnh báo"
              value={alertPrice}
              onChange={(e) => setAlertPrice(e?.target?.value)}
              className="mb-4 md:mb-6"
            />

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setSelectedNFT(null)}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button 
                variant="default"
                onClick={() => {
                  console.log('Setting alert for', selectedNFT?.name, 'at', alertPrice, 'ETH');
                  setSelectedNFT(null);
                  setAlertPrice('');
                }}
                className="flex-1"
              >
                Đặt cảnh báo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistManager;