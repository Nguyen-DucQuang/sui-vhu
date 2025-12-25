import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionHistory = ({ transactions = [], onLoadMore, hasMore = false, isLoading = false }) => {
  const [filter, setFilter] = useState('all');

  const parseGas = (tx) => {
    try {
      if (tx?.metadata) {
        const m = typeof tx.metadata === 'string' ? JSON.parse(tx.metadata) : tx.metadata;
        return m?.gasFee ?? tx?.gasFee ?? '—';
      }
    } catch (e) {}
    return tx?.gasFee ?? '—';
  };

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions?.filter(tx => tx?.type === filter);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'buy': return 'ShoppingCart';
      case 'sell': return 'DollarSign';
      case 'transfer': return 'ArrowRightLeft';
      case 'mint': return 'Sparkles';
      default: return 'Activity';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'buy': return 'var(--color-primary)';
      case 'sell': return 'var(--color-success)';
      case 'transfer': return 'var(--color-warning)';
      case 'mint': return 'var(--color-accent)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'buy': return 'Mua';
      case 'sell': return 'Bán';
      case 'transfer': return 'Chuyển';
      case 'mint': return 'Tạo';
      default: return 'Khác';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
          Lịch sử giao dịch
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto">
          {['all', 'buy', 'sell', 'transfer', 'mint']?.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${
                filter === type 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {type === 'all' ? 'Tất cả' : getTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2 md:space-y-3 max-h-96 md:max-h-[500px] overflow-y-auto scrollbar-custom">
        {filteredTransactions?.map((tx) => (
          <div 
            key={tx?.id} 
            className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-card rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name={getTypeIcon(tx?.type)} size={20} color={getTypeColor(tx?.type)} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                  {tx?.nftName}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">{tx?.date}</p>
              </div>
            </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4">
              <div className="text-right">
                <p className="text-sm md:text-base font-medium text-foreground data-text">
                  {tx?.amount} {tx?.currency || 'SUI'}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground data-text">
                  Gas: {parseGas(tx)} {tx?.currency || 'SUI'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-2 md:px-3 py-1 rounded-lg ${
                  tx?.status === 'completed' ? 'bg-success/10' : 
                  tx?.status === 'pending' ? 'bg-warning/10' : 'bg-error/10'
                }`}>
                  <span className={`text-xs md:text-sm font-medium ${
                    tx?.status === 'completed' ? 'text-success' : 
                    tx?.status === 'pending' ? 'text-warning' : 'text-error'
                  }`}>
                    {tx?.status === 'completed' ? 'Hoàn tất' : 
                     tx?.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                  </span>
                </div>
                {tx?.explorer && (
                  <a href={tx.explorer} target="_blank" rel="noreferrer" className="inline-flex items-center">
                    <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="left">Mở Explorer</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-6 flex flex-col items-center gap-3">
        {hasMore && (
          <Button onClick={() => onLoadMore && onLoadMore()} disabled={isLoading}>
            {isLoading ? 'Đang tải...' : 'Tải thêm'}
          </Button>
        )}
        <Button variant="outline" iconName="Download" iconPosition="left">
          Xuất lịch sử
        </Button>
      </div>
    </div>
  );
};

export default TransactionHistory;