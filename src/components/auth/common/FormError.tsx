
interface FormErrorProps {
  error: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div 
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 mb-4 sm:mb-6 text-sm sm:text-base" 
      role="alert"
    >
      <p>{error}</p>
    </div>
  );
};

export default FormError;
