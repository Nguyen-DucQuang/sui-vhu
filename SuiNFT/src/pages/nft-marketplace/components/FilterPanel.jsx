import React from 'react';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount,
  isMobileOpen,
  onMobileClose 
}) => {
  const categories = [
    { value: 'art', label: 'Nghệ thuật', count: 1247 },
    { value: 'gaming', label: 'Game', count: 892 },
    { value: 'music', label: 'Âm nhạc', count: 634 },
    { value: 'photography', label: 'Nhiếp ảnh', count: 521 },
    { value: 'sports', label: 'Thể thao', count: 389 },
    { value: 'virtual-worlds', label: 'Thế giới ảo', count: 267 }
  ];

  const blockchains = [
    { value: 'ethereum', label: 'Ethereum', icon: 'Coins' },
    { value: 'solana', label: 'Solana', icon: 'Zap' },
    { value: 'polygon', label: 'Polygon', icon: 'Triangle' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Tất cả giá' },
    { value: '0-1', label: '< 1 ETH' },
    { value: '1-5', label: '1 - 5 ETH' },
    { value: '5-10', label: '5 - 10 ETH' },
    { value: '10+', label: '> 10 ETH' }
  ];

  const handleCategoryToggle = (categoryValue) => {
    const newCategories = filters?.categories?.includes(categoryValue)
      ? filters?.categories?.filter(c => c !== categoryValue)
      : [...filters?.categories, categoryValue];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBlockchainToggle = (blockchain) => {
    const newBlockchains = filters?.blockchains?.includes(blockchain)
      ? filters?.blockchains?.filter(b => b !== blockchain)
      : [...filters?.blockchains, blockchain];
    onFilterChange({ ...filters, blockchains: newBlockchains });
  };

  const panelContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-foreground">Bộ lọc</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-primary hover:text-primary/80 transition-smooth flex items-center gap-1"
        >
          <Icon name="RotateCcw" size={16} />
          Xóa tất cả
        </button>
      </div>

      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Kết quả tìm thấy</span>
          <span className="text-lg font-heading font-bold text-primary data-text">{resultCount}</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Danh mục</label>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div
              key={category?.value}
              className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-smooth cursor-pointer"
              onClick={() => handleCategoryToggle(category?.value)}
            >
              <Checkbox
                checked={filters?.categories?.includes(category?.value)}
                onChange={() => handleCategoryToggle(category?.value)}
                label={category?.label}
              />
              <span className="text-xs text-muted-foreground data-text">{category?.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Khoảng giá</label>
        <Select
          options={priceRanges}
          value={filters?.priceRange}
          onChange={(value) => onFilterChange({ ...filters, priceRange: value })}
          placeholder="Chọn khoảng giá"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Blockchain</label>
        <div className="space-y-2">
          {blockchains?.map((blockchain) => (
            <div
              key={blockchain?.value}
              className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-lg transition-smooth cursor-pointer"
              onClick={() => handleBlockchainToggle(blockchain?.value)}
            >
              <Checkbox
                checked={filters?.blockchains?.includes(blockchain?.value)}
                onChange={() => handleBlockchainToggle(blockchain?.value)}
              />
              <Icon name={blockchain?.icon} size={16} color="var(--color-accent)" />
              <span className="text-sm text-foreground">{blockchain?.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Độ tin cậy AI</label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={filters?.aiConfidence}
            onChange={(e) => onFilterChange({ ...filters, aiConfidence: parseInt(e?.target?.value) })}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">0%</span>
            <span className="text-sm font-medium text-primary data-text">{filters?.aiConfidence}%</span>
            <span className="text-xs text-muted-foreground">100%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Trạng thái</label>
        <div className="space-y-2">
          <Checkbox
            checked={filters?.hasOffers}
            onChange={(e) => onFilterChange({ ...filters, hasOffers: e?.target?.checked })}
            label="Có đề nghị"
          />
          <Checkbox
            checked={filters?.onAuction}
            onChange={(e) => onFilterChange({ ...filters, onAuction: e?.target?.checked })}
            label="Đang đấu giá"
          />
          <Checkbox
            checked={filters?.buyNow}
            onChange={(e) => onFilterChange({ ...filters, buyNow: e?.target?.checked })}
            label="Mua ngay"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-80 bg-card border border-border rounded-xl p-6 h-fit sticky top-24">
        {panelContent}
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 z-[1150] lg:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border overflow-y-auto scrollbar-custom animate-slide-in-right">
            <div className="p-6">
              <button
                onClick={onMobileClose}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
              {panelContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;