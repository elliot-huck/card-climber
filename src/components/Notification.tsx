import { useEffect } from 'react';
import { useGameStore } from '../state/gameStore';

export function Notification() {
  const { ui, dismissNotification } = useGameStore();
  
  if (!ui.notification) return null;

  const { notification } = ui;

  useEffect(() => {
    const timer = setTimeout(() => {
      dismissNotification();
    }, notification.duration || 3000);

    return () => clearTimeout(timer);
  }, [notification, dismissNotification]);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success text-white border-success';
      case 'warning':
        return 'bg-warning text-white border-warning';
      case 'error':
        return 'bg-error text-white border-error';
      case 'info':
        return 'bg-info text-white border-info';
      default:
        return 'bg-primary text-white border-primary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`
        max-w-sm rounded-lg border shadow-lg p-4 backdrop-blur-sm
        ${getTypeStyles(notification.type)}
      `}>
        <div className="flex items-start space-x-3">
          <div className="text-lg">
            {getTypeIcon(notification.type)}
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">
              {notification.title}
            </h4>
            <p className="text-sm opacity-90">
              {notification.message}
            </p>
          </div>
          
          <button
            onClick={dismissNotification}
            className="text-lg opacity-70 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}