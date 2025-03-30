
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-50 via-yellow-100 to-white py-12 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-5xl font-bold">
                  Transformando metas em{" "}
                  <span className="text-clinic-yellow">conquistas</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-700">
                  O Minha Meta da Clínica Rocha conecta profissionais e pacientes, transformando o tratamento terapêutico 
                  em uma jornada de conquistas claras e mensuráveis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4">
                  <Link to="/register" className="btn-primary text-center">
                    Comece Agora
                  </Link>
                  <Link to="/sobre-app" className="btn-secondary text-center">
                    Saiba Mais
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  alt="Minha Meta App" 
                  className="rounded-xl shadow-xl" 
                  src="/lovable-uploads/b31f6405-fca3-414f-afab-1a5e8a746dd6.jpg" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Como Funciona</h2>
              <p className="text-base sm:text-lg text-gray-600">A plataforma que está transformando a experiência terapêutica</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Personalizado</h3>
                <p className="text-gray-600">
                  Metas personalizadas para cada paciente, considerando suas necessidades específicas.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Acompanhamento</h3>
                <p className="text-gray-600">
                  Registre seu progresso e evidências das atividades realizadas durante a semana.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Resultados</h3>
                <p className="text-gray-600">
                  Monitoramento de progresso e feedback, com ajustes nas metas para melhor evolução.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-r from-amber-50 via-clinic-yellow/30 to-amber-50">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Pronto para transformar sua jornada terapêutica?</h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 text-gray-700">
              Junte-se aos pacientes que já estão usando o Minha Meta
              para alcançar resultados mais efetivos em seus tratamentos.
            </p>
            <Link to="/register" className="inline-block bg-clinic-yellow text-black px-5 py-3 rounded-lg font-medium">
              Cadastre-se Gratuitamente
            </Link>
          </div>
        </section>
      </main>
      
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
          <Link to="/" className="flex flex-col items-center justify-center text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Início</span>
          </Link>
          
          <Link to="/sobre-app" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">Sobre</span>
          </Link>
          
          <Link to="/comunidade" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs mt-1">Comunidade</span>
          </Link>
          
          <Link to="/login" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Entrar</span>
          </Link>
        </div>
      )}
      
      {isMobile && <div className="h-16"></div>}
      
      <Footer />
    </div>
  );
};

export default Index;
