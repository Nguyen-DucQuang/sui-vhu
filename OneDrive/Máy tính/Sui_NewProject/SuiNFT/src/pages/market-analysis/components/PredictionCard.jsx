import React from 'react';
import Icon from '../../../components/AppIcon';

const PredictionCard = ({ title, currentPrice, predictedPrice, confidence, timeframe, trend }) => {
  const priceChange = ((predictedPrice - currentPrice) / currentPrice * 100)?.toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/30 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-heading font-medium text-sm md:text-base mb-1">{title}</h4>
          <p className="text-xs text-muted-foreground">{timeframe}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          confidence >= 80 ? 'bg-success/20 text-success' :
          confidence >= 60 ? 'bg-warning/20 text-warning': 'bg-error/20 text-error'
        }`}>
          {confidence}% tin cậy
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Giá hiện tại</p>
          <p className="text-xl md:text-2xl font-heading font-bold data-text">{currentPrice} ETH</p>
        </div>

        <div className="flex items-center gap-2">
          <Icon 
            name={isPositive ? 'ArrowRight' : 'ArrowRight'} 
            size={20} 
            color="var(--color-muted-foreground)" 
          />
          <div className="h-px flex-1 bg-border" />
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Dự đoán giá</p>
          <div className="flex items-end gap-3">
            <p className="text-xl md:text-2xl font-heading font-bold data-text">{predictedPrice} ETH</p>
            <span className={`font-medium text-sm md:text-base flex items-center gap-1 mb-1 ${
              isPositive ? 'text-success' : 'text-error'
            }`}>
              <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={16} />
              {Math.abs(priceChange)}%
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Xu hướng AI</span>
            <div className="flex items-center gap-1">
              {trend === 'bullish' && (
                <>
                  <Icon name="TrendingUp" size={14} color="var(--color-success)" />
                  <span className="text-success font-medium">Tăng giá</span>
                </>
              )}
              {trend === 'bearish' && (
                <>
                  <Icon name="TrendingDown" size={14} color="var(--color-error)" />
                  <span className="text-error font-medium">Giảm giá</span>
                </>
              )}
              {trend === 'neutral' && (
                <>
                  <Icon name="Minus" size={14} color="var(--color-warning)" />
                  <span className="text-warning font-medium">Trung lập</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;