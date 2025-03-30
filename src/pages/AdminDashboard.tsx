
import React from 'react';
import { Shield, Users, UserCheck, AlertTriangle, Settings, Activity } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/security/ProtectedRoute';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  
  // Check if user is super admin
  const isSuperAdmin = currentUser?.role === UserRole.SUPER_ADMIN;
  
  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-4 sm:py-8">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold">
              {isSuperAdmin ? 'Painel do Super Administrador' : 'Painel do Administrador'}
            </h1>
            
            <div className="flex items-center gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
              <Shield size={isMobile ? 14 : 16} className={isSuperAdmin ? "text-red-600" : "text-purple-600"} />
              <span className="text-xs sm:text-sm font-medium">
                {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <h3 className="font-medium text-sm sm:text-base">Total de Usuários</h3>
                <Users size={isMobile ? 18 : 20} className="text-clinic-yellow" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold">243</p>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-green-600">+5.2% desde o mês passado</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <h3 className="font-medium text-sm sm:text-base">Profissionais Ativos</h3>
                <UserCheck size={isMobile ? 18 : 20} className="text-clinic-yellow" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold">37</p>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-green-600">+2.8% desde o mês passado</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <h3 className="font-medium text-sm sm:text-base">Incidentes de Segurança</h3>
                <AlertTriangle size={isMobile ? 18 : 20} className="text-clinic-yellow" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold">0</p>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-green-600">Nenhum incidente reportado</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Atividade Recente</h2>
                <div className="space-y-3 sm:space-y-4">
                  {/* Activity logs - would be dynamically generated in a real app */}
                  <div className="border-b pb-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="bg-blue-100 rounded-full p-1 sm:p-1.5">
                        <Activity size={isMobile ? 14 : 16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Novo profissional cadastrado</p>
                        <p className="text-xs sm:text-sm text-gray-600">Dra. Ana Silva criou uma nova conta</p>
                        <p className="text-xs text-gray-500 mt-1">Hoje, 10:45</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="bg-purple-100 rounded-full p-1 sm:p-1.5">
                        <Settings size={isMobile ? 14 : 16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Configurações atualizadas</p>
                        <p className="text-xs sm:text-sm text-gray-600">Política de senhas atualizada</p>
                        <p className="text-xs text-gray-500 mt-1">Ontem, 15:20</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="bg-red-100 rounded-full p-1 sm:p-1.5">
                        <AlertTriangle size={isMobile ? 14 : 16} className="text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Tentativas de login suspeitas</p>
                        <p className="text-xs sm:text-sm text-gray-600">Múltiplas tentativas de login detectadas</p>
                        <p className="text-xs text-gray-500 mt-1">15/03/2023, 08:12</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Ações Rápidas</h2>
                <div className="space-y-2 sm:space-y-3">
                  <button className="w-full bg-clinic-yellow text-black font-medium py-2 px-4 rounded-md hover:bg-clinic-yellow/90 transition-colors text-sm sm:text-base">
                    Gerenciar Usuários
                  </button>
                  <button className="w-full bg-white border border-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base">
                    Configurar Permissões
                  </button>
                  <button className="w-full bg-white border border-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base">
                    Visualizar Logs
                  </button>
                  <button className="w-full bg-white border border-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base">
                    Backup do Sistema
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
