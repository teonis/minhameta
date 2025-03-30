
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComunidadeMeta from "../components/social/ComunidadeMeta";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import { UserRole } from "@/contexts/AuthContext";

const CommunityPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Comunidade Minha Meta</h1>
            <p className="text-lg text-gray-700">
              Conecte-se com outros pacientes e profissionais, compartilhe suas conquistas
              e participe de desafios que podem transformar sua jornada terapêutica.
            </p>
          </div>
          
          <ComunidadeMeta />
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CommunityPage;
