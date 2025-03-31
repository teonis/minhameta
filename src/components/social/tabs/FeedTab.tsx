
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  Smile,
  Image as ImageIcon
} from 'lucide-react';
import { Post } from '../types';
import { toast } from 'sonner';

type FeedTabProps = {
  posts: Post[];
};

const FeedTab = ({ posts }: FeedTabProps) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<number, boolean>>({});
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const refreshThreshold = 80;
  const refreshIndicatorHeight = useRef(0);
  
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

  const handleLike = (postId: number) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleSave = (postId: number) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleComments = (postId: number) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleDoubleTap = (postId: number) => {
    if (!likedPosts[postId]) {
      setLikedPosts(prev => ({
        ...prev,
        [postId]: true
      }));
      
      // Show heart animation (would be implemented with framer-motion in a real app)
      toast("Você curtiu esta publicação", {
        icon: "❤️",
        duration: 1000
      });
    }
  };

  const handleCommentChange = (postId: number, comment: string) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: comment
    }));
  };

  const handleCommentSubmit = (postId: number) => {
    if (!newComments[postId]?.trim()) return;
    
    // In a real app, this would send the data to an API
    toast.success("Comentário adicionado");
    setNewComments(prev => ({
      ...prev,
      [postId]: ""
    }));
  };
  
  // Pull to refresh implementation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
      currentY.current = startY.current;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 0) return; // Only allow pull to refresh at the top of the page
      
      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;
      
      if (diff > 0) {
        refreshIndicatorHeight.current = Math.min(diff * 0.5, refreshThreshold);
        
        if (feedRef.current) {
          feedRef.current.style.transform = `translateY(${refreshIndicatorHeight.current}px)`;
        }
        
        if (refreshIndicatorHeight.current >= refreshThreshold && !isRefreshing) {
          setIsRefreshing(true);
        }
      }
    };

    const handleTouchEnd = () => {
      if (feedRef.current) {
        feedRef.current.style.transform = 'translateY(0)';
        feedRef.current.style.transition = 'transform 0.3s ease-out';
        
        setTimeout(() => {
          if (feedRef.current) {
            feedRef.current.style.transition = '';
          }
        }, 300);
      }
      
      if (isRefreshing) {
        // Simulate refresh
        setTimeout(() => {
          setIsRefreshing(false);
          toast.success("Feed atualizado");
        }, 1500);
      }
      
      refreshIndicatorHeight.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isRefreshing]);

  return (
    <div ref={feedRef} className="space-y-6 pb-6">
      {isRefreshing && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-clinic-yellow"></div>
        </div>
      )}
      
      {posts.map(post => (
        <div key={post.id} className="border-b border-gray-200 pb-2">
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
              onDoubleClick={() => handleDoubleTap(post.id)}
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
              <button onClick={() => handleLike(post.id)}>
                <Heart 
                  className={`h-6 w-6 ${likedPosts[post.id] ? 'text-red-500 fill-red-500' : ''}`} 
                />
              </button>
              <button onClick={() => toggleComments(post.id)}>
                <MessageCircle className="h-6 w-6" />
              </button>
              <button>
                <Send className="h-6 w-6" />
              </button>
            </div>
            <button onClick={() => handleSave(post.id)}>
              <Bookmark 
                className={`h-6 w-6 ${savedPosts[post.id] ? 'text-black fill-black' : ''}`} 
              />
            </button>
          </div>
          
          {/* Likes count */}
          <div className="px-4 pb-1">
            <p className="text-sm font-semibold">
              {likedPosts[post.id] 
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
            {post.comments.length > 0 && !expandedComments[post.id] && (
              <button 
                className="text-sm text-gray-500"
                onClick={() => toggleComments(post.id)}
              >
                Ver todos os {post.comments.length} comentários
              </button>
            )}
            
            {expandedComments[post.id] && (
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
              value={newComments[post.id] || ''}
              onChange={(e) => handleCommentChange(post.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCommentSubmit(post.id);
                }
              }}
            />
            {newComments[post.id]?.trim() && (
              <button 
                className="text-clinic-yellow font-semibold text-sm"
                onClick={() => handleCommentSubmit(post.id)}
              >
                Publicar
              </button>
            )}
          </div>
        </div>
      ))}
      
      {/* New post button (fixed) */}
      <button className="fixed right-4 bottom-20 bg-clinic-yellow rounded-full p-3 shadow-md">
        <ImageIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default FeedTab;
