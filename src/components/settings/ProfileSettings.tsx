
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole } from "@/types/auth";
import UserRoleBadge from "@/components/auth/UserRoleBadge";

const ProfileSettings = () => {
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    bio: "Especialista em terapia comportamental, com foco no desenvolvimento de estratégias personalizadas para cada paciente.",
    specialty: currentUser?.role === UserRole.PROFESSIONAL ? "Terapeuta Comportamental" : "",
    phone: "",
    address: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the updated profile to an API
    console.log("Updated profile:", formData);
    
    // Show success toast
    toast.success("Perfil atualizado com sucesso!");
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
        <Avatar className="w-24 h-24 border-2 border-gray-200">
          <AvatarImage src={currentUser?.profileImage} />
          <AvatarFallback className="text-lg">{getInitials(formData.name)}</AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="text-xl font-semibold">{formData.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <UserRoleBadge role={currentUser?.role || UserRole.PATIENT} showLabel={true} />
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              disabled={true}
            />
            <p className="text-sm text-muted-foreground">
              O email não pode ser alterado.
            </p>
          </div>
          
          {currentUser?.role === UserRole.PROFESSIONAL && (
            <div className="grid gap-2">
              <Label htmlFor="specialty">Especialidade</Label>
              <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                placeholder="Sua especialidade"
              />
            </div>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Seu endereço"
            />
          </div>
          
          {currentUser?.role === UserRole.PROFESSIONAL && (
            <div className="grid gap-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Sua biografia profissional"
                rows={4}
              />
            </div>
          )}
        </div>
        
        <Button type="submit" className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettings;
