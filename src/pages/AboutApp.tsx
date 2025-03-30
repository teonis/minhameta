
import { Link } from "react-router-dom";
import { Check, Calendar, User, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutApp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-clinic-yellow/20 py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Sobre o Aplicativo</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Conheça todas as funcionalidades do Minha Meta e como ele pode
              transformar o processo terapêutico.
            </p>
          </div>
        </section>
        
        {/* Overview Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">O que é o Minha Meta?</h2>
                <p className="mb-4">
                  O Minha Meta é uma plataforma web desenvolvida especialmente para
                  a Clínica Rocha, que permite aos profissionais criar, atribuir e
                  monitorar metas semanais personalizadas para seus pacientes.
                </p>
                <p className="mb-4">
                  Com um sistema intuitivo e interativo, profissionais e pacientes
                  podem acompanhar o progresso das atividades propostas, compartilhar
                  evidências e fornecer feedback entre as sessões terapêuticas.
                </p>
                <p>
                  Esta ferramenta foi desenvolvida para potencializar os resultados
                  do tratamento, aumentando o engajamento dos pacientes e fornecendo
                  dados concretos sobre a evolução do processo terapêutico.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                  alt="Aplicativo Minha Meta"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <User className="text-clinic-yellow mr-2" />
                  Para Profissionais
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Criação de metas personalizadas para cada paciente</p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Acompanhamento do progresso em tempo real</p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Fornecimento de feedback sobre as atividades realizadas</p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Análise de desempenho e geração de relatórios</p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Gestão completa da lista de pacientes</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="text-clinic-yellow mr-2" />
                  Para Pacientes
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Visualização das metas atribuídas pelo profissional</p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Registro de conclusão das atividades com evidências</p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Upload de fotos como comprovação das atividades</p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Recebimento de feedback dos profissionais</p>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-clinic-yellow mr-2 mt-1 flex-shrink-0" />
                    <p>Acompanhamento visual do progresso pessoal</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-clinic-yellow rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Criação de Metas</h3>
                    <p className="text-gray-700">
                      O profissional cria metas personalizadas para o paciente,
                      definindo título, descrição, prazo e requisitos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-clinic-yellow rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Atribuição ao Paciente</h3>
                    <p className="text-gray-700">
                      As metas são atribuídas ao paciente, que recebe notificação
                      e pode visualizá-las em seu dashboard.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-clinic-yellow rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Realização de Atividades</h3>
                    <p className="text-gray-700">
                      O paciente realiza as atividades propostas e registra a
                      conclusão, adicionando evidências fotográficas quando necessário.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-clinic-yellow rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Monitoramento e Feedback</h3>
                    <p className="text-gray-700">
                      O profissional monitora o progresso do paciente, fornece
                      feedback e ajusta as metas conforme necessário.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-clinic-yellow rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">5</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Análise de Resultados</h3>
                    <p className="text-gray-700">
                      O sistema gera relatórios e análises de desempenho, permitindo
                      uma visão clara da evolução do paciente ao longo do tempo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-clinic-yellow py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Transforme seu processo terapêutico</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Experimente o Minha Meta e descubra como a tecnologia pode potencializar
              os resultados do seu tratamento ou da sua prática profissional.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="btn-secondary">
                Cadastre-se Agora
              </Link>
              <Link to="/login" className="bg-white text-clinic-black hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition-colors">
                Fazer Login
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutApp;
