
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComunidadeMeta from "../components/social/ComunidadeMeta";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import { UserRole } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const CommunityPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Comunidade Minha Meta</h1>
            <p className="text-base sm:text-lg text-gray-700">
              Conecte-se com outros pacientes e profissionais, compartilhe suas conquistas
              e participe de desafios que podem transformar sua jornada terapêutica.
            </p>
          </div>
          
          <ComunidadeMeta />
          
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
              <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-xs mt-1">Início</span>
              </button>
              
              <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-xs mt-1">Feed</span>
              </button>
              
              <button className="flex flex-col items-center justify-center text-clinic-yellow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs mt-1">Comunidade</span>
              </button>
              
              <button className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs mt-1">Perfil</span>
              </button>
            </div>
          )}
        </main>
        
        {/* Add bottom padding on mobile to account for the fixed navigation */}
        {isMobile && <div className="h-16"></div>}
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CommunityPage;
