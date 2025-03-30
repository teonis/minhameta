
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe, UserPlus, Lock, Send, Settings } from 'lucide-react';
import SocialPostCard from '../../social/SocialPostCard';
import { Post, Visibility } from '../../social/types';

type ProfessionalFeedTabProps = {
  posts: Post[];
};

const ProfessionalFeedTab = ({ posts }: ProfessionalFeedTabProps) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [postVisibility, setPostVisibility] = useState<Visibility>('public');
  const [showHiddenPosts, setShowHiddenPosts] = useState(false);
  const [selectedPatientFilter, setSelectedPatientFilter] = useState<number | null>(null);
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<number | null>(null);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    // In a real app, this would send the data to Supabase
    alert(`Post criado com visibilidade: ${postVisibility}`);
    setNewPostContent('');
  };

  const handleModeratePost = (postId: number) => {
    // In a real app, this would open a moderation dialog
    alert(`Moderando post ${postId}`);
  };

  return (
    <div className="space-y-4">
      {/* Moderation Controls */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Filtros e Moderação</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="patient-filter" className="text-sm">Paciente:</label>
              <select 
                id="patient-filter" 
                className="text-sm border rounded p-1"
                onChange={(e) => setSelectedPatientFilter(Number(e.target.value) || null)}
              >
                <option value="">Todos</option>
                <option value="101">João Silva</option>
                <option value="102">Maria Oliveira</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="group-filter" className="text-sm">Grupo:</label>
              <select 
                id="group-filter" 
                className="text-sm border rounded p-1"
                onChange={(e) => setSelectedGroupFilter(Number(e.target.value) || null)}
              >
                <option value="">Todos</option>
                <option value="1">Saúde Mental</option>
                <option value="2">Atividade Física</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm cursor-pointer flex items-center gap-1">
                <input 
                  type="checkbox" 
                  checked={showHiddenPosts} 
                  onChange={() => setShowHiddenPosts(!showHiddenPosts)}
                />
                Mostrar posts ocultos
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create new post */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handlePostSubmit}>
            <div className="flex gap-3 mb-3">
              <Avatar>
                <AvatarFallback className="bg-clinic-yellow text-black">DR</AvatarFallback>
              </Avatar>
              <Textarea 
                placeholder="Compartilhe uma atualização ou motivação com os pacientes..." 
                className="flex-1"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setPostVisibility('public')}
                  className={postVisibility === 'public' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                >
                  <Globe className="h-4 w-4 mr-1" /> Todos os Pacientes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setPostVisibility('friends')}
                  className={postVisibility === 'friends' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                >
                  <UserPlus className="h-4 w-4 mr-1" /> Grupo Específico
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setPostVisibility('private')}
                  className={postVisibility === 'private' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                >
                  <Lock className="h-4 w-4 mr-1" /> Paciente Específico
                </Button>
              </div>
              <Button type="submit" className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
                <Send className="h-4 w-4 mr-1" /> Publicar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Posts feed with moderation controls */}
      {posts.map(post => (
        <Card key={post.id} className="relative">
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 px-2 bg-white"
              onClick={() => handleModeratePost(post.id)}
            >
              <Settings className="h-3 w-3 mr-1" /> Moderar
            </Button>
          </div>
          <CardContent className="pt-4">
            <SocialPostCard post={post} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfessionalFeedTab;
