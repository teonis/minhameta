
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutClinic = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-gradient py-12 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">Clínica Rocha</h1>
            <p className="text-base sm:text-xl mb-6 sm:mb-8">
              Uma abordagem integrada e personalizada para o seu bem-estar físico e mental.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="btn-primary w-full sm:w-auto text-center">
                Acessar Plataforma
              </Link>
              <Link to="/register" className="btn-secondary w-full sm:w-auto text-center">
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-12 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Sobre a Clínica</h2>
            
            <div className="mb-8 sm:mb-12 card-highlight pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Nossa História</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                Fundada em 2010 pelos Drs. Tay e Teonis Rocha, a Clínica Rocha nasceu do desejo de proporcionar um ambiente acolhedor onde os pacientes pudessem receber tratamento de excelência, com foco em resultados duradouros e melhoria da qualidade de vida.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Ao longo dos anos, nos estabelecemos como referência em terapias comportamentais e cognitivas, expandindo nossa atuação para diversas áreas da saúde mental e bem-estar.
              </p>
            </div>
            
            <div className="mb-8 sm:mb-12 card-highlight pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Nossa Missão</h3>
              <p className="text-sm sm:text-base text-gray-700">
                Promover a saúde mental e o bem-estar dos nossos pacientes através de abordagens terapêuticas baseadas em evidências, personalizadas para as necessidades individuais de cada pessoa, e acompanhamento contínuo que garanta resultados efetivos e duradouros.
              </p>
            </div>
            
            <div className="mb-8 sm:mb-12 card-highlight pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Nossa Equipe</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                Nossa equipe é formada por profissionais altamente qualificados, com formação sólida e constante atualização nas mais recentes técnicas e abordagens terapêuticas.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                Os fundadores, Dra. Tay Rocha (Psicóloga Comportamental) e Dr. Teonis Rocha (Terapeuta Cognitivo), lideram um time multidisciplinar que inclui psicólogos, psiquiatras, terapeutas ocupacionais e coaches, garantindo uma abordagem integrada ao tratamento.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Todos os nossos profissionais compartilham da mesma filosofia: tratar cada paciente com empatia, respeito e dedicação, criando um vínculo terapêutico forte que potencializa os resultados do tratamento.
              </p>
            </div>
            
            <div className="mb-8 sm:mb-12 card-highlight pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Nossas Instalações</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                Localizada em um ambiente tranquilo e acessível, nossa clínica foi projetada para proporcionar conforto e privacidade aos nossos pacientes.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Contamos com consultórios amplos e acolhedores, equipados com tecnologia de ponta que nos permite oferecer tratamentos inovadores, além de espaços comuns para atividades em grupo e momentos de relaxamento.
              </p>
            </div>
            
            <div className="card-highlight pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Diferenciais</h3>
              <ul className="text-sm sm:text-base text-gray-700 space-y-2">
                <li>• Atendimento personalizado e focado em resultados</li>
                <li>• Abordagem integrativa que considera aspectos físicos, mentais e sociais</li>
                <li>• Uso de tecnologia para monitoramento e acompanhamento contínuo</li>
                <li>• Desenvolvimento de planos terapêuticos individualizados</li>
                <li>• Acompanhamento pós-tratamento para garantir a manutenção dos resultados</li>
                <li>• Plataforma digital "Minha Meta" para engajamento contínuo dos pacientes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Conheça nossa plataforma Minha Meta</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Nossa plataforma exclusiva para acompanhamento terapêutico, desenvolvida para potencializar seus resultados.
          </p>
          <Link to="/sobre-app" className="btn-primary">
            Saiba Mais
          </Link>
        </div>
      </div>
      
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
          <Link to="/" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Início</span>
          </Link>
          
          <Link to="/sobre-clinica" className="flex flex-col items-center justify-center text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-xs mt-1">Clínica</span>
          </Link>
          
          <Link to="/sobre-app" className="flex flex-col items-center justify-center text-gray-700 hover:text-clinic-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">App</span>
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

export default AboutClinic;
