import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const AboutClinic = () => {
  const isMobile = useIsMobile();
  return <div className="min-h-screen bg-white">
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
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">A Clínica Rocha nasceu com uma visão poderosa: transformar vidas através da saúde integrada e resultados reais. Fundada pela união de especialistas apaixonados pela medicina, nutrição e desempenho físico, desde o início tivemos um propósito claro: levar cada paciente ao seu próximo nível.

Nossa jornada começou com o Time Rocha, um grupo focado em promover saúde e performance de maneira personalizada. A demanda cresceu, os resultados falaram por si mesmos, e hoje contamos com unidades completas em João Pessoa e Guarabira, oferecendo serviços que abrangem cardiologia, ortopedia, ginecologia, nutrologia, fisioterapia e odontologia.</p>
              <p className="text-sm sm:text-base text-gray-700">Mais que uma clínica, somos uma comunidade. Aqui, cada história de sucesso inspira outras centenas, fortalecendo nossa essência e impulsionando nosso crescimento contínuo. Venha fazer parte dessa história. Venha conquistar o seu próximo nível com a Clínica Rocha.</p>
            </div>
            
            <div className="mb-8 sm:mb-12 card-highlight pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Nossa Missão</h3>
              <p className="text-sm sm:text-base text-gray-700">Nossa missão vai além do tratamento clínico tradicional: queremos elevar você ao seu melhor desempenho, com saúde plena e qualidade de vida real. Cada atendimento é uma oportunidade única de gerar transformação duradoura e significativa.

Na Clínica Rocha, trabalhamos para:

Personalizar cada estratégia de saúde e performance.

Inspirar hábitos e mentalidades vencedoras.

Construir uma comunidade que respira motivação e conquistas.

Oferecer excelência técnica e acolhimento humano em cada consulta.

Nosso compromisso é um só: levar você ao seu próximo nível.</p>
            </div>
            
            <div className="mb-8 sm:mb-12 card-highlight pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Nossa Equipe</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">O poder da Clínica Rocha está na força da nossa equipe. Unimos os melhores profissionais em saúde para cuidar de você em cada etapa do caminho rumo aos seus objetivos.

Aqui você encontra:</p>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">Médicos especialistas em Endocrinologia, Ginecologia, Cardiologia, Nutrologia, Ortopedia e Muito mais, dedicados à excelência em resultados clínicos.
Nutricionistas e profissionais do exercício físico preparados para transformar sua alimentação e seu corpo com planos altamente personalizados.
Fisioterapeutas e odontologistas comprometidos com tratamentos que melhoram sua saúde, autoestima e qualidade de vida.</p>
              <p className="text-sm sm:text-base text-gray-700">Cada profissional da Clínica Rocha passa por um rigoroso treinamento em atendimento humanizado e técnicas de alta performance. Não basta ser especialista: é preciso ter paixão por cuidar de você.

Sua meta é nosso propósito. Sua vitória é nossa maior recompensa.

            </p>
            </div>
            
            <div className="mb-8 sm:mb-12 card-highlight pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Nossas Instalações</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">Localizada em um ambiente tranquilo e acessível, nossa clínica foi projetada para proporcionar conforto e privacidade aos nossos pacientes.
Atualmente, contamos com duas unidades completas e de fácil acesso:
            </p>
              <p className="text-sm sm:text-base text-gray-700">📍João Pessoa – Ecomedical SUL Uma estrutura ampla com 120 m², localizada estrategicamente para proporcionar máxima conveniência. Aqui, você encontra consultórios modernos, equipamentos avançados, e ambientes dedicados à cardiologia, fisioterapia, ginecologia, ortopedia, odontologia e muito mais.

📍Guarabira – Shopping Cidade Luz Nossa clínica de 90 m² dentro do Shopping Cidade Luz garante acesso facilitado e praticidade no seu dia a dia. Com espaços planejados para um atendimento acolhedor e eficiente, oferecemos serviços completos com o padrão de qualidade Rocha que você já conhece.</p>
            </div>
            
            <div className="card-highlight pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Diferenciais</h3>
              <ul className="text-sm sm:text-base text-gray-700 space-y-2">
                <li>✅ Atendimento Humanizado: Valorizamos o acolhimento e a conexão emocional com cada paciente.</li>
                <li>✅ Tratamentos Personalizados: Planos de saúde e performance desenhados exclusivamente para as suas necessidades e objetivos.</li>
                <li>✅ Alta Tecnologia: Equipamentos de última geração, como a avaliação corporal por bioimpedância (Inbody 270) para máxima precisão e resultado.</li>
                <li>✅ Comunidade Rocha: Um ambiente inspirador, cheio de histórias reais e motivação constante.</li>
                <li>✅ Acompanhamento pós-tratamento para garantir a manutenção dos resultados</li>
                <li>✅ Plataforma digital "Minha Meta" para engajamento contínuo dos pacientes</li>
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
      
      {isMobile && <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around z-10">
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
        </div>}
      
      {isMobile && <div className="h-16"></div>}
      
      <Footer />
    </div>;
};
export default AboutClinic;