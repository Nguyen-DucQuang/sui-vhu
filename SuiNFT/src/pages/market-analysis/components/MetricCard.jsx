import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor, trend }) => {
  const isPositive = changeType === 'positive';
  const changeColor = isPositive ? 'text-success' : 'text-error';
  const bgGradient = isPositive 
    ? 'from-success/10 to-success/5' :'from-error/10 to-error/5';

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/30 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${bgGradient} flex items-center justify-center`}>
            <Icon name={icon} size={20} color={iconColor} />
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">{title}</p>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mt-1">{value}</h3>
          </div>
        </div>
        {trend && (
          <div className="hidden md:block">
            <Icon 
              name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
              size={24} 
              color={isPositive ? 'var(--color-success)' : 'var(--color-error)'} 
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className={`${changeColor} font-medium text-sm md:text-base flex items-center gap-1`}>
          <Icon 
            name={isPositive ? 'ArrowUp' : 'ArrowDown'} 
            size={16} 
            color={isPositive ? 'var(--color-success)' : 'var(--color-error)'} 
          />
          {change}
        </span>
        <span className="text-xs md:text-sm text-muted-foreground">24h</span>
      </div>
    </div>
  );
};

export default MetricCard;