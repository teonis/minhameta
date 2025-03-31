
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { UserRole } from "./types/auth";
import Landing from "./pages/Landing";
import AboutClinic from "./pages/AboutClinic";
import AboutApp from "./pages/AboutApp";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RecoveryCode from "./pages/RecoveryCode";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CommunityPage from "./pages/CommunityPage";
import AIPage from "./pages/AIPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Suspense, lazy } from "react";

const queryClient = new QueryClient();

// Wrapper to handle home page logic
const HomeRoute = () => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinic-yellow"></div>
      </div>
    );
  }
  
  // If authenticated, redirect to appropriate dashboard
  if (isAuthenticated && currentUser) {
    switch (currentUser.role) {
      case UserRole.PROFESSIONAL:
        return <Navigate to="/profissional/dashboard" replace />;
      case UserRole.PATIENT:
        return <Navigate to="/paciente/dashboard" replace />;
      case UserRole.ADMIN:
      case UserRole.SUPER_ADMIN:
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Landing />;
    }
  }
  
  // If not authenticated, show landing page
  return <Landing />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinic-yellow"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/sobre-clinica" element={<AboutClinic />} />
              <Route path="/sobre-app" element={<AboutApp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/recovery-code" element={<RecoveryCode />} />
              <Route path="/profissional/dashboard" element={<ProfessionalDashboard />} />
              <Route path="/paciente/dashboard" element={<PatientDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/comunidade" element={<CommunityPage />} />
              <Route path="/ia" element={<AIPage />} />
              <Route path="/configuracoes" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
