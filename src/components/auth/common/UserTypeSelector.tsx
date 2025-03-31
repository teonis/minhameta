
interface UserTypeSelectorProps {
  userType: string;
  onChange: (userType: string) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, onChange }) => {
  return (
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
            onChange={() => onChange("patient")}
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
            onChange={() => onChange("professional")}
            className="mr-2"
          />
          Profissional
        </label>
      </div>
    </div>
  );
};

export default UserTypeSelector;
