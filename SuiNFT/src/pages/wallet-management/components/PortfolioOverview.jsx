import React from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { fetchUserSuiCoins } from '../../../utils/sui-helpers';
import Icon from '../../../components/AppIcon';

const PortfolioOverview = ({ portfolioData }) => {
  const account = useCurrentAccount();
  const [suiBalanceState, setSuiBalanceState] = React.useState('0.00');

  const computeBalance = async (address) => {
    try {
      if (!address) return setSuiBalanceState('0.00');
      const coins = await fetchUserSuiCoins(address);
      // coins may be an array of coin objects with `balance` or `amount` or `totalBalance`
      let total = 0;
      if (Array.isArray(coins)) {
        for (const c of coins) {
          // try common fields
          const val = c?.balance ?? c?.amount ?? c?.value ?? c?.totalBalance ?? c?.balance?.value;
          const num = Number(val) || 0;
          total += num;
        }
      } else if (coins && typeof coins === 'object') {
        const val = coins?.totalBalance ?? 0;
        total = Number(val) || 0;
      }
      // Sui uses 1e9 lamports
      setSuiBalanceState((total / 1_000_000_000).toFixed(2));
    } catch (e) {
      setSuiBalanceState('0.00');
    }
  };

  React.useEffect(() => {
    if (!account?.address) return;
    computeBalance(account.address);
    const iv = setInterval(() => computeBalance(account.address), 15000);
    return () => clearInterval(iv);
  }, [account?.address]);
  const { totalValue, change24h, changePercent } = portfolioData;
  const isPositive = change24h >= 0;

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12">
        <div className="flex-1">
          <p className="text-sm md:text-base text-muted-foreground mb-2">Tổng giá trị danh mục (Ước tính)</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2 md:mb-3">
            {totalValue?.toFixed(2)} SUI
          </h2>
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg ${isPositive ? 'bg-success/10' : 'bg-error/10'}`}>
              <Icon 
                name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                color={isPositive ? 'var(--color-success)' : 'var(--color-error)'} 
              />
              <span className={`text-sm md:text-base font-medium ${isPositive ? 'text-success' : 'text-error'}`}>
                {isPositive ? '+' : ''}{change24h?.toFixed(2)} SUI
              </span>
            </div>
            <span className={`text-sm md:text-base font-medium ${isPositive ? 'text-success' : 'text-error'}`}>
              ({isPositive ? '+' : ''}{changePercent?.toFixed(2)}%)
            </span>
            <span className="text-xs md:text-sm text-muted-foreground">24h</span>
          </div>
        </div>

        <div className="flex-1 border-l border-border pl-8">
          <p className="text-sm md:text-base text-muted-foreground mb-2">Số dư Sui thực tế</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-2 md:mb-3">
            {suiBalanceState} SUI
          </h2>
          <div className="flex items-center gap-2">
            <Icon name="Wallet" size={16} color="var(--color-muted-foreground)" />
            {account ? (
              <span className="text-xs md:text-sm text-muted-foreground truncate max-w-[200px]">
                {String(account.address).slice(0, 8) + '...' + String(account.address).slice(-6)}
              </span>
            ) : (
              <span className="text-xs md:text-sm text-error">Chưa kết nối ví</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
