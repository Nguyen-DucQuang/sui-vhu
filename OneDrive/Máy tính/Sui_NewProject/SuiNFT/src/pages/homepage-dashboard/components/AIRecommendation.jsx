import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendation = ({ recommendation, onViewDetails }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/30 transition-smooth hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <Image 
            src={recommendation?.image} 
            alt={recommendation?.imageAlt}
            className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover"
          />
          <div className="absolute -top-2 -right-2 bg-primary rounded-full p-1">
            <Icon name="Sparkles" size={14} color="white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base font-heading font-bold text-foreground line-clamp-1">{recommendation?.name}</h4>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{recommendation?.collection}</p>
            </div>
            <div className="bg-success/20 px-2 py-1 rounded-lg flex-shrink-0">
              <span className="text-xs md:text-sm font-bold text-success">{recommendation?.confidence}%</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Giá</p>
              <p className="text-sm md:text-base font-bold text-foreground data-text">{recommendation?.price} ETH</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tiềm năng</p>
              <p className="text-sm md:text-base font-bold text-success">+{recommendation?.potential}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted/50 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-foreground line-clamp-2">{recommendation?.reason}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="default" 
          size="sm" 
          fullWidth
          iconName="TrendingUp"
          iconPosition="left"
          onClick={() => onViewDetails(recommendation?.id)}
        >
          Xem chi tiết
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          iconName="Heart"
        />
      </div>
    </div>
  );
};

export default AIRecommendation;