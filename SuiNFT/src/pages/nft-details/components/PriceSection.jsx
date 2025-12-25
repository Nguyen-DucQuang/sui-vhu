import React, { useState } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Toast from '../../../components/ui/Toast';

const PriceSection = ({ nft }) => {
  const currentAccount = useCurrentAccount();
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [alertPrice, setAlertPrice] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleBuyNow = () => {
    if (!currentAccount) {
      setToast({
        message: 'Vui lòng kết nối ví Sui để thực hiện mua hàng!',
        type: 'warning'
      });
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const confirmPurchase = () => {
    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('sui_nft_orders') || '[]');
    const newOrder = {
      id: `ORD-${Date.now()}`,
      name: nft?.name,
      collection: nft?.collection,
      price: nft?.price,
      image: nft?.image,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'Đã hoàn thành'
    };
    localStorage.setItem('sui_nft_orders', JSON.stringify([newOrder, ...existingOrders]));
    
    // Trigger Header update
    window.dispatchEvent(new Event('ordersUpdated'));

    setToast({
      message: `Chúc mừng! Bạn đã mua thành công ${nft?.name}`,
      type: 'success'
    });
    setIsConfirmModalOpen(false);
  };

  const handleMakeOffer = () => {
    console.log('Making offer for:', nft?.name);
  };

  const handleAddToWatchlist = () => {
    console.log('Added to watchlist:', nft?.name);
  };

  const handleSetAlert = () => {
    if (alertPrice) {
      console.log('Price alert set at:', alertPrice, 'ETH');
      setShowPriceAlert(false);
      setAlertPrice('');
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Giá hiện tại</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary">{nft?.price}</h2>
              <span className="text-lg md:text-xl text-muted-foreground">ETH</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">≈ ${nft?.usdPrice}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/20 rounded-lg border border-success/30">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">+{nft?.priceChange}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 rounded-lg border border-primary/30">
            <Icon name="Sparkles" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium">AI Confidence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-32 md:w-40 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500"
                style={{ width: `${nft?.aiConfidence}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary">{nft?.aiConfidence}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="ShoppingCart"
            iconPosition="left"
            onClick={handleBuyNow}
          >
            Mua ngay
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              iconName="Tag"
              iconPosition="left"
              onClick={handleMakeOffer}
            >
              Đưa ra giá
            </Button>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              iconName="Eye"
              iconPosition="left"
              onClick={handleAddToWatchlist}
            >
              Theo dõi
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-bold">Thông tin giao dịch</h3>
          <button
            onClick={() => setShowPriceAlert(!showPriceAlert)}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg transition-smooth"
          >
            <Icon name="Bell" size={16} />
            <span className="text-sm">Cảnh báo giá</span>
          </button>
        </div>

        {showPriceAlert && (
          <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-3">Nhận thông báo khi giá đạt:</p>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={alertPrice}
                onChange={(e) => setAlertPrice(e?.target?.value)}
                className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                variant="default"
                size="default"
                onClick={handleSetAlert}
              >
                Đặt
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Khối lượng 24h</span>
            <span className="text-sm font-medium">{nft?.volume24h} ETH</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Giá sàn</span>
            <span className="text-sm font-medium">{nft?.floorPrice} ETH</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Giá cao nhất</span>
            <span className="text-sm font-medium">{nft?.highestSale} ETH</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Phí Gas ước tính</span>
            <div className="flex items-center gap-1.5">
              <Icon name="Fuel" size={14} color="var(--color-accent)" />
              <span className="text-sm font-medium text-accent">{nft?.gasEstimate} Gwei</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Icon name="ShoppingCart" size={24} color="var(--color-primary)" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">Xác nhận mua hàng</h3>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                <img src={nft?.image} alt={nft?.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-foreground">{nft?.name}</p>
                  <p className="text-sm text-muted-foreground">{nft?.collection}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Giá sản phẩm</span>
                <span className="font-bold text-foreground">{nft?.price} SUI</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Phí mạng lưới (ước tính)</span>
                <span className="text-foreground">~0.001 SUI</span>
              </div>
              <div className="flex justify-between items-center py-2 pt-4">
                <span className="font-bold text-foreground">Tổng cộng</span>
                <span className="text-xl font-bold text-primary">{nft?.price} SUI</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsConfirmModalOpen(false)}
                className="flex-1 px-6 py-3 bg-muted hover:bg-muted/80 rounded-xl font-medium transition-smooth"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={confirmPurchase}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium transition-smooth shadow-lg shadow-primary/20"
              >
                Xác nhận Mua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceSection;
