import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { ToastType } from '@/context/ToastContext';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  // Define colors and icons based on toast type
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-gradient-to-r from-green-500 to-gem-cyan',
          icon: <CheckCircle size={20} className="text-white" />,
          borderColor: 'border-gem-cyan',
        };
      case 'error':
        return {
          bgColor: 'bg-gradient-to-r from-red-500 to-gem-pink',
          icon: <AlertCircle size={20} className="text-white" />,
          borderColor: 'border-gem-pink',
        };
      case 'warning':
        return {
          bgColor: 'bg-gradient-to-r from-yellow-500 to-amber-500',
          icon: <AlertTriangle size={20} className="text-white" />,
          borderColor: 'border-yellow-500',
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-gradient-to-r from-gem-purple to-gem-blue',
          icon: <Info size={20} className="text-white" />,
          borderColor: 'border-gem-blue',
        };
    }
  };

  const { bgColor, icon, borderColor } = getToastStyles();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className={`${bgColor} text-white rounded-md shadow-lg border-l-4 ${borderColor} min-w-[300px] max-w-md backdrop-blur-sm bg-opacity-90`}
    >
      <div className="flex items-center p-3">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <div className="flex-1 mr-2">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;