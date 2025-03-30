
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle authentication here
    // For now, let's just simulate a basic validation
    
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    // This would be replaced with actual authentication logic
    console.log("Login attempt with:", { email, password });
    
    // For demo purposes, redirect to the appropriate dashboard based on email
    if (email.includes("profissional")) {
      window.location.href = "/profissional/dashboard";
    } else {
      window.location.href = "/paciente/dashboard";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Entrar no Minha Meta</h1>
            <p className="text-gray-600 mt-2">
              Faça login para acessar sua conta
            </p>
          </div>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <div className="mt-2 text-right">
                <a href="#" className="text-sm text-clinic-yellow hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-clinic-yellow text-black font-medium py-2 px-4 rounded-md hover:bg-clinic-yellow/90 transition-colors"
            >
              Entrar
            </button>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Não tem uma conta?{" "}
                <Link to="/register" className="text-clinic-yellow hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
