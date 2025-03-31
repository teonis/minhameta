
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import PasswordInput from "./password/PasswordInput";
import PasswordStrengthIndicator from "./password/PasswordStrengthIndicator";
import FormError from "./common/FormError";
import UserTypeSelector from "./common/UserTypeSelector";
import FormInput from "./common/FormInput";

interface RegisterFormProps {
  returnTo: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ returnTo }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const calculatePasswordStrength = (password: string) => {
    if (password.length === 0) return 0;
    
    let score = 0;
    
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(100, (score / 6) * 100);
  };
  
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Formato de email inválido");
      return;
    }
    
    if (password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    try {
      const role = userType === "professional" 
        ? UserRole.PROFESSIONAL 
        : UserRole.PATIENT;
      
      await register(name, email, password, role);
      
      navigate(returnTo);
    } catch (err: any) {
      setError(err.message || "Falha no cadastro. Tente novamente mais tarde.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormError error={error} />
      
      <FormInput
        id="name"
        label="Nome Completo"
        type="text"
        placeholder="Seu nome completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <UserTypeSelector 
        userType={userType}
        onChange={setUserType}
      />
      
      <div className="mb-4 sm:mb-6">
        <label htmlFor="password" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
          Senha
        </label>
        <PasswordInput
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="••••••"
        />
        
        {password.length > 0 && (
          <PasswordStrengthIndicator strength={passwordStrength} />
        )}
        
        <p className="text-xs text-gray-500 mt-1">
          A senha deve ter pelo menos 6 caracteres.
        </p>
      </div>
      
      <div className="mb-4 sm:mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
          Confirmar Senha
        </label>
        <PasswordInput
          id="confirmPassword"
          value={confirmPassword}
          onChange={(value) => setConfirmPassword(value)}
          placeholder="••••••"
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
