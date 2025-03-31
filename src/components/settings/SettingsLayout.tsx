
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import { User, Lock } from "lucide-react";

const SettingsLayout = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Configurações da Conta</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-1 sm:p-2">
          <Tabs 
            defaultValue="profile" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={18} />
                <span className="hidden sm:inline">Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock size={18} />
                <span className="hidden sm:inline">Segurança</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="p-4">
              <ProfileSettings />
            </TabsContent>
            
            <TabsContent value="security" className="p-4">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
