
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { currentUser, isAuthenticated, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading indicator while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinic-yellow"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    toast.error("Você precisa estar logado para acessar essa página");
    return <Navigate to="/login" state={{ returnTo: location.pathname }} replace />;
  }

  // If a specific role is required, check permissions
  if (requiredRole && !hasPermission(requiredRole)) {
    toast.error("Você não tem permissão para acessar essa página");
    
    // Redirect based on user role
    const redirectPath = currentUser?.role === UserRole.PATIENT 
      ? '/paciente/dashboard' 
      : currentUser?.role === UserRole.PROFESSIONAL 
        ? '/profissional/dashboard' 
        : '/';
        
    return <Navigate to={redirectPath} replace />;
  }

  // User is authenticated and has required permissions
  return <>{children}</>;
};

export default ProtectedRoute;
