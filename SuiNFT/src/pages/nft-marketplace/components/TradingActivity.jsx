import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TradingActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'sale':
        return { name: 'ShoppingCart', color: 'var(--color-success)' };
      case 'bid':
        return { name: 'Gavel', color: 'var(--color-warning)' };
      case 'transfer':
        return { name: 'ArrowRightLeft', color: 'var(--color-primary)' };
      case 'listing':
        return { name: 'Tag', color: 'var(--color-accent)' };
      default:
        return { name: 'Activity', color: 'currentColor' };
    }
  };

  const getActivityLabel = (type) => {
    switch (type) {
      case 'sale':
        return 'Đã bán';
      case 'bid':
        return 'Đặt giá';
      case 'transfer':
        return 'Chuyển';
      case 'listing':
        return 'Niêm yết';
      default:
        return 'Hoạt động';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Hoạt động giao dịch
        </h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          Xem tất cả
        </button>
      </div>
      <div className="space-y-3">
        {activities?.map((activity) => {
          const icon = getActivityIcon(activity?.type);
          return (
            <div
              key={activity?.id}
              className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-smooth cursor-pointer"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden">
                  <Image
                    src={activity?.nftImage}
                    alt={activity?.nftImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name={icon?.name} size={14} color={icon?.color} />
                  <span className="text-xs text-muted-foreground">{getActivityLabel(activity?.type)}</span>
                </div>
                <h4 className="text-sm font-medium text-foreground line-clamp-1">
                  {activity?.nftName}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">bởi</span>
                  <span className="text-xs text-primary">{activity?.from}</span>
                  {activity?.to && (
                    <>
                      <Icon name="ArrowRight" size={10} />
                      <span className="text-xs text-primary">{activity?.to}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Icon name="Coins" size={14} color="var(--color-accent)" />
                  <span className="text-sm font-medium text-foreground data-text">{activity?.price}</span>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity?.time}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tổng khối lượng 24h</span>
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="font-heading font-bold text-foreground data-text">12,847 ETH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingActivity;