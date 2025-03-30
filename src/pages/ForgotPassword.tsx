
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Por favor, insira seu email");
      return;
    }
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro. Tente novamente mais tarde.");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          {isSubmitted ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Verifique seu email</h1>
              <p className="text-gray-600 mb-6">
                Se existe uma conta associada ao email <strong>{email}</strong>, enviamos instruções para redefinir sua senha.
              </p>
              <Link to="/login" className="text-clinic-yellow hover:underline">
                Voltar para o login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Recuperar Senha</h1>
                <p className="text-gray-600 mt-2">
                  Digite seu email para receber instruções de recuperação de senha
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
                
                <button
                  type="submit"
                  className="w-full bg-clinic-yellow text-black font-medium py-2 px-4 rounded-md hover:bg-clinic-yellow/90 transition-colors"
                >
                  Enviar Instruções
                </button>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Lembrou sua senha?{" "}
                    <Link to="/login" className="text-clinic-yellow hover:underline">
                      Voltar para o login
                    </Link>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
