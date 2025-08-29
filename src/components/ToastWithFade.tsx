import React, { useEffect, useState } from 'react';
import CustomToast from './CustomToast';

interface ToastState {
  open: boolean;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface ToastWithFadeProps {
  toast: ToastState;
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
}

const ToastWithFade: React.FC<ToastWithFadeProps> = ({ toast, setToast }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (toast.open) {
      setShouldRender(true);
      setTimeout(() => setVisible(true), 10); // allow mount before fade in
    } else if (shouldRender) {
      setVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 300); // match fade out duration
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line
  }, [toast.open]);

  if (!shouldRender) return null;

  return (
    <div className="fixed top-6 left-1/2 z-[9999] -translate-x-1/2">
      <CustomToast
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        visible={visible}
      />
    </div>
  );
};

export default ToastWithFade;
