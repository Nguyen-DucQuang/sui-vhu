import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ListingConfiguration = ({ config, onChange, errors }) => {
  const blockchainOptions = [
    { value: 'ethereum', label: 'Ethereum (ETH)' },
    { value: 'solana', label: 'Solana (SOL)' },
    { value: 'polygon', label: 'Polygon (MATIC)' },
    { value: 'binance', label: 'BNB Chain (BNB)' }
  ];

  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">Loại niêm yết</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <button
            type="button"
            onClick={() => handleChange('listingType', 'fixed')}
            className={`p-4 md:p-6 border-2 rounded-xl transition-all duration-250 ${
              config?.listingType === 'fixed' ?'border-primary bg-primary/10' :'border-border hover:border-primary/50'
            }`}
          >
            <Icon
              name="DollarSign"
              size={32}
              color={config?.listingType === 'fixed' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
              className="mx-auto mb-3"
            />
            <p className="text-sm md:text-base font-semibold mb-1">Giá cố định</p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Bán với giá xác định
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleChange('listingType', 'auction')}
            className={`p-4 md:p-6 border-2 rounded-xl transition-all duration-250 ${
              config?.listingType === 'auction' ?'border-primary bg-primary/10' :'border-border hover:border-primary/50'
            }`}
          >
            <Icon
              name="Gavel"
              size={32}
              color={config?.listingType === 'auction' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
              className="mx-auto mb-3"
            />
            <p className="text-sm md:text-base font-semibold mb-1">Đấu giá</p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Người trả giá cao nhất thắng
            </p>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          label={config?.listingType === 'auction' ? 'Giá khởi điểm' : 'Giá bán'}
          type="number"
          placeholder="0.00"
          value={config?.price}
          onChange={(e) => handleChange('price', e?.target?.value)}
          error={errors?.price}
          required
          description={config?.blockchain === 'ethereum' ? 'ETH' : 'SOL'}
        />

        <Select
          label="Blockchain"
          options={blockchainOptions}
          value={config?.blockchain}
          onChange={(value) => handleChange('blockchain', value)}
          required
          error={errors?.blockchain}
        />
      </div>
      {config?.listingType === 'auction' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Thời gian đấu giá"
            type="number"
            placeholder="7"
            value={config?.auctionDuration}
            onChange={(e) => handleChange('auctionDuration', e?.target?.value)}
            description="Số ngày"
          />

          <Input
            label="Giá mua ngay (tùy chọn)"
            type="number"
            placeholder="0.00"
            value={config?.buyNowPrice}
            onChange={(e) => handleChange('buyNowPrice', e?.target?.value)}
            description="Kết thúc đấu giá sớm"
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-3">
          Phí bản quyền
          <span className="text-muted-foreground font-normal ml-2">({config?.royalty}%)</span>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={config?.royalty}
          onChange={(e) => handleChange('royalty', e?.target?.value)}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs md:text-sm text-muted-foreground mt-2">
          <span>0%</span>
          <span>5%</span>
          <span>10%</span>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mt-2">
          Bạn sẽ nhận {config?.royalty}% từ mỗi lần bán lại
        </p>
      </div>
      <div>
        <Input
          label="Số lượng (Editions)"
          type="number"
          placeholder="1"
          value={config?.supply}
          onChange={(e) => handleChange('supply', e?.target?.value)}
          description="Số lượng bản sao NFT này"
          min="1"
        />
      </div>
      <div className="space-y-3 md:space-y-4">
        <Checkbox
          label="Nội dung có thể mở khóa"
          description="Thêm nội dung đặc biệt chỉ người mua mới xem được"
          checked={config?.unlockableContent}
          onChange={(e) => handleChange('unlockableContent', e?.target?.checked)}
        />

        <Checkbox
          label="Nội dung nhạy cảm"
          description="Đánh dấu nếu NFT chứa nội dung người lớn hoặc nhạy cảm"
          checked={config?.explicitContent}
          onChange={(e) => handleChange('explicitContent', e?.target?.checked)}
        />

        <Checkbox
          label="Lazy Minting"
          description="Tiết kiệm gas fee, chỉ mint khi có người mua"
          checked={config?.lazyMinting}
          onChange={(e) => handleChange('lazyMinting', e?.target?.checked)}
        />
      </div>
      {config?.unlockableContent && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Nội dung mở khóa
          </label>
          <textarea
            value={config?.unlockableText}
            onChange={(e) => handleChange('unlockableText', e?.target?.value)}
            placeholder="Link tải file, mã code, hoặc thông tin đặc biệt..."
            rows={3}
            className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-250 resize-none"
          />
        </div>
      )}
    </div>
  );
};

export default ListingConfiguration;