import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TransactionHistory = ({ transactions }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'sale':
        return { name: 'ShoppingCart', color: 'var(--color-success)' };
      case 'transfer':
        return { name: 'ArrowRightLeft', color: 'var(--color-primary)' };
      case 'mint':
        return { name: 'Sparkles', color: 'var(--color-warning)' };
      case 'list':
        return { name: 'Tag', color: 'var(--color-accent)' };
      default:
        return { name: 'Activity', color: 'var(--color-muted-foreground)' };
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="History" size={24} color="var(--color-primary)" />
        <h3 className="text-lg md:text-xl font-heading font-bold">Lịch sử giao dịch</h3>
      </div>
      <div className="hidden md:block overflow-x-auto scrollbar-custom">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('event')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Sự kiện
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Giá
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Từ</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Đến</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Thời gian
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((tx, index) => {
              const eventIcon = getEventIcon(tx?.type);
              return (
                <tr key={index} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon name={eventIcon?.name} size={16} color={eventIcon?.color} />
                      </div>
                      <span className="text-sm font-medium">{tx?.event}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold data-text">{tx?.price}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={tx?.fromAvatar}
                        alt={tx?.fromAvatarAlt}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-muted-foreground data-text">{tx?.from}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={tx?.toAvatar}
                        alt={tx?.toAvatarAlt}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-muted-foreground data-text">{tx?.to}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">{tx?.time}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">
        {transactions?.map((tx, index) => {
          const eventIcon = getEventIcon(tx?.type);
          return (
            <div key={index} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-card rounded-lg">
                    <Icon name={eventIcon?.name} size={16} color={eventIcon?.color} />
                  </div>
                  <span className="text-sm font-medium">{tx?.event}</span>
                </div>
                <span className="text-sm font-bold data-text">{tx?.price}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Từ:</span>
                  <div className="flex items-center gap-2">
                    <Image
                      src={tx?.fromAvatar}
                      alt={tx?.fromAvatarAlt}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-xs data-text">{tx?.from}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Đến:</span>
                  <div className="flex items-center gap-2">
                    <Image
                      src={tx?.toAvatar}
                      alt={tx?.toAvatarAlt}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-xs data-text">{tx?.to}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">{tx?.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;