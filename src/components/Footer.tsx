import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-secondary text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-clinic-yellow">Minha Meta</h3>
            <p className="text-sm">
              Plataforma de acompanhamento terapêutico para profissionais e pacientes
              da Clínica Rocha.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-clinic-yellow">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-clinic-yellow transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre-clinica" className="hover:text-clinic-yellow transition-colors">
                  Sobre a Clínica
                </Link>
              </li>
              <li>
                <Link to="/sobre-app" className="hover:text-clinic-yellow transition-colors">
                  Sobre o Aplicativo
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-clinic-yellow transition-colors">
                  Entrar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-clinic-yellow">Contato</h3>
            <address className="not-italic text-sm">
              <p>Clínica Rocha</p>
              <p>Email: timerochapb@gmail.com.br</p>
              <p>Telefone: (00) 0000-0000</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Clínica Rocha. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;