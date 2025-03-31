import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useState } from 'react';

// Define types for slides
type ImageSlide = {
  id: number;
  image: string;
  alt: string;
}

type VideoSlide = {
  id: number;
  video: string;
  thumbnailImage?: string;
  alt: string;
}

type Slide = ImageSlide | VideoSlide;

const RewordThisPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides: Slide[] = [
    {
      id: 1,
      image: "./src/assets/images/reword-this/reword-this-hero.png",
      alt: "Reword This Chrome Extension Screenshot"
    },
    {
      id: 2,
      image: "./src/assets/images/reword-this/reword-this-slide-2.png",
      alt: "Reword This in action"
    },
    {
      id: 3,
      image: "./src/assets/images/reword-this/reword-this-slide-3.png", 
      alt: "Reword This features overview"
    },
    {
      id: 4,
      image: "./src/assets/images/reword-this/reword-this-slide-4.png",
      alt: "Reword This documentation"
    },
    {
      id: 5,
      video: "./src/assets/videos/reword-this/reword-this-demo.mp4",
      thumbnailImage: "./src/assets/images/reword-this/reword-this-hero.png", // Using hero image as fallback thumbnail
      alt: "Reword This demo"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Helper function to check if slide is a video slide
  const isVideoSlide = (slide: Slide): slide is VideoSlide => {
    return 'video' in slide;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column - Text Content */}
            <div className="md:w-1/2 text-left md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">1-Click Rewriting for Better Communication</h1>
              <p className="text-xl mb-8">Reword This ✍️: Instantly rephrase any text in the tone you want. Works across the web — perfect for job seekers, creators, founders, and ESL users.</p>
              <a 
                href="https://chrome.google.com/webstore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-8"
              >
                Add to Chrome
              </a>
            </div>
            
            {/* Right Column - Slider */}
            <div className="md:w-1/2 relative">
              <div className="relative overflow-hidden rounded-lg shadow-xl" style={{ height: "300px" }}>
                <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {slides.map((slide) => (
                    <div key={slide.id} className="min-w-full h-full">
                      {isVideoSlide(slide) ? (
                        <video 
                          src={slide.video} 
                          className="w-full h-full object-cover rounded-lg shadow-xl"
                          poster={slide.thumbnailImage}
                          controls
                          muted
                          playsInline
                          preload="auto"
                          aria-label={slide.alt}
                        />
                      ) : (
                        <img 
                          src={slide.image} 
                          alt={slide.alt} 
                          className="w-full h-full object-cover rounded-lg shadow-xl"
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 focus:outline-none shadow-md"
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 focus:outline-none shadow-md"
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Thumbnail Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`h-12 w-20 overflow-hidden rounded border-2 transition-all ${currentSlide === index ? 'border-white opacity-100' : 'border-transparent opacity-70'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {isVideoSlide(slide) ? (
                      <div className="w-full h-full bg-blue-800 flex items-center justify-center relative">
                        {slide.thumbnailImage && (
                          <img 
                            src={slide.thumbnailImage}
                            alt={`Video thumbnail ${index + 1}`}
                            className="w-full h-full object-cover opacity-70"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={slide.image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instantly Improve Your Writing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Instantly Improve Your Writing</h2>
          <p className="text-xl text-gray-600 mb-6 text-center">
            With one click, you can rewrite anything — emails, LinkedIn posts, resumes, or web copy — in a clearer, friendlier, or more persuasive tone. Say goodbye to writer's block and hello to confident communication.
          </p>
          <p className="text-xl text-gray-800 mb-12 text-center italic">
            ✍️ "It's like Grammarly, but for tone — and way faster."
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-4">NEW</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-xl mr-2">🎲</span>
                <p><strong>Rewrite Battle Mode:</strong> Compare two AI-generated rewrites side-by-side and pick your favorite.</p>
              </li>
              <li className="flex items-start">
                <span className="text-xl mr-2">🎯</span>
                <p>Earn XP for every battle — train your tone and sharpen your instincts.</p>
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">✨ Also New:</h3>
            <ul className="space-y-2 pl-8 list-disc">
              <li>Unlock tones like "Creative" and "Executive"</li>
              <li>Dark Mode and Focus Mode themes now available as rewards!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Use It */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Use Reword This?</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0 text-green-500">✔️</div>
              <div><p className="text-lg">Rewrite faster — no more second-guessing</p></div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0 text-green-500">✔️</div>
              <div><p className="text-lg">Adjust tone in one click: Clarity, Persuasive, Formal, Friendly</p></div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0 text-green-500">✔️</div>
              <div><p className="text-lg">Battle Mode gamifies rewriting and teaches better writing instincts</p></div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0 text-green-500">✔️</div>
              <div><p className="text-lg">Works on any site — highlight → right click → rewrite</p></div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0 text-green-500">✔️</div>
              <div><p className="text-lg">Powered by GPT AI, optimized for natural tone</p></div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0 text-green-500">✔️</div>
              <div><p className="text-lg">Gamified: XP, streaks, tone & theme unlocks</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Reword Modes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Reword Modes Include:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Clarity</h3>
              <p className="text-gray-700">Cut the fluff, stay sharp</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Friendly</h3>
              <p className="text-gray-700">Add warmth and personality</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Persuasive</h3>
              <p className="text-gray-700">Make your writing compelling</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Formal</h3>
              <p className="text-gray-700">Keep it polished and professional</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Creative</h3>
              <p className="text-gray-700">Turn on the flair</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Executive</h3>
              <p className="text-gray-700">Sound like a CEO</p>
            </div>
          </div>
          
          <div className="mt-12 text-center bg-blue-100 p-6 rounded-lg">
            <p className="text-xl font-medium">⌛ Save Time: Average user saves 15–30 minutes/day on rewriting</p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Who's It For?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Job Seekers</h3>
              <p className="text-gray-600">Make every line count</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Creators & Marketers</h3>
              <p className="text-gray-600">Nail your voice</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Freelancers</h3>
              <p className="text-gray-600">Draft client emails fast</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">ESL Users</h3>
              <p className="text-gray-600">Instantly polish your tone</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Founders</h3>
              <p className="text-gray-600">Write like a pro in seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works:</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <p className="text-gray-700">Install Reword This from the Chrome Web Store</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <p className="text-gray-700">Highlight any text and right-click → "Reword This"</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <p className="text-gray-700">Choose your tone, or try "Surprise Me" or "Rewrite Battle"</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <p className="text-gray-700">Copy or replace the rewritten version instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Plans:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>10 rewrites/day</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>3 core tones</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1 battle/day</span>
                </li>
              </ul>
              <a 
                href="https://chrome.google.com/webstore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Reword This Free
              </a>
            </div>
            
            <div className="bg-blue-600 text-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-blue-100 mb-6">Coming Soon</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlock all tones</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited usage</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Themes and battles</span>
                </li>
              </ul>
              <button
                className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
              >
                Join the waitlist for Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Communicate smarter.</h2>
          <p className="text-xl text-gray-600 mb-8">Try Reword This — your AI tone expert, just a click away.</p>
          <a 
            href="https://chrome.google.com/webstore" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-8"
          >
            Add to Chrome
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            Back to theboringdev.com
          </Link>
          <p className="text-gray-600 mt-4">
            Contact: <a href="mailto:contact@theboringdev.com" className="text-blue-600 hover:text-blue-800">
              contact@theboringdev.com
            </a>
          </p>
          <div className="mt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 mx-2">
              Twitter/X
            </a>
          </div>
          <p className="text-gray-600 mt-8">© {new Date().getFullYear()} The Boring Dev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RewordThisPage; 