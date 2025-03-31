
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { Progress } from "@/components/ui/progress";

interface RegisterFormProps {
  returnTo: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ returnTo }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { register } = useAuth();
  
  // Função para calcular a força da senha
  const calculatePasswordStrength = (password: string) => {
    if (password.length === 0) return 0;
    
    let score = 0;
    
    // Pontuação base para comprimento
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    
    // Pontuação para complexidade
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Normaliza score para percentual (0-100)
    return Math.min(100, (score / 6) * 100);
  };
  
  // Função para obter a cor da barra de força
  const getStrengthColor = (strength: number) => {
    if (strength < 30) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  // Função para obter o texto do nível de força
  const getStrengthText = (strength: number) => {
    if (strength < 30) return "Fraca";
    if (strength < 70) return "Média";
    return "Forte";
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Formato de email inválido");
      return;
    }
    
    // Validate password length
    if (password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    try {
      // Convert userType string to UserRole enum
      const role = userType === "professional" 
        ? UserRole.PROFESSIONAL 
        : UserRole.PATIENT;
      
      await register(name, email, password, role);
      
      // Registration success notification is shown by auth provider
      
      // Redirect to appropriate dashboard
      navigate(returnTo);
    } catch (err: any) {
      setError(err.message || "Falha no cadastro. Tente novamente mais tarde.");
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
        <label htmlFor="name" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
          Nome Completo
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm sm:text-base"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
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
        <label htmlFor="userType" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
          Tipo de Usuário
        </label>
        <div className="flex">
          <label className="flex items-center mr-4 sm:mr-6 text-sm sm:text-base">
            <input
              type="radio"
              name="userType"
              value="patient"
              checked={userType === "patient"}
              onChange={() => setUserType("patient")}
              className="mr-2"
            />
            Paciente
          </label>
          <label className="flex items-center text-sm sm:text-base">
            <input
              type="radio"
              name="userType"
              value="professional"
              checked={userType === "professional"}
              onChange={() => setUserType("professional")}
              className="mr-2"
            />
            Profissional
          </label>
        </div>
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
            placeholder="••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrength(calculatePasswordStrength(e.target.value));
            }}
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
        
        {/* Barra de força da senha */}
        {password.length > 0 && (
          <div className="mt-2">
            <Progress value={passwordStrength} className="h-2" indicatorClassName={getStrengthColor(passwordStrength)} />
            <p className="text-xs text-gray-500 mt-1">
              Força: {getStrengthText(passwordStrength)}
            </p>
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-1">
          A senha deve ter pelo menos 6 caracteres.
        </p>
      </div>
      
      <div className="mb-4 sm:mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
          Confirmar Senha
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm sm:text-base"
          placeholder="••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-clinic-yellow text-black font-medium py-2 px-4 rounded-md hover:bg-clinic-yellow/90 transition-colors text-sm sm:text-base"
      >
        Cadastrar
      </button>
      
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm sm:text-base text-gray-600">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-clinic-yellow hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
