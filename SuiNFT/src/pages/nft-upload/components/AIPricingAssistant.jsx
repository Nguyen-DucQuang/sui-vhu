import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AIPricingAssistant = ({ fileData, metadata }) => {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (fileData && metadata?.name && metadata?.category) {
      analyzePrice();
    }
  }, [fileData, metadata?.name, metadata?.category]);

  const analyzePrice = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const mockAnalysis = {
        suggestedPrice: 4.5,
        confidence: 87,
        priceRange: { min: 3.2, max: 6.8 },
        similarNFTs: [
          { name: 'Abstract Dreams #234', price: 4.2, similarity: 92 },
          { name: 'Digital Essence #567', price: 5.1, similarity: 88 },
          { name: 'Cyber Vision #890', price: 3.9, similarity: 85 }
        ],
        marketFactors: [
          { factor: 'Xu hướng thị trường', impact: 'positive', value: '+15%' },
          { factor: 'Độ hiếm thuộc tính', impact: 'positive', value: '+8%' },
          { factor: 'Hoạt động bộ sưu tập', impact: 'neutral', value: '0%' },
          { factor: 'Khối lượng giao dịch', impact: 'negative', value: '-3%' }
        ],
        insights: [
          'NFT tương tự đã bán với giá trung bình 4.3 ETH trong 7 ngày qua',
          'Danh mục này đang có xu hướng tăng 12% so với tuần trước',
          'Thời điểm tốt nhất để niêm yết: 18:00 - 22:00 UTC'
        ]
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  if (isAnalyzing) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <div className="flex items-center justify-center py-8 md:py-12">
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-lg font-medium">Đang phân tích với AI...</p>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Đang so sánh với 10,000+ NFT tương tự
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <div className="text-center py-8 md:py-12">
          <Icon name="Sparkles" size={48} color="var(--color-primary)" className="mx-auto mb-4 md:mb-6" />
          <h3 className="text-lg md:text-xl font-heading font-semibold mb-2 md:mb-3">
            Trợ lý định giá AI
          </h3>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            Tải lên file và điền thông tin để nhận gợi ý giá thông minh từ AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold mb-2">
            Gợi ý giá từ AI
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Dựa trên phân tích thị trường và NFT tương tự
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-success/20 rounded-lg flex-shrink-0">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-xs md:text-sm font-medium text-success">{analysis?.confidence}% tin cậy</span>
        </div>
      </div>
      <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm md:text-base text-muted-foreground mb-1">Giá đề xuất</p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary">
              {analysis?.suggestedPrice} ETH
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">Khoảng giá</p>
            <p className="text-base md:text-lg font-medium">
              {analysis?.priceRange?.min} - {analysis?.priceRange?.max} ETH
            </p>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-sm md:text-base font-heading font-semibold mb-3 md:mb-4">NFT tương tự</h4>
        <div className="space-y-2 md:space-y-3">
          {analysis?.similarNFTs?.map((nft, index) => (
            <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium truncate">{nft?.name}</p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Độ tương đồng: {nft?.similarity}%
                </p>
              </div>
              <p className="text-sm md:text-base font-semibold text-primary ml-4 whitespace-nowrap">
                {nft?.price} ETH
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm md:text-base font-heading font-semibold mb-3 md:mb-4">Yếu tố thị trường</h4>
        <div className="space-y-2 md:space-y-3">
          {analysis?.marketFactors?.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Icon
                  name={factor?.impact === 'positive' ? 'TrendingUp' : factor?.impact === 'negative' ? 'TrendingDown' : 'Minus'}
                  size={20}
                  color={
                    factor?.impact === 'positive' ?'var(--color-success)' 
                      : factor?.impact === 'negative' ?'var(--color-destructive)' :'var(--color-muted-foreground)'
                  }
                />
                <span className="text-sm md:text-base truncate">{factor?.factor}</span>
              </div>
              <span
                className={`text-sm md:text-base font-semibold ml-4 whitespace-nowrap ${
                  factor?.impact === 'positive' ?'text-success'
                    : factor?.impact === 'negative' ?'text-destructive' :'text-muted-foreground'
                }`}
              >
                {factor?.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 md:p-6">
        <div className="flex items-start gap-3 mb-3 md:mb-4">
          <Icon name="Lightbulb" size={24} color="var(--color-accent)" className="flex-shrink-0" />
          <h4 className="text-sm md:text-base font-heading font-semibold">Thông tin chi tiết</h4>
        </div>
        <ul className="space-y-2 md:space-y-3">
          {analysis?.insights?.map((insight, index) => (
            <li key={index} className="flex items-start gap-2 text-sm md:text-base">
              <Icon name="Check" size={16} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIPricingAssistant;