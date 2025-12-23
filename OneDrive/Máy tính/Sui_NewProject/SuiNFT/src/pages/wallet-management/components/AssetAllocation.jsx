import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const AssetAllocation = ({ allocationData }) => {
  const COLORS = ['#6366f1', '#8b5cf6', '#06ffa5', '#10b981', '#f59e0b'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{payload?.[0]?.name}</p>
          <p className="text-sm text-muted-foreground">
            {payload?.[0]?.value?.toFixed(2)} ETH ({payload?.[0]?.payload?.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
      <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4 md:mb-6">
        Phân bổ tài sản
      </h3>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Asset Allocation Pie Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {allocationData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '14px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
        {allocationData?.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 md:gap-3">
              <div 
                className="w-3 h-3 md:w-4 md:h-4 rounded-full" 
                style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
              />
              <span className="text-sm md:text-base text-foreground">{item?.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm md:text-base font-medium text-foreground data-text">
                {item?.value?.toFixed(2)} ETH
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">{item?.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetAllocation;