
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Users } from "lucide-react";
import AuthStatus from "./AuthStatus";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  // Verificar se o usuário está logado quando o componente montar e quando a rota mudar
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
    };
    
    checkLoginStatus();
    
    // Adicionar um event listener para atualizar quando o localStorage mudar
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/9074461e-2771-48a6-9b29-9664cb301ad9.png" 
            alt="Logo Minha Meta" 
            className="h-10 w-auto"
          />
          <span className="font-bold text-xl hidden sm:flex">
            <span className="text-clinic-black">Minha</span>
            <span className="text-clinic-yellow">Meta</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-clinic-yellow transition-colors">
            Início
          </Link>
          <Link to="/sobre-clinica" className="hover:text-clinic-yellow transition-colors">
            Sobre a Clínica
          </Link>
          <Link to="/sobre-app" className="hover:text-clinic-yellow transition-colors">
            Sobre o Aplicativo
          </Link>
          <Link to="/comunidade" className="flex items-center gap-1 hover:text-clinic-yellow transition-colors">
            <Users size={18} /> Comunidade
          </Link>
          
          {isLoggedIn ? (
            <AuthStatus />
          ) : (
            <>
              <Link to="/login" className="btn-primary">
                Entrar
              </Link>
              <Link to="/register" className="btn-secondary">
                Cadastrar
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-3">
            <Link to="/" className="hover:text-clinic-yellow p-2 transition-colors" onClick={toggleMenu}>
              Início
            </Link>
            <Link to="/sobre-clinica" className="hover:text-clinic-yellow p-2 transition-colors" onClick={toggleMenu}>
              Sobre a Clínica
            </Link>
            <Link to="/sobre-app" className="hover:text-clinic-yellow p-2 transition-colors" onClick={toggleMenu}>
              Sobre o Aplicativo
            </Link>
            <Link to="/comunidade" className="flex items-center gap-1 hover:text-clinic-yellow p-2 transition-colors" onClick={toggleMenu}>
              <Users size={18} /> Comunidade
            </Link>
            
            {isLoggedIn ? (
              <div className="p-2">
                <AuthStatus />
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-primary p-2 text-center" onClick={toggleMenu}>
                  Entrar
                </Link>
                <Link to="/register" className="btn-secondary p-2 text-center" onClick={toggleMenu}>
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
