
import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = true
}) => {
  return (
    <div className="mb-4 sm:mb-6">
      <label 
        htmlFor={id} 
        className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-3 sm:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow text-sm sm:text-base"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;
