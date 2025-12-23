import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIAnalysis = ({ analysis }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Icon name="Brain" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-heading font-bold">Phân tích AI</h3>
          <p className="text-sm text-muted-foreground">Dự đoán thông minh dựa trên dữ liệu thị trường</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-start gap-3">
            <Icon name="TrendingUp" size={20} color="var(--color-success)" />
            <div className="flex-1">
              <h4 className="font-medium mb-2">Dự đoán giá 24h</h4>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-heading font-bold text-success">{analysis?.prediction24h}</span>
                <span className="text-sm text-muted-foreground">ETH</span>
                <span className="text-sm text-success">(+{analysis?.predictionChange}%)</span>
              </div>
              <p className="text-sm text-muted-foreground">{analysis?.predictionReason}</p>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('investment')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
              <span className="font-medium">Khuyến nghị đầu tư</span>
            </div>
            <Icon 
              name={expandedSection === 'investment' ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
            />
          </button>
          {expandedSection === 'investment' && (
            <div className="p-4 bg-muted/30 border-t border-border space-y-3">
              {analysis?.investmentTips?.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('market')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <Icon name="BarChart3" size={20} color="var(--color-primary)" />
              <span className="font-medium">Xu hướng thị trường</span>
            </div>
            <Icon 
              name={expandedSection === 'market' ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
            />
          </button>
          {expandedSection === 'market' && (
            <div className="p-4 bg-muted/30 border-t border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Users" size={16} color="var(--color-primary)" />
                    <span className="text-xs text-muted-foreground">Tâm lý cộng đồng</span>
                  </div>
                  <p className="text-lg font-bold text-success">{analysis?.sentiment}</p>
                </div>
                <div className="bg-card rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Activity" size={16} color="var(--color-warning)" />
                    <span className="text-xs text-muted-foreground">Hoạt động giao dịch</span>
                  </div>
                  <p className="text-lg font-bold text-warning">{analysis?.activity}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{analysis?.marketInsight}</p>
            </div>
          )}
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('risk')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
              <span className="font-medium">Đánh giá rủi ro</span>
            </div>
            <Icon 
              name={expandedSection === 'risk' ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
            />
          </button>
          {expandedSection === 'risk' && (
            <div className="p-4 bg-muted/30 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Mức độ rủi ro</span>
                <span className="text-sm font-bold text-warning">{analysis?.riskLevel}</span>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-success via-warning to-error transition-all duration-500"
                  style={{ width: `${analysis?.riskScore}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{analysis?.riskAnalysis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;