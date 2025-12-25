import React from 'react';
import Icon from '../../../components/AppIcon';

const CorrelationMatrix = () => {
  const collections = [
    'CryptoPunks',
    'Bored Apes',
    'Azuki',
    'Doodles',
    'CloneX'
  ];

  const correlationData = [
    [1.00, 0.85, 0.72, 0.68, 0.75],
    [0.85, 1.00, 0.78, 0.71, 0.82],
    [0.72, 0.78, 1.00, 0.89, 0.76],
    [0.68, 0.71, 0.89, 1.00, 0.73],
    [0.75, 0.82, 0.76, 0.73, 1.00]
  ];

  const getCorrelationColor = (value) => {
    if (value >= 0.8) return 'bg-success/80';
    if (value >= 0.6) return 'bg-success/50';
    if (value >= 0.4) return 'bg-warning/50';
    if (value >= 0.2) return 'bg-error/50';
    return 'bg-error/80';
  };

  const getCorrelationText = (value) => {
    if (value >= 0.8) return 'text-success';
    if (value >= 0.6) return 'text-success';
    if (value >= 0.4) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon name="Network" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold">Ma trận tương quan</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Phân tích mối liên hệ giữa các bộ sưu tập</p>
          </div>
        </div>
      </div>
      {/* Desktop Matrix View */}
      <div className="hidden lg:block overflow-x-auto scrollbar-custom">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2"></th>
              {collections?.map((collection, index) => (
                <th key={index} className="p-2 text-xs font-medium text-muted-foreground text-center">
                  {collection}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {correlationData?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 text-xs font-medium text-muted-foreground">
                  {collections?.[rowIndex]}
                </td>
                {row?.map((value, colIndex) => (
                  <td key={colIndex} className="p-2">
                    <div 
                      className={`w-full h-12 rounded flex items-center justify-center ${getCorrelationColor(value)}`}
                    >
                      <span className={`text-xs font-medium data-text ${getCorrelationText(value)}`}>
                        {value?.toFixed(2)}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile List View */}
      <div className="lg:hidden space-y-4">
        {collections?.map((collection, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium mb-3">{collection}</h4>
            <div className="space-y-2">
              {collections?.map((otherCollection, otherIndex) => {
                if (index === otherIndex) return null;
                const value = correlationData?.[index]?.[otherIndex];
                return (
                  <div key={otherIndex} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{otherCollection}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getCorrelationColor(value)}`}
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium data-text ${getCorrelationText(value)}`}>
                        {value?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/80"></div>
          <span className="text-muted-foreground">Cao (≥0.8)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/50"></div>
          <span className="text-muted-foreground">Trung bình (0.6-0.8)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning/50"></div>
          <span className="text-muted-foreground">Thấp (0.4-0.6)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-error/50"></div>
          <span className="text-muted-foreground">Rất thấp (&lt;0.4)</span>
        </div>
      </div>
      <div className="mt-6 bg-primary/10 border border-primary/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-primary)" />
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Phân tích đa dạng hóa</p>
            <p className="text-xs text-muted-foreground">
              Azuki và Doodles có tương quan cao (0.89), nên đầu tư vào cả hai có thể không đa dạng hóa rủi ro hiệu quả. Xem xét kết hợp với các bộ sưu tập có tương quan thấp hơn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrix;