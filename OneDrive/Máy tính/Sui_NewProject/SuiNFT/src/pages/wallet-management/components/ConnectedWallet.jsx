import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConnectedWallet = ({ wallet }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6 hover:border-primary/30 transition-smooth">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-3 md:mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <Icon name={wallet?.type === 'metamask' ? 'Wallet' : 'Link'} size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h4 className="text-base md:text-lg font-heading font-medium text-foreground">
              {wallet?.name}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground data-text">{wallet?.address}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
          <div className={`px-2 md:px-3 py-1 rounded-lg ${wallet?.status === 'active' ? 'bg-success/10' : 'bg-muted'}`}>
            <span className={`text-xs md:text-sm font-medium ${wallet?.status === 'active' ? 'text-success' : 'text-muted-foreground'}`}>
              {wallet?.status === 'active' ? 'Đang kết nối' : 'Ngắt kết nối'}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
            aria-label={isExpanded ? 'Collapse wallet details' : 'Expand wallet details'}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
        <div className="bg-muted/30 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Số dư</p>
          <p className="text-base md:text-lg lg:text-xl font-heading font-bold text-foreground data-text">
            {wallet?.balance} ETH
          </p>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">NFTs</p>
          <p className="text-base md:text-lg lg:text-xl font-heading font-bold text-foreground">
            {wallet?.nftCount}
          </p>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-border pt-3 md:pt-4 space-y-2 md:space-y-3 animate-fade-in">
          <h5 className="text-sm md:text-base font-medium text-foreground mb-2 md:mb-3">
            Giao dịch gần đây
          </h5>
          {wallet?.recentTransactions?.map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                <Icon 
                  name={tx?.type === 'send' ? 'ArrowUpRight' : 'ArrowDownLeft'} 
                  size={16} 
                  color={tx?.type === 'send' ? 'var(--color-error)' : 'var(--color-success)'} 
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-foreground truncate">{tx?.description}</p>
                  <p className="text-xs text-muted-foreground">{tx?.time}</p>
                </div>
              </div>
              <p className={`text-xs md:text-sm font-medium whitespace-nowrap ml-2 data-text ${tx?.type === 'send' ? 'text-error' : 'text-success'}`}>
                {tx?.type === 'send' ? '-' : '+'}{tx?.amount} ETH
              </p>
            </div>
          ))}
          
          <div className="flex gap-2 md:gap-3 pt-2 md:pt-3">
            <Button variant="outline" size="sm" iconName="Send" iconPosition="left" className="flex-1">
              Gửi
            </Button>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left" className="flex-1">
              Nhận
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectedWallet;