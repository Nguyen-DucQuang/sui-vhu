import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GasFeeCalculator = ({ blockchain, lazyMinting }) => {
  const [gasData, setGasData] = useState({
    fast: { gwei: 45, usd: 12.5, time: '< 30 giây' },
    average: { gwei: 35, usd: 9.8, time: '< 2 phút' },
    slow: { gwei: 25, usd: 7.2, time: '< 5 phút' }
  });
  const [selectedSpeed, setSelectedSpeed] = useState('average');
  const [networkStatus, setNetworkStatus] = useState('normal');

  useEffect(() => {
    const interval = setInterval(() => {
      const variance = Math.random() * 10 - 5;
      setGasData(prev => ({
        fast: {
          gwei: Math.max(30, prev?.fast?.gwei + variance),
          usd: Math.max(8, prev?.fast?.usd + variance * 0.3),
          time: '< 30 giây'
        },
        average: {
          gwei: Math.max(25, prev?.average?.gwei + variance * 0.8),
          usd: Math.max(6, prev?.average?.usd + variance * 0.25),
          time: '< 2 phút'
        },
        slow: {
          gwei: Math.max(20, prev?.slow?.gwei + variance * 0.6),
          usd: Math.max(5, prev?.slow?.usd + variance * 0.2),
          time: '< 5 phút'
        }
      }));

      const avgGas = gasData?.average?.gwei;
      if (avgGas > 50) setNetworkStatus('congested');
      else if (avgGas > 35) setNetworkStatus('normal');
      else setNetworkStatus('low');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (lazyMinting) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={24} color="var(--color-success)" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-heading font-semibold mb-2">
              Lazy Minting được kích hoạt
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              NFT sẽ chỉ được mint khi có người mua, giúp bạn tiết kiệm 100% chi phí gas ban đầu.
            </p>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span>Không mất phí gas</span>
              </div>
              <div className="flex items-center gap-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span>Mint tức thì khi bán</span>
              </div>
              <div className="flex items-center gap-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span>Thân thiện môi trường</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold mb-2">
            Chi phí Gas ước tính
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Blockchain: {blockchain === 'ethereum' ? 'Ethereum' : 'Solana'}
          </p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
          networkStatus === 'congested' ?'bg-destructive/20 text-destructive' 
            : networkStatus === 'normal' ?'bg-warning/20 text-warning' :'bg-success/20 text-success'
        }`}>
          <Icon 
            name={networkStatus === 'congested' ? 'AlertCircle' : networkStatus === 'normal' ? 'Activity' : 'CheckCircle'} 
            size={16} 
          />
          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
            {networkStatus === 'congested' ? 'Mạng tắc nghẽn' : networkStatus === 'normal' ? 'Bình thường' : 'Mạng thông thoáng'}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {Object.entries(gasData)?.map(([speed, data]) => (
          <button
            key={speed}
            type="button"
            onClick={() => setSelectedSpeed(speed)}
            className={`p-4 md:p-6 border-2 rounded-xl transition-all duration-250 text-left ${
              selectedSpeed === speed
                ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm md:text-base font-semibold capitalize">
                {speed === 'fast' ? 'Nhanh' : speed === 'average' ? 'Trung bình' : 'Chậm'}
              </span>
              <Icon
                name={speed === 'fast' ? 'Zap' : speed === 'average' ? 'Activity' : 'Clock'}
                size={20}
                color={selectedSpeed === speed ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
              />
            </div>
            <p className="text-xl md:text-2xl font-heading font-bold mb-1">
              {data?.gwei?.toFixed(1)} Gwei
            </p>
            <p className="text-sm md:text-base text-muted-foreground mb-2">
              ~${data?.usd?.toFixed(2)} USD
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              {data?.time}
            </p>
          </button>
        ))}
      </div>
      <div className="bg-muted/50 rounded-xl p-4 md:p-6">
        <h4 className="text-sm md:text-base font-heading font-semibold mb-3 md:mb-4">
          Chi tiết chi phí
        </h4>
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Phí mint NFT</span>
            <span className="font-semibold">${gasData?.[selectedSpeed]?.usd?.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm md:text-base">
            <span className="text-muted-foreground">Phí platform (2.5%)</span>
            <span className="font-semibold">$0.31</span>
          </div>
          <div className="h-px bg-border my-2 md:my-3"></div>
          <div className="flex items-center justify-between text-base md:text-lg">
            <span className="font-semibold">Tổng cộng</span>
            <span className="font-bold text-primary">
              ${(gasData?.[selectedSpeed]?.usd + 0.31)?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/30 rounded-xl">
        <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm">
          <p className="font-medium mb-1">Mẹo tiết kiệm gas fee:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Mint vào cuối tuần khi mạng ít tải</li>
            <li>• Sử dụng Lazy Minting để không mất phí ban đầu</li>
            <li>• Chọn tốc độ "Chậm" nếu không vội</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GasFeeCalculator;