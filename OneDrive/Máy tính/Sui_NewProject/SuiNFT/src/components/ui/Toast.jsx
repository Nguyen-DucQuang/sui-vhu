import React, { useEffect } from 'react';
import Icon from '../AppIcon';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: { name: 'CheckCircle', color: 'var(--color-success)' },
    error: { name: 'AlertCircle', color: 'var(--color-error)' },
    warning: { name: 'AlertTriangle', color: 'var(--color-warning)' },
    info: { name: 'Info', color: 'var(--color-primary)' },
  };

  const { name, color } = icons[type] || icons.info;

  return (
    <div className="fixed bottom-6 right-6 z-[200] animate-slide-in-right">
      <div className="bg-card border border-border shadow-2xl rounded-2xl p-4 flex items-center gap-4 min-w-[300px] backdrop-blur-md bg-card/90">
        <div className={`p-2 rounded-xl bg-opacity-10`} style={{ backgroundColor: `${color}20` }}>
          <Icon name={name} size={24} color={color} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-muted rounded-lg transition-smooth text-muted-foreground"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
