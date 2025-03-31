
import React from "react";
import { Link } from "react-router-dom";

const BackToLogin: React.FC = () => {
  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        Lembrou sua senha?{" "}
        <Link to="/login" className="text-clinic-yellow hover:underline">
          Voltar para o login
        </Link>
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Não recebendo emails?{" "}
        <Link to="/recovery-code" className="text-clinic-yellow hover:underline">
          Usar recuperação alternativa
        </Link>
      </p>
    </div>
  );
};

export default BackToLogin;
