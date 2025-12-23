import React from 'react';
import Icon from '../../../components/AppIcon';

const SentimentAnalysis = () => {
  const sentimentData = {
    overall: 72,
    breakdown: {
      positive: 58,
      neutral: 28,
      negative: 14
    },
    trending: [
      { keyword: 'bullish', count: 1247, sentiment: 'positive' },
      { keyword: 'floor price', count: 892, sentiment: 'neutral' },
      { keyword: 'utility', count: 756, sentiment: 'positive' },
      { keyword: 'dump', count: 423, sentiment: 'negative' },
      { keyword: 'moon', count: 389, sentiment: 'positive' }
    ],
    sources: [
      { platform: 'Twitter', sentiment: 75, volume: 12500 },
      { platform: 'Discord', sentiment: 68, volume: 8900 },
      { platform: 'Reddit', sentiment: 71, volume: 5600 },
      { platform: 'Telegram', sentiment: 69, volume: 4200 }
    ]
  };

  const getSentimentColor = (value) => {
    if (value >= 70) return 'text-success';
    if (value >= 50) return 'text-warning';
    return 'text-error';
  };

  const getSentimentBg = (value) => {
    if (value >= 70) return 'bg-success';
    if (value >= 50) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent/20 flex items-center justify-center">
            <Icon name="MessageSquare" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold">Phân tích cảm xúc cộng đồng</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Dựa trên 32,200 bài đăng</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="var(--color-muted)"
                strokeWidth="8"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="var(--color-success)"
                strokeWidth="8"
                strokeDasharray={`${sentimentData?.overall * 2.83} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl md:text-4xl font-heading font-bold text-success">{sentimentData?.overall}%</span>
              <span className="text-xs text-muted-foreground">Tích cực</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Chỉ số cảm xúc tổng thể</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-success/10 border border-success/30 rounded-lg p-3 text-center">
            <Icon name="ThumbsUp" size={20} color="var(--color-success)" className="mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-heading font-bold text-success">{sentimentData?.breakdown?.positive}%</p>
            <p className="text-xs text-muted-foreground mt-1">Tích cực</p>
          </div>
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 text-center">
            <Icon name="Minus" size={20} color="var(--color-warning)" className="mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-heading font-bold text-warning">{sentimentData?.breakdown?.neutral}%</p>
            <p className="text-xs text-muted-foreground mt-1">Trung lập</p>
          </div>
          <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-center">
            <Icon name="ThumbsDown" size={20} color="var(--color-error)" className="mx-auto mb-2" />
            <p className="text-xl md:text-2xl font-heading font-bold text-error">{sentimentData?.breakdown?.negative}%</p>
            <p className="text-xs text-muted-foreground mt-1">Tiêu cực</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Từ khóa xu hướng</h4>
          <div className="space-y-2">
            {sentimentData?.trending?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">#{item?.keyword}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item?.sentiment === 'positive' ? 'bg-success/20 text-success' :
                    item?.sentiment === 'negative'? 'bg-error/20 text-error' : 'bg-muted text-muted-foreground'
                  }`}>
                    {item?.sentiment === 'positive' ? 'Tích cực' : 
                     item?.sentiment === 'negative' ? 'Tiêu cực' : 'Trung lập'}
                  </span>
                </div>
                <span className="text-sm data-text text-muted-foreground">{item?.count?.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Phân tích theo nền tảng</h4>
          <div className="space-y-3">
            {sentimentData?.sources?.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{source?.platform}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium data-text ${getSentimentColor(source?.sentiment)}`}>
                      {source?.sentiment}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({source?.volume?.toLocaleString()} bài)
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getSentimentBg(source?.sentiment)}`}
                    style={{ width: `${source?.sentiment}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Xu hướng AI</p>
              <p className="text-xs text-muted-foreground">
                Cảm xúc cộng đồng đang tăng 12% so với tuần trước. Từ khóa "bullish" và "utility" đang thống trị các cuộc thảo luận, cho thấy niềm tin tích cực vào thị trường.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;