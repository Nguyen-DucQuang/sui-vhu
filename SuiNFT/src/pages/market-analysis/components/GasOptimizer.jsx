import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GasOptimizer = () => {
  const [selectedTransaction, setSelectedTransaction] = useState('transfer');

  const transactionTypes = [
    { id: 'transfer', label: 'Chuyển NFT', icon: 'Send' },
    { id: 'mint', label: 'Mint NFT', icon: 'Sparkles' },
    { id: 'list', label: 'Niêm yết', icon: 'Tag' },
    { id: 'buy', label: 'Mua NFT', icon: 'ShoppingCart' }
  ];

  const gasData = {
    current: { fast: 45, average: 35, slow: 25 },
    predicted: {
      '1h': { fast: 42, average: 33, slow: 24 },
      '4h': { fast: 38, average: 30, slow: 22 },
      '12h': { fast: 35, average: 28, slow: 20 }
    },
    costs: {
      transfer: { fast: 0.0045, average: 0.0035, slow: 0.0025 },
      mint: { fast: 0.0090, average: 0.0070, slow: 0.0050 },
      list: { fast: 0.0030, average: 0.0023, slow: 0.0016 },
      buy: { fast: 0.0060, average: 0.0047, slow: 0.0033 }
    }
  };

  const currentCost = gasData?.costs?.[selectedTransaction];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent/20 flex items-center justify-center">
            <Icon name="Fuel" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold">Tối ưu Gas Fee</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Tiết kiệm chi phí giao dịch</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-3 block">Loại giao dịch</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {transactionTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => setSelectedTransaction(type?.id)}
                className={`p-3 rounded-lg border transition-smooth flex flex-col items-center gap-2 ${
                  selectedTransaction === type?.id
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/30'
                }`}
              >
                <Icon name={type?.icon} size={20} />
                <span className="text-xs font-medium">{type?.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-4">Chi phí hiện tại</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-card rounded-lg p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Nhanh</span>
                <Icon name="Zap" size={14} color="var(--color-success)" />
              </div>
              <p className="text-lg font-heading font-bold data-text text-success">{gasData?.current?.fast} Gwei</p>
              <p className="text-xs text-muted-foreground mt-1">~{currentCost?.fast} ETH</p>
            </div>
            <div className="bg-card rounded-lg p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Trung bình</span>
                <Icon name="Clock" size={14} color="var(--color-warning)" />
              </div>
              <p className="text-lg font-heading font-bold data-text text-warning">{gasData?.current?.average} Gwei</p>
              <p className="text-xs text-muted-foreground mt-1">~{currentCost?.average} ETH</p>
            </div>
            <div className="bg-card rounded-lg p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Chậm</span>
                <Icon name="Turtle" size={14} color="var(--color-muted-foreground)" />
              </div>
              <p className="text-lg font-heading font-bold data-text">{gasData?.current?.slow} Gwei</p>
              <p className="text-xs text-muted-foreground mt-1">~{currentCost?.slow} ETH</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Dự đoán Gas Fee</h4>
          <div className="space-y-2">
            {Object.entries(gasData?.predicted)?.map(([time, values]) => (
              <div key={time} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">{time}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs data-text text-success">{values?.fast}G</span>
                  <span className="text-xs data-text text-warning">{values?.average}G</span>
                  <span className="text-xs data-text text-muted-foreground">{values?.slow}G</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Khuyến nghị AI</p>
              <p className="text-xs text-muted-foreground">
                Đợi 4 giờ để tiết kiệm 15% chi phí gas. Thời điểm tối ưu: 02:00 - 06:00 UTC.
              </p>
            </div>
          </div>
        </div>

        <Button variant="outline" fullWidth iconName="Bell" iconPosition="left">
          Đặt cảnh báo giá gas
        </Button>
      </div>
    </div>
  );
};

export default GasOptimizer;