import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, Heart, Award, MessageSquare, Send, Globe, UserPlus, Lock } from 'lucide-react';
import { Post } from './types';

type SocialPostCardProps = {
  post: Post;
};

const SocialPostCard = ({ post }: SocialPostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [userReactions, setUserReactions] = useState<{[key: string]: boolean}>({
    thumbsUp: false,
    heart: false,
    clap: false
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleReaction = (type: 'thumbsUp' | 'heart' | 'clap') => {
    setUserReactions(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    alert(`Comentário enviado: ${newComment}`);
    setNewComment('');
  };

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3 mb-3">
        <Avatar>
          {post.userAvatar ? (
            <AvatarImage src={post.userAvatar} alt={post.userName} />
          ) : (
            <AvatarFallback className="bg-clinic-yellow text-black">{post.userInitials}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{post.userName}</h3>
            <div className="flex items-center text-gray-500 text-sm">
              {post.visibility === 'public' && <Globe className="h-3 w-3 mr-1" />}
              {post.visibility === 'friends' && <UserPlus className="h-3 w-3 mr-1" />}
              {post.visibility === 'private' && <Lock className="h-3 w-3 mr-1" />}
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <p className="text-gray-800 my-2">{post.content}</p>
          {post.image && (
            <div className="mt-2 rounded-md overflow-hidden">
              <img src={post.image} alt="Post image" className="w-full h-auto" />
            </div>
          )}
        </div>
      </div>

      {/* Reactions */}
      <div className="flex justify-between items-center border-t border-b py-2 mb-2">
        <div className="flex gap-4">
          <button 
            className={`flex items-center gap-1 ${userReactions.thumbsUp ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => handleReaction('thumbsUp')}
          >
            <ThumbsUp className="h-4 w-4" /> 
            <span>{post.reactions.thumbsUp + (userReactions.thumbsUp ? 1 : 0)}</span>
          </button>
          <button 
            className={`flex items-center gap-1 ${userReactions.heart ? 'text-red-500 font-medium' : 'text-gray-500'}`}
            onClick={() => handleReaction('heart')}
          >
            <Heart className="h-4 w-4" /> 
            <span>{post.reactions.heart + (userReactions.heart ? 1 : 0)}</span>
          </button>
          <button 
            className={`flex items-center gap-1 ${userReactions.clap ? 'text-amber-500 font-medium' : 'text-gray-500'}`}
            onClick={() => handleReaction('clap')}
          >
            <Award className="h-4 w-4" /> 
            <span>{post.reactions.clap + (userReactions.clap ? 1 : 0)}</span>
          </button>
        </div>
        
        <button 
          className="flex items-center gap-1 text-gray-500"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className="h-4 w-4" /> 
          <span>{post.comments.length} Comentários</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="mt-3 space-y-3">
          {post.comments.map(comment => (
            <div key={comment.id} className="flex items-start gap-2 ml-4">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-gray-200">
                  {comment.userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-2 text-sm flex-1">
                <div className="font-medium">{comment.userName}</div>
                <div>{comment.content}</div>
              </div>
            </div>
          ))}

          {/* Add comment form */}
          <form onSubmit={handleCommentSubmit} className="flex items-end gap-2 mt-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs bg-clinic-yellow text-black">MS</AvatarFallback>
            </Avatar>
            <Textarea 
              placeholder="Adicionar um comentário..." 
              className="min-h-[60px] flex-1 text-sm"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button 
              type="submit" 
              size="sm"
              className="bg-clinic-yellow text-black hover:bg-clinic-yellow/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </Card>
  );
};

export default SocialPostCard;
