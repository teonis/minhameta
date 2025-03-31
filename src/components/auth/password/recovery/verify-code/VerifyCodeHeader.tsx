
import React from "react";

interface VerifyCodeHeaderProps {
  userEmail: string;
}

const VerifyCodeHeader: React.FC<VerifyCodeHeaderProps> = ({ userEmail }) => {
  return (
    <div className="text-center mb-2">
      <p className="text-sm text-gray-600">
        Enviamos um código de 6 dígitos para <strong>{userEmail}</strong>
      </p>
    </div>
  );
};

export default VerifyCodeHeader;
