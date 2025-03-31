
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, currentUser } = useAuth();
  
  // Extract the return route from state params, if available
  const returnTo = location.state?.returnTo || (() => {
    if (currentUser) {
      switch (currentUser.role) {
        case "professional":
          return "/profissional/dashboard";
        case "patient":
          return "/paciente/dashboard";
        case "admin":
        case "super_admin":
          return "/admin/dashboard";
        default:
          return "/";
      }
    }
    return "/";
  })();
  
  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate(returnTo);
    }
    
    // Show success message if coming from password reset
    if (location.state?.passwordReset) {
      toast.success("Senha redefinida com sucesso! Você já pode fazer login com sua nova senha.");
    }
  }, [isAuthenticated, navigate, returnTo, location.state]);
  
  return (
    <AuthLayout>
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Entrar no Minha Meta</h1>
        <p className="text-gray-600 mt-2">
          Faça login para acessar sua conta
        </p>
        {returnTo === '/comunidade' && (
          <p className="text-clinic-yellow mt-2 font-medium">
            Você precisa estar logado para acessar a comunidade
          </p>
        )}
      </div>
      
      <LoginForm returnTo={returnTo} />
    </AuthLayout>
  );
};

export default Login;
