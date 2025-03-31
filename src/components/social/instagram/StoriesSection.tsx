
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from 'lucide-react';

const stories = [
  { id: 1, name: 'Sua história', isUser: true, hasUnseenStory: false, avatar: null },
  { id: 2, name: 'joaos', hasUnseenStory: true, avatar: null },
  { id: 3, name: 'maria_ft', hasUnseenStory: true, avatar: null },
  { id: 4, name: 'carlos78', hasUnseenStory: false, avatar: null },
  { id: 5, name: 'ana.med', hasUnseenStory: true, avatar: null },
  { id: 6, name: 'r.lima', hasUnseenStory: true, avatar: null },
  { id: 7, name: 'pedroc', hasUnseenStory: false, avatar: null }
];

const StoriesSection = () => {
  return (
    <div className="py-4 overflow-x-auto">
      <div className="flex gap-4 px-4 min-w-max">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center gap-1 w-16"
          >
            <div className={`p-[2px] rounded-full ${story.hasUnseenStory ? 'bg-gradient-to-br from-yellow-500 via-orange-500 to-pink-500' : ''}`}>
              <div className="bg-white p-[2px] rounded-full">
                {story.isUser ? (
                  <div className="relative">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-gray-100 text-gray-900">MS</AvatarFallback>
                    </Avatar>
                    <div className="absolute -right-1 -bottom-1 bg-clinic-yellow text-white rounded-full p-0.5 border-2 border-white">
                      <Plus className="h-3 w-3" />
                    </div>
                  </div>
                ) : (
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-gray-200 text-gray-900">
                      {story.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
            <span className="text-xs truncate w-full text-center">
              {story.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesSection;
