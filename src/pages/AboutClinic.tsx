
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutClinic = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-clinic-yellow/20 py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Sobre a Clínica Rocha</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Conheça a trajetória, os profissionais e a missão da Clínica Rocha
              no cuidado com seus pacientes.
            </p>
          </div>
        </section>
        
        {/* History Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
                <p className="mb-4">
                  A Clínica Rocha foi fundada com a missão de proporcionar atendimento
                  terapêutico de alta qualidade, integrando diferentes abordagens
                  para oferecer o melhor tratamento personalizado para cada paciente.
                </p>
                <p className="mb-4">
                  Com anos de experiência e constante atualização, nossos profissionais
                  têm se dedicado a desenvolver métodos cada vez mais eficazes para
                  o acompanhamento e evolução de seus pacientes.
                </p>
                <p>
                  O desenvolvimento do aplicativo Minha Meta é resultado dessa busca
                  contínua por excelência e inovação no tratamento terapêutico.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Clínica Rocha"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Profissionais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?bg=fff"
                      alt="Tay Rocha"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Tay Rocha</h3>
                    <p className="text-clinic-yellow font-medium mb-3">Terapeuta</p>
                    <p className="text-gray-700">
                      Especialista em terapia comportamental, com foco no desenvolvimento
                      de estratégias personalizadas para cada paciente.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?bg=fff"
                      alt="Teonis Rocha"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Teonis Rocha</h3>
                    <p className="text-clinic-yellow font-medium mb-3">Terapeuta</p>
                    <p className="text-gray-700">
                      Especialista em abordagens integrativas, combinando diferentes
                      técnicas para promover o bem-estar e desenvolvimento dos pacientes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
              <p className="text-lg mb-8">
                Proporcionar atendimento terapêutico de excelência, com foco no
                desenvolvimento humano e no bem-estar dos nossos pacientes, utilizando
                métodos inovadores e personalizados para cada necessidade.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-highlight p-4 bg-white shadow-md rounded-lg">
                  <h3 className="font-bold mb-2">Excelência</h3>
                  <p className="text-sm">Compromisso com a qualidade em todos os processos</p>
                </div>
                <div className="card-highlight p-4 bg-white shadow-md rounded-lg">
                  <h3 className="font-bold mb-2">Inovação</h3>
                  <p className="text-sm">Busca constante por novas soluções e métodos</p>
                </div>
                <div className="card-highlight p-4 bg-white shadow-md rounded-lg">
                  <h3 className="font-bold mb-2">Personalização</h3>
                  <p className="text-sm">Tratamento adaptado às necessidades de cada paciente</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-clinic-yellow py-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Conheça o nosso aplicativo de acompanhamento</h2>
            <Link to="/sobre-app" className="btn-secondary inline-block">
              Saiba Mais
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutClinic;
