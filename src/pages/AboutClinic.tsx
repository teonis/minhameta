
import { Link } from "react-router-dom";

const AboutClinic = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Clínica Rocha</h1>
            <p className="text-lg md:text-xl mb-8">
              Uma abordagem integrada e personalizada para o seu bem-estar físico e mental.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="btn-primary">
                Acessar Plataforma
              </Link>
              <Link to="/register" className="btn-secondary">
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Sobre a Clínica</h2>
            
            <div className="mb-12 card-highlight pl-6">
              <h3 className="text-xl font-bold mb-3">Nossa História</h3>
              <p className="text-gray-700 mb-4">
                Fundada em 2010 pelos Drs. Tay e Teonis Rocha, a Clínica Rocha nasceu do desejo de proporcionar um ambiente acolhedor onde os pacientes pudessem receber tratamento de excelência, com foco em resultados duradouros e melhoria da qualidade de vida.
              </p>
              <p className="text-gray-700">
                Ao longo dos anos, nos estabelecemos como referência em terapias comportamentais e cognitivas, expandindo nossa atuação para diversas áreas da saúde mental e bem-estar.
              </p>
            </div>
            
            <div className="mb-12 card-highlight pl-6">
              <h3 className="text-xl font-bold mb-3">Nossa Missão</h3>
              <p className="text-gray-700">
                Promover a saúde mental e o bem-estar dos nossos pacientes através de abordagens terapêuticas baseadas em evidências, personalizadas para as necessidades individuais de cada pessoa, e acompanhamento contínuo que garanta resultados efetivos e duradouros.
              </p>
            </div>
            
            <div className="mb-12 card-highlight pl-6">
              <h3 className="text-xl font-bold mb-3">Nossa Equipe</h3>
              <p className="text-gray-700 mb-4">
                Nossa equipe é formada por profissionais altamente qualificados, com formação sólida e constante atualização nas mais recentes técnicas e abordagens terapêuticas.
              </p>
              <p className="text-gray-700 mb-4">
                Os fundadores, Dra. Tay Rocha (Psicóloga Comportamental) e Dr. Teonis Rocha (Terapeuta Cognitivo), lideram um time multidisciplinar que inclui psicólogos, psiquiatras, terapeutas ocupacionais e coaches, garantindo uma abordagem integrada ao tratamento.
              </p>
              <p className="text-gray-700">
                Todos os nossos profissionais compartilham da mesma filosofia: tratar cada paciente com empatia, respeito e dedicação, criando um vínculo terapêutico forte que potencializa os resultados do tratamento.
              </p>
            </div>
            
            <div className="mb-12 card-highlight pl-6">
              <h3 className="text-xl font-bold mb-3">Nossas Instalações</h3>
              <p className="text-gray-700 mb-4">
                Localizada em um ambiente tranquilo e acessível, nossa clínica foi projetada para proporcionar conforto e privacidade aos nossos pacientes.
              </p>
              <p className="text-gray-700">
                Contamos com consultórios amplos e acolhedores, equipados com tecnologia de ponta que nos permite oferecer tratamentos inovadores, além de espaços comuns para atividades em grupo e momentos de relaxamento.
              </p>
            </div>
            
            <div className="card-highlight pl-6">
              <h3 className="text-xl font-bold mb-3">Diferenciais</h3>
              <ul className="text-gray-700 space-y-2">
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
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Conheça nossa plataforma Minha Meta</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Nossa plataforma exclusiva para acompanhamento terapêutico, desenvolvida para potencializar seus resultados.
          </p>
          <Link to="/sobre-app" className="btn-primary">
            Saiba Mais
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutClinic;
