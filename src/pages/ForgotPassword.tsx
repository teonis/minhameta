
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/auth/AuthLayout";

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
    <AuthLayout>
      {isSubmitted ? (
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Verifique seu email</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Se existe uma conta associada ao email <strong>{email}</strong>, enviamos instruções para redefinir sua senha.
          </p>
          <Link to="/login" className="text-clinic-yellow hover:underline text-sm sm:text-base">
            Voltar para o login
          </Link>
        </div>
      ) : (
        <>
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold">Recuperar Senha</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Digite seu email para receber instruções de recuperação de senha
            </p>
          </div>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 mb-4 sm:mb-6 text-sm sm:text-base" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4 sm:mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm sm:text-base"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-clinic-yellow text-black font-medium py-2 px-4 rounded-md hover:bg-clinic-yellow/90 transition-colors text-sm sm:text-base"
            >
              Enviar Instruções
            </button>
            
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                Lembrou sua senha?{" "}
                <Link to="/login" className="text-clinic-yellow hover:underline">
                  Voltar para o login
                </Link>
              </p>
            </div>
          </form>
        </>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
