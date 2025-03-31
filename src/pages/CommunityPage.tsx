
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComunidadeMeta from "../components/social/ComunidadeMeta";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import { UserRole } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const CommunityPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {!isMobile && <Navbar />}
        
        <main className="flex-grow">
          <ComunidadeMeta />
        </main>
        
        {!isMobile && <Footer />}
      </div>
    </ProtectedRoute>
  );
};

export default CommunityPage;
