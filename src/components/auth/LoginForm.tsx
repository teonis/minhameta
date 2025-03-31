
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  returnTo: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ returnTo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    try {
      await login(email, password);
      // Login success toast is shown by the auth provider
      // Redirect handled by the useEffect in the parent component
    } catch (err: any) {
      setError(err.message || "Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 mb-4 sm:mb-6 text-sm sm:text-base" role="alert">
          <p>{error}</p>
        </div>
      )}
      
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
      
      <div className="mb-4 sm:mb-6">
        <label htmlFor="password" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
          Senha
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm sm:text-base"
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
              <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            )}
          </button>
        </div>
        <div className="mt-2 text-right">
          <Link to="/forgot-password" className="text-xs sm:text-sm text-clinic-yellow hover:underline">
            Esqueceu sua senha?
          </Link>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-clinic-yellow text-black font-medium py-2 px-4 rounded-md hover:bg-clinic-yellow/90 transition-colors text-sm sm:text-base"
      >
        Entrar
      </button>
      
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-gray-600 text-sm sm:text-base">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-clinic-yellow hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
