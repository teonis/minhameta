
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Extract the return route from state params, if available
  const returnTo = location.state?.returnTo || (
    currentUser?.role === "professional" ? "/profissional/dashboard" : "/paciente/dashboard"
  );
  
  return (
    <AuthLayout>
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Criar uma Conta</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Preencha o formulário para se registrar
        </p>
        {location.state?.returnTo === '/comunidade' && (
          <p className="text-clinic-yellow mt-2 font-medium text-sm sm:text-base">
            Você precisa estar cadastrado para acessar a comunidade
          </p>
        )}
      </div>
      
      <RegisterForm returnTo={returnTo} />
    </AuthLayout>
  );
};

export default Register;
