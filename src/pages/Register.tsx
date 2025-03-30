
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("paciente");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle registration here
    // For now, let's just simulate a basic validation
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    // This would be replaced with actual registration logic
    console.log("Registration attempt with:", { name, email, password, userType });
    
    // For demo purposes, redirect to login page
    window.location.href = "/login";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Criar uma Conta</h1>
            <p className="text-gray-600 mt-2">
              Preencha o formulário para se registrar
            </p>
          </div>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
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
              <label htmlFor="userType" className="block text-gray-700 font-medium mb-2">
                Tipo de Usuário
              </label>
              <div className="flex">
                <label className="flex items-center mr-6">
                  <input
                    type="radio"
                    name="userType"
                    value="paciente"
                    checked={userType === "paciente"}
                    onChange={() => setUserType("paciente")}
                    className="mr-2"
                  />
                  Paciente
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="profissional"
                    checked={userType === "profissional"}
                    onChange={() => setUserType("profissional")}
                    className="mr-2"
                  />
                  Profissional
                </label>
              </div>
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
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirmar Senha
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-clinic-yellow text-black font-medium py-2 px-4 rounded-md hover:bg-clinic-yellow/90 transition-colors"
            >
              Cadastrar
            </button>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-clinic-yellow hover:underline">
                  Faça login
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

export default Register;
