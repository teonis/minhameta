
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe, UserPlus, Lock, Send } from 'lucide-react';
import SocialPostCard from '../SocialPostCard';
import { Post, Visibility } from '../types';

type FeedTabProps = {
  posts: Post[];
};

const FeedTab = ({ posts }: FeedTabProps) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [postVisibility, setPostVisibility] = useState<Visibility>('public');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    // In a real app, this would send the data to Supabase
    alert(`Post criado com visibilidade: ${postVisibility}`);
    setNewPostContent('');
  };

  return (
    <div className="space-y-4">
      {/* Create new post */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handlePostSubmit}>
            <div className="flex gap-3 mb-3">
              <Avatar>
                <AvatarFallback className="bg-clinic-yellow text-black">MS</AvatarFallback>
              </Avatar>
              <Textarea 
                placeholder="Compartilhe uma conquista ou progresso..." 
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
                  <Globe className="h-4 w-4 mr-1" /> Público
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setPostVisibility('friends')}
                  className={postVisibility === 'friends' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                >
                  <UserPlus className="h-4 w-4 mr-1" /> Amigos
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  type="button"
                  onClick={() => setPostVisibility('private')}
                  className={postVisibility === 'private' ? 'border-clinic-yellow text-clinic-yellow' : ''}
                >
                  <Lock className="h-4 w-4 mr-1" /> Privado
                </Button>
              </div>
              <Button type="submit" className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90">
                <Send className="h-4 w-4 mr-1" /> Publicar
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
