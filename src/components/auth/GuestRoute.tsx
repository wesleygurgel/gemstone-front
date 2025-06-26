import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingOverlay from '@/components/common/LoadingOverlay';

interface GuestRouteProps {
  children: ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Get the redirect path from location state or default to marketplace
  const from = location.state?.from?.pathname || '/marketplace';

  // Render children with loading overlay while checking authentication
  if (loading) {
    return (
      <>
        {children}
        <LoadingOverlay />
      </>
    );
  }

  // Redirect to marketplace or previous location if authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  // Render children if not authenticated
  return <>{children}</>;
};

export default GuestRoute;
