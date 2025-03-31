import React, { useState, useMemo } from 'react';
import StoryCard, { StoryType, StoryCardProps } from './StoryCard';
import { ScrollReveal, ShimmerText } from './EnhancedInteractiveElements';

// Mock data for stories
const mockStories: StoryCardProps[] = [
  {
    id: 1,
    title: 'Building an AI-Powered Paraphrasing Tool with React and OpenAI',
    excerpt: 'Learn how I built Reword This, a Chrome extension that uses AI to help users rewrite content with different tones and styles.',
    date: 'Jul 26, 2024',
    category: 'tech',
    imageUrl: '/stories/building-ai-paraphrase-tool.webp',
    authorName: 'Toto',
    readTime: '5 min read',
    slug: 'building-ai-paraphrase-tool',
    views: 1254
  },
  {
    id: 2,
    title: 'Creating a Design System That Scales: Lessons Learned',
    excerpt: 'How I approached building a consistent design system that works across multiple projects and scales with growth.',
    date: 'Jul 20, 2024',
    category: 'design',
    imageUrl: '/stories/scalable-design-system.webp',
    authorName: 'Toto',
    readTime: '7 min read',
    slug: 'scalable-design-system',
    views: 863
  },
  {
    id: 3,
    title: 'The Boring Tech Stack: Why Boring Is Better for Most Projects',
    excerpt: 'Why choosing proven, "boring" technologies often leads to more successful projects than chasing the latest trends.',
    date: 'Jul 15, 2024',
    category: 'tech',
    imageUrl: '/stories/boring-tech-stack.webp',
    authorName: 'Toto',
    readTime: '6 min read',
    slug: 'boring-tech-stack',
    views: 2145
  },
  {
    id: 4,
    title: 'Finding Work-Life Balance as a Solo Developer',
    excerpt: 'My personal journey of maintaining productivity while avoiding burnout as an independent developer.',
    date: 'Jul 8, 2024',
    category: 'life',
    imageUrl: '/stories/work-life-balance.webp',
    authorName: 'Toto',
    readTime: '4 min read',
    slug: 'work-life-balance',
    views: 921
  },
  {
    id: 5,
    title: 'Minimalist UI Design: Creating Focus Through Reduction',
    excerpt: 'How to design user interfaces that prioritize user needs through strategic minimalism and thoughtful reduction.',
    date: 'Jul 2, 2024',
    category: 'design',
    imageUrl: '/stories/minimalist-ui-design.webp',
    authorName: 'Toto',
    readTime: '8 min read',
    slug: 'minimalist-ui-design',
    views: 1632
  },
  {
    id: 6,
    title: 'React Performance Optimizations You Should Know',
    excerpt: 'Practical tips and techniques to improve the performance of your React applications without unnecessary complexity.',
    date: 'Jun 28, 2024',
    category: 'tech',
    imageUrl: '/stories/react-performance.webp',
    authorName: 'Toto',
    readTime: '9 min read',
    slug: 'react-performance',
    views: 1876
  },
];

type TabType = 'all' | StoryType;
type SortType = 'recent' | 'popular';

const BoringStoriesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [sortBy, setSortBy] = useState<SortType>('recent');

  const filteredStories = useMemo(() => {
    let stories = [...mockStories];

    // Filter by category
    if (activeTab !== 'all') {
      stories = stories.filter(story => story.category === activeTab);
    }

    // Sort stories
    stories = stories.sort((a, b) => {
      if (sortBy === 'recent') {
        // Sort by date, newest first
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        // Sort by views, most viewed first
        return (b.views || 0) - (a.views || 0);
      }
    });

    return stories;
  }, [activeTab, sortBy]);

  const TabButton: React.FC<{ 
    tab: TabType, 
    label: string, 
    isActive: boolean, 
    onClick: () => void 
  }> = ({ tab, label, isActive, onClick }) => (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-boring-main text-boring-offwhite shadow-sm' 
          : 'bg-transparent text-boring-dark hover:bg-boring-main/10'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const SortButton: React.FC<{ 
    sort: SortType, 
    label: string, 
    isActive: boolean, 
    onClick: () => void 
  }> = ({ sort, label, isActive, onClick }) => (
    <button
      className={`px-3 py-1 text-xs font-medium transition-all duration-200 ${
        isActive 
          ? 'text-boring-main underline underline-offset-4' 
          : 'text-boring-gray hover:text-boring-dark'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <section className="py-16 bg-boring-offwhite/50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-10">
            <ShimmerText 
              text="Boring Tech Stories" 
              className="text-4xl font-bold mb-4 text-boring-dark" 
              as="h2"
            />
            <p className="text-boring-gray">
              Thoughts, tutorials, and insights on development, design, and building products.
              No hype, just practical content.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Main Tabs */}
            <div className="flex space-x-2 mb-4 sm:mb-0 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <TabButton 
                tab="all" 
                label="All Boring Stories" 
                isActive={activeTab === 'all'} 
                onClick={() => setActiveTab('all')} 
              />
              <TabButton 
                tab="tech" 
                label="Boring Tech Stories" 
                isActive={activeTab === 'tech'} 
                onClick={() => setActiveTab('tech')} 
              />
              <TabButton 
                tab="design" 
                label="Boring Design Stories" 
                isActive={activeTab === 'design'} 
                onClick={() => setActiveTab('design')} 
              />
              <TabButton 
                tab="life" 
                label="Boring Life Stories" 
                isActive={activeTab === 'life'} 
                onClick={() => setActiveTab('life')} 
              />
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-4 border-l border-boring-gray/20 pl-4">
              <span className="text-xs text-boring-gray font-medium">Sort by:</span>
              <div className="flex space-x-2">
                <SortButton 
                  sort="recent" 
                  label="Recent" 
                  isActive={sortBy === 'recent'} 
                  onClick={() => setSortBy('recent')} 
                />
                <SortButton 
                  sort="popular" 
                  label="Popular" 
                  isActive={sortBy === 'popular'} 
                  onClick={() => setSortBy('popular')} 
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map(story => (
                <div key={story.id} className="h-full">
                  <StoryCard {...story} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-boring-gray">No stories found in this category.</p>
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-10 text-center">
            <a 
              href="/stories" 
              className="inline-flex items-center px-5 py-2.5 bg-boring-slate/10 hover:bg-boring-slate/20 text-boring-dark rounded-lg transition-colors"
            >
              View all stories
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BoringStoriesSection; 