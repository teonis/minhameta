
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-clinic-yellow p-2 rounded-md">
            <span className="font-bold text-clinic-black text-xl">MR</span>
          </div>
          <span className="font-bold text-xl hidden sm:block">Minha Meta</span>
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
          <Link to="/login" className="btn-primary">
            Entrar
          </Link>
          <Link to="/register" className="btn-secondary">
            Cadastrar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-3">
            <Link
              to="/"
              className="hover:text-clinic-yellow p-2 transition-colors"
              onClick={toggleMenu}
            >
              Início
            </Link>
            <Link
              to="/sobre-clinica"
              className="hover:text-clinic-yellow p-2 transition-colors"
              onClick={toggleMenu}
            >
              Sobre a Clínica
            </Link>
            <Link
              to="/sobre-app"
              className="hover:text-clinic-yellow p-2 transition-colors"
              onClick={toggleMenu}
            >
              Sobre o Aplicativo
            </Link>
            <Link
              to="/login"
              className="btn-primary p-2 text-center"
              onClick={toggleMenu}
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="btn-secondary p-2 text-center"
              onClick={toggleMenu}
            >
              Cadastrar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
