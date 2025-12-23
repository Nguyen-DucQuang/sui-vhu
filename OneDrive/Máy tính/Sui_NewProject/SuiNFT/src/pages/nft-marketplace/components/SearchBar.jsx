import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchBar = ({ onSearch, onSortChange, currentSort }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Liên quan nhất' },
    { value: 'price-low', label: 'Giá: Thấp đến cao' },
    { value: 'price-high', label: 'Giá: Cao đến thấp' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'oldest', label: 'Cũ nhất' },
    { value: 'ai-score', label: 'Điểm AI cao nhất' },
    { value: 'trending', label: 'Xu hướng' },
    { value: 'volume', label: 'Khối lượng cao' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Tìm kiếm NFT, bộ sưu tập, hoặc người tạo..."
              className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </form>

        <div className="flex gap-2 md:gap-3">
          <div className="flex-1 md:flex-initial md:w-48">
            <Select
              options={sortOptions}
              value={currentSort}
              onChange={onSortChange}
              placeholder="Sắp xếp"
            />
          </div>

          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`px-4 py-3 bg-card border rounded-xl transition-smooth flex items-center gap-2 ${
              isAdvancedOpen ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'
            }`}
          >
            <Icon name="SlidersHorizontal" size={20} />
            <span className="hidden sm:inline text-sm font-medium">Nâng cao</span>
          </button>
        </div>
      </div>
      {isAdvancedOpen && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Giá tối thiểu (ETH)"
              type="number"
              placeholder="0.0"
              className="w-full"
            />
            <Input
              label="Giá tối đa (ETH)"
              type="number"
              placeholder="100.0"
              className="w-full"
            />
            <Input
              label="Độ tin cậy AI tối thiểu (%)"
              type="number"
              placeholder="0"
              min="0"
              max="100"
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <button
              onClick={() => setIsAdvancedOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              Đóng bộ lọc nâng cao
            </button>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Đặt lại
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-smooth">
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;