import React from 'react';
import { Link } from 'react-router-dom';

export type StoryType = 'tech' | 'design' | 'life';

export interface StoryCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: StoryType;
  imageUrl?: string;
  authorName: string;
  authorImageUrl?: string;
  readTime: string;
  slug: string;
  views?: number;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  excerpt,
  date,
  category,
  imageUrl,
  authorName,
  authorImageUrl,
  readTime,
  slug,
  views
}) => {
  const getCategoryColor = (category: StoryType) => {
    switch (category) {
      case 'tech':
        return 'bg-blue-100 text-blue-800';
      case 'design':
        return 'bg-purple-100 text-purple-800';
      case 'life':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: StoryType) => {
    switch (category) {
      case 'tech':
        return 'Tech';
      case 'design':
        return 'Design';
      case 'life':
        return 'Life';
      default:
        return 'Tech';
    }
  };

  return (
    <Link to={`/stories/${slug}`} className="block group transition-all duration-300 hover:-translate-y-1">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-3 left-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(category)}`}>
                {getCategoryLabel(category)}
              </span>
            </div>
          </div>
        )}
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-boring-dark line-clamp-2 group-hover:text-boring-main transition-colors">
            {title}
          </h3>
          <p className="text-boring-gray text-sm mb-4 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {authorImageUrl ? (
                <img src={authorImageUrl} alt={authorName} className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-boring-main/20 flex items-center justify-center text-boring-main text-xs font-bold">
                  {authorName.charAt(0)}
                </div>
              )}
              <span className="text-xs text-boring-gray">{authorName}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-boring-gray">
              <span>{date}</span>
              <span>•</span>
              <span>{readTime}</span>
              {views !== undefined && (
                <>
                  <span>•</span>
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {views}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard; 