
import { useAuth } from "@/contexts/AuthContext";
import SettingsLayout from "@/components/settings/SettingsLayout";
import { Navigate } from "react-router-dom";

const Settings = () => {
  const { currentUser, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <SettingsLayout />
  );
};

export default Settings;
