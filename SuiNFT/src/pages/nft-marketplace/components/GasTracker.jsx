import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GasTracker = () => {
  const [gasData, setGasData] = useState({
    fast: 45,
    average: 35,
    slow: 25,
    trend: 'up'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGasData(prev => ({
        fast: prev?.fast + Math.floor(Math.random() * 10 - 5),
        average: prev?.average + Math.floor(Math.random() * 8 - 4),
        slow: prev?.slow + Math.floor(Math.random() * 6 - 3),
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Fuel" size={20} color="var(--color-accent)" />
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Chi phí Gas
          </h3>
        </div>
        <div className={`flex items-center gap-1 text-sm ${gasData?.trend === 'up' ? 'text-error' : 'text-success'}`}>
          <Icon name={gasData?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
          <span className="data-text">{gasData?.trend === 'up' ? '+' : '-'}2.5%</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Zap" size={16} color="var(--color-success)" />
            <span className="text-xs text-muted-foreground">Nhanh</span>
          </div>
          <p className="text-lg md:text-xl font-heading font-bold text-success data-text">{gasData?.fast}</p>
          <p className="text-xs text-muted-foreground mt-1">Gwei</p>
        </div>

        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={16} color="var(--color-warning)" />
            <span className="text-xs text-muted-foreground">Trung bình</span>
          </div>
          <p className="text-lg md:text-xl font-heading font-bold text-warning data-text">{gasData?.average}</p>
          <p className="text-xs text-muted-foreground mt-1">Gwei</p>
        </div>

        <div className="bg-muted/50 border border-border rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Turtle" size={16} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">Chậm</span>
          </div>
          <p className="text-lg md:text-xl font-heading font-bold text-foreground data-text">{gasData?.slow}</p>
          <p className="text-xs text-muted-foreground mt-1">Gwei</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Cập nhật lần cuối</span>
          <span className="data-text">30 giây trước</span>
        </div>
      </div>
    </div>
  );
};

export default GasTracker;