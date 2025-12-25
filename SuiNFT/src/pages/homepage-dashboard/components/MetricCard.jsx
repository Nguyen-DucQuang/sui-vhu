import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ icon, title, value, change, changeType, subtitle, iconColor }) => {
  const changeColor = changeType === 'positive' ? 'text-success' : changeType === 'negative' ? 'text-error' : 'text-muted-foreground';
  const changeBg = changeType === 'positive' ? 'bg-success/10' : changeType === 'negative' ? 'bg-error/10' : 'bg-muted/10';

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/30 transition-smooth hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name={icon} size={20} color={iconColor || 'var(--color-primary)'} />
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">{title}</p>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground mt-1">{value}</h3>
          </div>
        </div>
        {change && (
          <div className={`${changeBg} ${changeColor} px-2 md:px-3 py-1 rounded-lg flex items-center gap-1`}>
            <Icon 
              name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
              size={14} 
            />
            <span className="text-xs md:text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default MetricCard;