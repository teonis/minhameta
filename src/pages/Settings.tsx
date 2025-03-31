
import { useAuth } from "@/contexts/AuthContext";
import SettingsLayout from "@/components/settings/SettingsLayout";
import { Redirect } from "react-router-dom";

const Settings = () => {
  const { currentUser, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  
  return (
    <SettingsLayout />
  );
};

export default Settings;
