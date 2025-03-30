
import { Link } from "react-router-dom";
import { Check, Calendar, User, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Lighter gradient and more spacious layout */}
        <section className="bg-gradient-to-br from-amber-50 via-yellow-100 to-white py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 bg-white/80 text-clinic-black px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                  <Sparkles size={16} className="text-clinic-yellow" />
                  Transforme sua jornada terapêutica
                </span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  Transforme metas em{" "}
                  <span className="text-clinic-yellow">conquistas</span>
                </h1>
                <p className="text-lg text-gray-700">
                  O Minha Meta conecta profissionais e pacientes, transformando o tratamento terapêutico 
                  em uma jornada de conquistas claras e mensuráveis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/register" className="btn-primary text-center shadow-md hover:shadow-lg transition-all">
                    Comece Agora
                  </Link>
                  <Link to="/sobre-app" className="btn-secondary text-center bg-white text-gray-800 border border-gray-200 hover:bg-gray-50">
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
        
        {/* Features Section - More modern card design */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
              <p className="text-gray-600">A plataforma que está transformando a experiência terapêutica na Clínica Rocha</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-clinic-yellow/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <User size={24} className="text-clinic-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Personalizado</h3>
                <p className="text-gray-600">
                  Profissionais criam metas personalizadas para cada paciente,
                  considerando suas necessidades específicas.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-clinic-yellow/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Calendar size={24} className="text-clinic-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Acompanhamento</h3>
                <p className="text-gray-600">
                  Pacientes registram seus progressos e evidências das atividades
                  realizadas durante a semana.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="bg-clinic-yellow/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Check size={24} className="text-clinic-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-3">Resultados</h3>
                <p className="text-gray-600">
                  Profissionais monitoram o progresso e fornecem feedback,
                  ajustando as metas conforme necessário.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section - Fresher look with better image */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-8">Benefícios</h2>
                <ul className="space-y-5">
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                    <Check className="text-clinic-yellow mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Clareza nos objetivos</p>
                      <p className="text-gray-600 text-sm">Metas bem definidas e mensuráveis para cada semana</p>
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
                      <p className="text-gray-600 text-sm">Visualização clara da evolução ao longo do tempo</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
                  alt="Paciente usando o aplicativo Minha Meta" 
                  className="rounded-xl shadow-xl object-cover h-[500px] w-full" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Softer tone with gradient */}
        <section className="py-20 bg-gradient-to-r from-amber-50 via-clinic-yellow/40 to-amber-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para transformar o acompanhamento terapêutico?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">
              Junte-se a profissionais e pacientes que já estão usando o Minha Meta
              para alcançar resultados mais efetivos.
            </p>
            <Link to="/register" className="inline-block bg-white text-gray-800 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all font-medium">
              Cadastre-se Gratuitamente
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;
