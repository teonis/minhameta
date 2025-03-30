
const SettingsView = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-6">Perfil do Profissional</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              defaultValue="Tay Rocha"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              defaultValue="tay@clinicarocha.com.br"
            />
          </div>
          
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
              Especialidade
            </label>
            <input
              type="text"
              id="specialty"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              defaultValue="Terapeuta Comportamental"
            />
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Biografia
            </label>
            <textarea
              id="bio"
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clinic-yellow"
              defaultValue="Especialista em terapia comportamental, com foco no desenvolvimento de estratégias personalizadas para cada paciente."
            />
          </div>
          
          <div>
            <button className="bg-clinic-yellow text-black px-4 py-2 rounded-md hover:bg-clinic-yellow/90">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
