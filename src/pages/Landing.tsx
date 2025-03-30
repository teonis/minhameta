
import { Link } from "react-router-dom";
import { Check, Calendar, User } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Transforme metas em{" "}
                  <span className="text-clinic-yellow">conquistas</span>
                </h1>
                <p className="text-lg mb-8">
                  O Minha Meta é a plataforma da Clínica Rocha que conecta profissionais e pacientes,
                  transformando o tratamento terapêutico em uma jornada de conquistas claras e mensuráveis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
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
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Profissional usando o Minha Meta"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-clinic-yellow/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <User size={28} className="text-clinic-black" />
                </div>
                <h3 className="text-xl font-bold mb-3">Personalizado</h3>
                <p>
                  Profissionais criam metas personalizadas para cada paciente,
                  considerando suas necessidades específicas.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-clinic-yellow/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Calendar size={28} className="text-clinic-black" />
                </div>
                <h3 className="text-xl font-bold mb-3">Acompanhamento</h3>
                <p>
                  Pacientes registram seus progressos e evidências das atividades
                  realizadas durante a semana.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-clinic-yellow/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Check size={28} className="text-clinic-black" />
                </div>
                <h3 className="text-xl font-bold mb-3">Resultados</h3>
                <p>
                  Profissionais monitoram o progresso e fornecem feedback,
                  ajustando as metas conforme necessário.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Benefícios</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>
                      <strong>Clareza nos objetivos:</strong> Metas bem definidas
                      e mensuráveis para cada semana
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>
                      <strong>Engajamento:</strong> Maior participação e
                      comprometimento dos pacientes
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>
                      <strong>Acompanhamento contínuo:</strong> Feedback regular
                      entre sessões terapêuticas
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>
                      <strong>Análise de progresso:</strong> Visualização clara
                      da evolução ao longo do tempo
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                  alt="Paciente usando o aplicativo Minha Meta"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-clinic-yellow py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para transformar o acompanhamento terapêutico?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Junte-se a profissionais e pacientes que já estão usando o Minha Meta
              para alcançar resultados mais efetivos.
            </p>
            <Link to="/register" className="btn-secondary inline-block">
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
