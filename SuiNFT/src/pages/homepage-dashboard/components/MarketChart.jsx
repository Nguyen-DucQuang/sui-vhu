import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const MarketChart = ({ data, title, type = 'line' }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{payload?.[0]?.payload?.time}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry?.color }}></div>
              <span className="text-xs text-muted-foreground">{entry?.name}:</span>
              <span className="text-sm font-bold text-foreground data-text">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
          <h3 className="text-base md:text-lg font-heading font-bold text-foreground">{title}</h3>
        </div>
        <div className="flex gap-2">
          <button className="px-2 md:px-3 py-1 text-xs md:text-sm bg-primary text-primary-foreground rounded-lg">24H</button>
          <button className="px-2 md:px-3 py-1 text-xs md:text-sm text-muted-foreground hover:bg-muted rounded-lg transition-smooth">7D</button>
          <button className="px-2 md:px-3 py-1 text-xs md:text-sm text-muted-foreground hover:bg-muted rounded-lg transition-smooth">30D</button>
        </div>
      </div>

      <div className="w-full h-48 md:h-64 lg:h-80" aria-label={`${title} Chart`}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)" 
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-primary)" 
                fillOpacity={1} 
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)" 
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="eth" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={false}
                name="ETH"
              />
              <Line 
                type="monotone" 
                dataKey="sol" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={false}
                name="SOL"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketChart;