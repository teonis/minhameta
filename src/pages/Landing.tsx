
import { Link } from "react-router-dom";
import { Check, Calendar, User, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const Landing = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - More responsive with better mobile spacing */}
        <section className="bg-gradient-to-br from-amber-50 via-yellow-100 to-white py-16 md:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-4 md:space-y-6">
                <Link to="/ia" className="inline-flex items-center gap-2 bg-white/80 text-clinic-black px-3 py-1.5 rounded-full text-sm font-medium shadow-sm hover:bg-white hover:shadow-md transition-all">
                  <Sparkles size={16} className="text-clinic-yellow" />
                  Clínica Rocha + Poder da IA, clique para saber mais
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold">
                  Transformando metas em{" "}
                  <span className="text-clinic-yellow">conquistas</span>
                </h1>
                <p className="text-base md:text-lg text-gray-700">
                  O Minha Meta da Clínica Rocha conecta profissionais e pacientes, transformando o tratamento terapêutico 
                  em uma jornada de conquistas claras e mensuráveis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/register" className="btn-primary text-center shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
                    Comece Agora
                  </Link>
                  <Link to="/sobre-app" className="btn-secondary text-center bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 w-full sm:w-auto">
                    Saiba Mais
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  alt="Profissional usando o Minha Meta" 
                  className="rounded-xl shadow-xl object-cover h-[450px] w-full transform hover:scale-[1.02] transition-transform duration-300" 
                  src="/lovable-uploads/b31f6405-fca3-414f-afab-1a5e8a746dd6.jpg" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section - Better mobile cards and spacing */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Como Funciona</h2>
              <p className="text-base md:text-lg text-gray-600">A plataforma que está transformando a experiência terapêutica na Clínica Rocha</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-clinic-yellow/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <User size={24} className="text-clinic-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Personalizado</h3>
                <p className="text-gray-600">
                  Os terapeutas da Clínica Rocha criam metas personalizadas para cada paciente,
                  considerando suas necessidades específicas.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-clinic-yellow/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Calendar size={24} className="text-clinic-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Acompanhamento</h3>
                <p className="text-gray-600">
                  Pacientes registram seus progressos e evidências das atividades
                  realizadas durante a semana no aplicativo da Clínica Rocha.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-clinic-yellow/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Check size={24} className="text-clinic-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Resultados</h3>
                <p className="text-gray-600">
                  Profissionais da Clínica Rocha monitoram o progresso e fornecem feedback,
                  ajustando as metas conforme necessário para melhor evolução.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section - Stacked on mobile, side by side on desktop */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Benefícios do Minha Meta</h2>
                <ul className="space-y-4">
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                    <Check className="text-clinic-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Clareza nos objetivos terapêuticos</p>
                      <p className="text-gray-600 text-sm">Metas bem definidas e mensuráveis</p>
                    </div>
                  </li>
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                    <Check className="text-clinic-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Engajamento</p>
                      <p className="text-gray-600 text-sm">Maior participação e comprometimento dos pacientes</p>
                    </div>
                  </li>
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                    <Check className="text-clinic-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Acompanhamento contínuo</p>
                      <p className="text-gray-600 text-sm">Feedback regular entre sessões terapêuticas</p>
                    </div>
                  </li>
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                    <Check className="text-clinic-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Análise de progresso</p>
                      <p className="text-gray-600 text-sm">Visualização clara da evolução ao longo do tratamento</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-8 md:mt-0">
                <img 
                  src="/lovable-uploads/8e2aa498-0d65-4ede-805c-f77f7bdc4e89.png" 
                  alt="Paciente feliz se exercitando" 
                  className="rounded-xl shadow-xl object-cover h-auto w-full md:h-[500px]" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Improved mobile layout */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-amber-50 via-clinic-yellow/40 to-amber-50">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Pronto para transformar sua jornada terapêutica?</h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8 text-gray-700">
              Junte-se aos pacientes que já estão usando o Minha Meta
              para alcançar resultados mais efetivos em seus tratamentos.
            </p>
            <Link to="/register" className="inline-block bg-white text-gray-800 px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all font-medium w-full sm:w-auto">
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

export default Landing;
