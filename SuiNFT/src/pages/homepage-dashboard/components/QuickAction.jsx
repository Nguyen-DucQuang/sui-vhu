import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickAction = ({ icon, title, description, onClick, iconColor }) => {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/30 transition-smooth hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] text-left w-full group"
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth flex-shrink-0">
          <Icon name={icon} size={24} color={iconColor || 'var(--color-primary)'} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm md:text-base font-heading font-bold text-foreground mb-1">{title}</h4>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary transition-smooth flex-shrink-0" />
      </div>
    </button>
  );
};

export default QuickAction;