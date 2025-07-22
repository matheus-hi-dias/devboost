import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  onClose?: () => void;
  duration?: number;
}

export function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration])

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white font-semibold transition ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  )
}