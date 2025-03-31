
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
    </div>
  );
};

export default BackToLogin;
