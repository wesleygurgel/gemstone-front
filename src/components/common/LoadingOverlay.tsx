import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = 'Carregando...' 
}) => {
  return (
    <div className="fixed inset-0 bg-black-900/70 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-purple mb-4"></div>
        
        {/* Loading message */}
        <p className="text-white text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;