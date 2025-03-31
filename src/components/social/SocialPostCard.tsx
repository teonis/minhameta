
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal,
  Smile
} from 'lucide-react';
import { Post } from './types';
import { toast } from 'sonner';

type SocialPostCardProps = {
  post: Post;
};

const SocialPostCard = ({ post }: SocialPostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h`;
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)}d`;
    } else if (diffInSeconds < 2592000) {
      return `${Math.floor(diffInSeconds / 604800)}w`;
    } else {
      return `${Math.floor(diffInSeconds / 2592000)}m`;
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
      toast("Você curtiu esta publicação", {
        icon: "❤️",
        duration: 1000
      });
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // In a real app, this would send the data to an API
    toast.success("Comentário adicionado");
    setNewComment("");
  };

  return (
    <div className="border-b border-gray-200 pb-2">
      {/* Post header */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {post.userAvatar ? (
              <AvatarImage src={post.userAvatar} alt={post.userName} />
            ) : (
              <AvatarFallback className="bg-gray-200 text-gray-900">
                {post.userInitials}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{post.userName}</p>
            {post.location && (
              <p className="text-xs text-gray-500">{post.location}</p>
            )}
          </div>
        </div>
        <button>
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      {/* Post image */}
      {post.image && (
        <div 
          className="aspect-square w-full bg-gray-100"
          onDoubleClick={handleDoubleTap}
        >
          <img 
            src={post.image} 
            alt="Post" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex gap-4">
          <button onClick={handleLike}>
            <Heart 
              className={`h-6 w-6 ${liked ? 'text-red-500 fill-red-500' : ''}`} 
            />
          </button>
          <button onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="h-6 w-6" />
          </button>
          <button>
            <Send className="h-6 w-6" />
          </button>
        </div>
        <button onClick={handleSave}>
          <Bookmark 
            className={`h-6 w-6 ${saved ? 'text-black fill-black' : ''}`} 
          />
        </button>
      </div>
      
      {/* Likes count */}
      <div className="px-4 pb-1">
        <p className="text-sm font-semibold">
          {liked 
            ? `${post.reactions.thumbsUp + post.reactions.heart + post.reactions.clap + 1} curtidas` 
            : `${post.reactions.thumbsUp + post.reactions.heart + post.reactions.clap} curtidas`}
        </p>
      </div>
      
      {/* Caption */}
      <div className="px-4 pb-1">
        <p className="text-sm">
          <span className="font-semibold">{post.userName}</span>{' '}
          {post.content}
        </p>
      </div>
      
      {/* Comments */}
      <div className="px-4">
        {post.comments.length > 0 && !showComments && (
          <button 
            className="text-sm text-gray-500"
            onClick={() => setShowComments(true)}
          >
            Ver todos os {post.comments.length} comentários
          </button>
        )}
        
        {showComments && (
          <div className="space-y-2 py-1">
            {post.comments.map(comment => (
              <p key={comment.id} className="text-sm">
                <span className="font-semibold">{comment.userName}</span>{' '}
                {comment.content}
              </p>
            ))}
          </div>
        )}
        
        <p className="text-xs text-gray-500 uppercase mt-1">
          {formatTimeAgo(post.createdAt)}
        </p>
      </div>
      
      {/* Add comment */}
      <div className="flex items-center px-4 py-2 mt-1 border-t border-gray-100">
        <button className="mr-2">
          <Smile className="h-6 w-6 text-gray-500" />
        </button>
        <input
          type="text"
          placeholder="Adicione um comentário..."
          className="flex-1 text-sm border-none outline-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommentSubmit(e);
            }
          }}
        />
        {newComment.trim() && (
          <button 
            className="text-clinic-yellow font-semibold text-sm"
            onClick={handleCommentSubmit}
          >
            Publicar
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialPostCard;
