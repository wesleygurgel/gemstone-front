// src/main.tsx
import './i18n'; // inicializa i18next antes de qualquer render
import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { useTranslation } from 'react-i18next';
import router from './routes';
import './index.css';

function DirController() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lng = i18n.resolvedLanguage || i18n.language || 'en';
    document.documentElement.lang = lng;
    document.documentElement.dir = lng.startsWith('ar') ? 'rtl' : 'ltr';
  }, [i18n.resolvedLanguage, i18n.language]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <Suspense fallback={null}>
                <DirController />
                <RouterProvider router={router} />
              </Suspense>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
