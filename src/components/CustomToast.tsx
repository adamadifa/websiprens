import { CheckCircle, XCircle, AlertCircle, Info } from 'react-feather';

interface CustomToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  onClose?: () => void;
  visible?: boolean;
}

const bgMap = {
  success: 'bg-green-500',
  error: 'bg-rose-500',
  info: 'bg-blue-500',
  warning: 'bg-orange-400',
};

const iconMap = {
  success: <CheckCircle size={32} className="text-white" />,
  error: <XCircle size={32} className="text-white" />,
  info: <Info size={32} className="text-white" />,
  warning: <AlertCircle size={32} className="text-white" />,
};

import React, { useEffect, useState } from 'react';

const CustomToast: React.FC<CustomToastProps> = ({ type, title, message, onClose, visible = true }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) setShow(true);
    else {
      // Wait for fade out before unmounting
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  // Don't render at all if not shown
  if (!show && !visible) return null;

  return (
    <div
      className={`relative flex items-center rounded-2xl shadow-lg px-6 py-4 gap-4 min-w-[320px] max-w-[420px] ${bgMap[type]} text-white transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="absolute left-0 top-0 w-20 h-full opacity-25 pointer-events-none select-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="30" cy="50" r="30" fill="white" />
          <circle cx="70" cy="30" r="18" fill="white" />
          <circle cx="70" cy="70" r="12" fill="white" />
        </svg>
      </div>
      <div className="z-10">{iconMap[type]}</div>
      <div className="z-10 flex-1">
        <div className="font-bold text-lg leading-tight">{title}</div>
        <div className="text-white/90 text-sm leading-tight">{message}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="z-10 ml-2 focus:outline-none">
          <span className="text-white text-xl">×</span>
        </button>
      )}
    </div>
  );
};

export default CustomToast;
