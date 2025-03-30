
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComunidadeMeta from "../components/social/ComunidadeMeta";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de verificação de autenticação
    // Em uma aplicação real, isso viria de um contexto de autenticação ou de uma API
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast.error("Você precisa estar logado para acessar a comunidade", {
        description: "Redirecionando para a página de login...",
        duration: 3000
      });
      
      // Pequeno delay para mostrar o toast antes de redirecionar
      const timeout = setTimeout(() => {
        navigate('/login', { state: { returnTo: '/comunidade' } });
      }, 1500);
      
      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clinic-yellow mx-auto mb-4"></div>
            <p className="text-lg">Carregando comunidade...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
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
  );
};

export default CommunityPage;
