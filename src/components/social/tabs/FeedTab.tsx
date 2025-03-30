
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe, UserPlus, Lock, Send } from 'lucide-react';
import SocialPostCard from '../SocialPostCard';
import { Post, Visibility } from '../types';
import { useIsMobile } from "@/hooks/use-mobile";

type FeedTabProps = {
  posts: Post[];
};

const FeedTab = ({ posts }: FeedTabProps) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [postVisibility, setPostVisibility] = useState<Visibility>('public');
  const isMobile = useIsMobile();

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    // In a real app, this would send the data to Supabase
    alert(`Post criado com visibilidade: ${postVisibility}`);
    setNewPostContent('');
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Create new post */}
      <Card>
        <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
          <form onSubmit={handlePostSubmit}>
            <div className="flex gap-2 md:gap-3 mb-2 md:mb-3">
              <Avatar className="h-8 w-8 md:h-10 md:w-10">
                <AvatarFallback className="bg-clinic-yellow text-black text-sm md:text-base">MS</AvatarFallback>
              </Avatar>
              <Textarea 
                placeholder="Compartilhe uma conquista ou progresso..." 
                className="flex-1 text-xs md:text-sm min-h-[60px] md:min-h-[80px]"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex gap-1 md:gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setPostVisibility('public')}
                  className={`h-7 md:h-8 text-xs px-2 md:px-3 ${postVisibility === 'public' ? 'border-clinic-yellow text-clinic-yellow' : ''}`}
                >
                  <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Público
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setPostVisibility('friends')}
                  className={`h-7 md:h-8 text-xs px-2 md:px-3 ${postVisibility === 'friends' ? 'border-clinic-yellow text-clinic-yellow' : ''}`}
                >
                  <UserPlus className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Amigos
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setPostVisibility('private')}
                  className={`h-7 md:h-8 text-xs px-2 md:px-3 ${postVisibility === 'private' ? 'border-clinic-yellow text-clinic-yellow' : ''}`}
                >
                  <Lock className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Privado
                </Button>
              </div>
              <Button 
                type="submit" 
                className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90 h-7 md:h-8 text-xs md:text-sm px-2 md:px-3"
              >
                <Send className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Publicar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Posts feed */}
      {posts.map(post => (
        <SocialPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedTab;
