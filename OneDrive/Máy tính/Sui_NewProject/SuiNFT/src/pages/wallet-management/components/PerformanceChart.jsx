import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const PerformanceChart = ({ performanceData }) => {
  const [timeRange, setTimeRange] = useState('7d');

  const timeRanges = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7 ngày' },
    { value: '30d', label: '30 ngày' },
    { value: '90d', label: '90 ngày' },
    { value: '1y', label: '1 năm' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-1">{payload?.[0]?.payload?.date}</p>
          <p className="text-base font-medium text-foreground data-text">
            {payload?.[0]?.value?.toFixed(2)} ETH
          </p>
          {payload?.[0]?.payload?.roi && (
            <p className={`text-sm ${payload?.[0]?.payload?.roi >= 0 ? 'text-success' : 'text-error'}`}>
              ROI: {payload?.[0]?.payload?.roi >= 0 ? '+' : ''}{payload?.[0]?.payload?.roi}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
          Hiệu suất danh mục
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto">
          {timeRanges?.map((range) => (
            <button
              key={range?.value}
              onClick={() => setTimeRange(range?.value)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${
                timeRange === range?.value 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {range?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Portfolio Performance Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value} ETH`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#6366f1" 
              strokeWidth={2}
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
        <div className="bg-muted/30 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">ROI tổng</p>
          <p className="text-base md:text-lg lg:text-xl font-heading font-bold text-success">
            +24.5%
          </p>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Giá trị cao nhất</p>
          <p className="text-base md:text-lg lg:text-xl font-heading font-bold text-foreground data-text">
            45.8 ETH
          </p>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Giá trị thấp nhất</p>
          <p className="text-base md:text-lg lg:text-xl font-heading font-bold text-foreground data-text">
            32.1 ETH
          </p>
        </div>
        <div className="bg-muted/30 rounded-lg p-3 md:p-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Trung bình</p>
          <p className="text-base md:text-lg lg:text-xl font-heading font-bold text-foreground data-text">
            38.9 ETH
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;