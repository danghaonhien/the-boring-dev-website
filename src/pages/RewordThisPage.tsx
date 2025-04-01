import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useState } from 'react';
import { AccordionTabs } from '../components/EnhancedInteractiveElements';
import WaitlistForm from '../components/WaitlistForm';

// Import images properly
import rewordThisHero from '../assets/images/reword-this/reword-this-hero.png';
import rewordThisSlide2 from '../assets/images/reword-this/reword-this-slide-2.png';
import rewordThisSlide3 from '../assets/images/reword-this/reword-this-slide-3.png';
import rewordThisSlide4 from '../assets/images/reword-this/reword-this-slide-4.png';
// Import video
import rewordThisDemo from '../assets/videos/reword-this/reword-this-demo.mp4';

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
      id: 5,
      video: rewordThisDemo,
      thumbnailImage: rewordThisHero,
      alt: "Reword This demo"
    },
    {
      id: 1,
      image: rewordThisHero,
      alt: "Reword This Chrome Extension Screenshot"
    },
    {
      id: 2,
      image: rewordThisSlide2,
      alt: "Reword This in action"
    },
    {
      id: 3,
      image: rewordThisSlide3,
      alt: "Reword This features overview"
    },
    {
      id: 4,
      image: rewordThisSlide4,
      alt: "Reword This documentation"
    },
  
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
    <div className="min-h-screen bg-[#F2F2F2]">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#3C3E40] to-[#0D0D0D] py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column - Text Content */}
            <div className="md:w-1/2 text-left md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#F2F2F2]">1-Click Rewriting for Better Communication</h1>
              <p className="text-xl mb-8 text-[#F2F2F2] opacity-90">Reword This ✍️: Instantly rephrase any text in the tone you want. Works across the web — perfect for job seekers, creators, founders, and ESL users.</p>
              <a 
                href="https://chrome.google.com/webstore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#F2F2F2]/30 text-base font-medium rounded-md bg-[#D97904] text-[#F2F2F2] hover:bg-[#D97904]/90 transition-colors md:py-4 md:text-lg md:px-8"
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
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#D97904] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 focus:outline-none shadow-md"
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F2F2F2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#D97904] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 focus:outline-none shadow-md"
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F2F2F2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    className={`h-12 w-20 overflow-hidden rounded border-2 transition-all ${currentSlide === index ? 'border-[#D97904] opacity-100' : 'border-transparent opacity-70'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {isVideoSlide(slide) ? (
                      <div className="w-full h-full bg-[#3C3E40] flex items-center justify-center relative">
                        {slide.thumbnailImage && (
                          <img 
                            src={slide.thumbnailImage}
                            alt={`Video thumbnail ${index + 1}`}
                            className="w-full h-full object-cover opacity-70"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F2F2F2]" viewBox="0 0 20 20" fill="currentColor">
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
      <section className="py-16 bg-[#F2F2F2]">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Full-Width Intro Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#0D0D0D]">Instantly Improve Your Writing</h2>
            <p className="text-xl text-[#6E7073] mb-6">
              With one click, you can rewrite anything — emails, LinkedIn posts, resumes, or web copy — in a clearer, friendlier, or more persuasive tone. Say goodbye to writer's block and hello to confident communication.
            </p>
            <p className="text-xl text-[#3C3E40] italic">
              ✍️ "It's like Grammarly, but for tone — and way faster."
            </p>
          </div>
          
          {/* New Features Section with Image */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - New Features */}
            <div className="md:w-1/2">
              <div className="bg-[#F2F2F2] p-6 rounded-lg border-l-4 border-[#D97904] shadow-md h-full">
                <h3 className="text-xl font-bold mb-4 text-[#0D0D0D]">NEW</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-xl mr-2">🎲</span>
                    <p><strong>Rewrite Battle Mode:</strong> Compare two AI-generated rewrites side-by-side and pick your favorite.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-xl mr-2">🎯</span>
                    <p>Earn XP for every battle — train your tone and sharpen your instincts.</p>
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold mb-4 text-[#0D0D0D]">✨ Also New:</h3>
                <ul className="space-y-2 pl-8 list-disc text-[#6E7073]">
                  <li>Unlock tones like "Creative" and "Executive"</li>
                  <li>Dark Mode and Focus Mode themes now available as rewards!</li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Battle Image */}
            <div className="md:w-1/2 flex items-center">
              <div className="relative w-full">
                <div className="absolute -bottom-3 -right-3 w-32 h-32 rounded-full bg-[#D97904]/20 z-0"></div>
                <div className="relative z-10">
                  <img 
                    src={rewordThisSlide4}
                    alt="Rewrite Battle mode screenshot" 
                    className="w-full h-auto rounded-lg shadow-lg border-2 border-[#D97904]" 
                  />
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#3C3E40] px-5 py-2 rounded-full shadow-lg">
                    <p className="text-[#F2F2F2] text-sm font-medium whitespace-nowrap">New Battle Mode!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use It */}
      <section className="py-16 bg-[#3C3E40] text-[#F2F2F2]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left Column - Features List */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-8">Why Use Reword This?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 text-[#D97904]">✔️</div>
                  <div><p className="text-lg">Rewrite faster — no more second-guessing</p></div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 text-[#D97904]">✔️</div>
                  <div><p className="text-lg">Adjust tone in one click: Clarity, Gen Z, Formal, Friendly</p></div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 text-[#D97904]">✔️</div>
                  <div><p className="text-lg">Battle Mode gamifies rewriting and teaches better writing instincts</p></div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 text-[#D97904]">✔️</div>
                  <div><p className="text-lg">Works on any site — highlight → right click → rewrite</p></div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 text-[#D97904]">✔️</div>
                  <div><p className="text-lg">Powered by GPT AI, optimized for natural tone</p></div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 flex-shrink-0 text-[#D97904]">✔️</div>
                  <div><p className="text-lg">Gamified: XP, streaks, tone & theme unlocks</p></div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#D97904] rounded-full opacity-50 blur-xl z-0"></div>
                <div className="relative z-10 bg-[#0D0D0D] p-4 rounded-lg shadow-xl border border-[#6E7073]/30">
                  <img 
                    src={rewordThisSlide2}
                    alt="Reword This tool in action" 
                    className="w-full h-auto rounded border border-[#6E7073]/20" 
                  />
                  <div className="mt-4 p-3 bg-[#0D0D0D] rounded border border-[#D97904]/30">
                    <p className="text-sm text-[#F2F2F2]/80">
                      <span className="text-[#D97904] font-semibold">Pro tip:</span> Right-click on any text field across the web to instantly rewrite your content in any tone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Reword Tones */}
      <section className="py-16 bg-[#F2F2F2]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-[#0D0D0D]">Reword This Tones Include:</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Accordion Tabs */}
           
            {/*  */}
            <div className="md:w-1/2 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-[#D97904]/20 z-0"></div>
                <div className="relative z-10">
                  <img 
                    src={rewordThisSlide3}
                    alt="Reword This modes in action" 
                    className="w-full h-auto rounded-lg shadow-xl border-2 border-[#D97904]" 
                  />
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#3C3E40] px-5 py-2 rounded-full shadow-lg">
                    <p className="text-[#F2F2F2] text-sm font-medium whitespace-nowrap">Find your perfect tone!</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="md:w-1/2">
              <AccordionTabs
                tabs={[
                  {
                    id: "clarity",
                    label: "Clarity",
                    icon: <span className="text-xl text-[#D97904] mr-2">✨</span>,
                    content: (
                      <div className="p-4">
                        <p className="text-[#6E7073]">Cut the fluff, stay sharp. Perfect for professional emails and technical writing where direct communication is key.</p>
                        <p className="mt-2 text-[#3C3E40] italic">"Before you hit send on that important email, use Clarity mode to make your message concise and easily understood."</p>
                      </div>
                    )
                  },
                  {
                    id: "friendly",
                    label: "Friendly",
                    icon: <span className="text-xl text-[#D97904] mr-2">😊</span>,
                    content: (
                      <div className="p-4">
                        <p className="text-[#6E7073]">Add warmth and personality. Great for customer service emails, social media posts, and any time you want to build rapport.</p>
                        <p className="mt-2 text-[#3C3E40] italic">"Transform cold messages into warm, personable communication that builds connections."</p>
                      </div>
                    )
                  },
                  {
                    id: "genz",
                    label: "Gen Z",
                    icon: <span className="text-xl text-[#D97904] mr-2">🔥</span>,
                    content: (
                      <div className="p-4">
                        <p className="text-[#6E7073]">Use slang and emojis for a more casual, contemporary tone. Ideal for social media and connecting with younger audiences.</p>
                        <p className="mt-2 text-[#3C3E40] italic">"Keep your content fresh and relatable with terms and expressions that resonate with Gen Z."</p>
                      </div>
                    )
                  },
                  {
                    id: "formal",
                    label: "Formal",
                    icon: <span className="text-xl text-[#D97904] mr-2">🤵</span>,
                    content: (
                      <div className="p-4">
                        <p className="text-[#6E7073]">Keep it polished and professional. Perfect for business proposals, academic writing, and official communications.</p>
                        <p className="mt-2 text-[#3C3E40] italic">"Make a strong impression with language that conveys professionalism and attention to detail."</p>
                      </div>
                    )
                  },
                  {
                    id: "creative",
                    label: "Creative",
                    icon: <span className="text-xl text-[#D97904] mr-2">🎨</span>,
                    content: (
                      <div className="p-4">
                        <p className="text-[#6E7073]">Turn on the flair with more expressive and imaginative language. Great for marketing copy, storytelling, and content that needs to stand out.</p>
                        <p className="mt-2 text-[#3C3E40] italic">"Add color and life to your writing with creative, attention-grabbing phrases."</p>
                      </div>
                    )
                  },
                  {
                    id: "executive",
                    label: "Executive",
                    icon: <span className="text-xl text-[#D97904] mr-2">💼</span>,
                    content: (
                      <div className="p-4">
                        <p className="text-[#6E7073]">Sound like a CEO with authoritative and strategic language. Ideal for leadership communications, business strategy, and executive summaries.</p>
                        <p className="mt-2 text-[#3C3E40] italic">"Command attention and respect with communication that reflects leadership and strategic thinking."</p>
                      </div>
                    )
                  }
                ]}
                className="border border-[#6E7073]/20 rounded-lg overflow-hidden shadow-md"
                tabClassName="bg-white hover:bg-[#F2F2F2] border-b border-[#6E7073]/10 px-4 py-3 font-medium"
                activeTabClassName="bg-[#F2F2F2] text-[#D97904] font-semibold"
                contentClassName="bg-white"
              />
            </div>
          {/*  */}
          </div>
          <div className="mt-12 bg-[#6E7073]/10 p-6 rounded-lg border border-[#6E7073]/20">
            <p className="text-xl font-medium text-[#3C3E40]">⌛ Save Time: Average user saves 15–30 minutes/day on rewriting</p>
          </div>
        </div>
      </section>
{/*  */}

      {/* Who It's For */}
      <section className="py-16 bg-[#0D0D0D] text-[#F2F2F2]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12">Who's It For?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#3C3E40] p-6 rounded-lg shadow-md border-t-4 border-[#D97904]">
              <h3 className="text-xl font-semibold mb-2">Job Seekers</h3>
              <p className="text-[#F2F2F2]/80">Make every line count</p>
            </div>
            
            <div className="bg-[#3C3E40] p-6 rounded-lg shadow-md border-t-4 border-[#D97904]">
              <h3 className="text-xl font-semibold mb-2">Creators & Marketers</h3>
              <p className="text-[#F2F2F2]/80">Nail your voice</p>
            </div>
            
            <div className="bg-[#3C3E40] p-6 rounded-lg shadow-md border-t-4 border-[#D97904]">
              <h3 className="text-xl font-semibold mb-2">Freelancers</h3>
              <p className="text-[#F2F2F2]/80">Draft client emails fast</p>
            </div>
            
            <div className="bg-[#3C3E40] p-6 rounded-lg shadow-md border-t-4 border-[#D97904]">
              <h3 className="text-xl font-semibold mb-2">ESL Users</h3>
              <p className="text-[#F2F2F2]/80">Instantly polish your tone</p>
            </div>
            
            <div className="bg-[#3C3E40] p-6 rounded-lg shadow-md border-t-4 border-[#D97904]">
              <h3 className="text-xl font-semibold mb-2">Founders</h3>
              <p className="text-[#F2F2F2]/80">Write like a pro in seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-[#F2F2F2]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-[#0D0D0D]">How It Works:</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap">
              {/* Step 1 */}
              <div className="w-full md:w-1/4 p-3 border-b md:border-b-0 md:border-r border-[#6E7073]/10">
                <div className="flex items-center mb-2">
                  <div className="bg-[#D97904] text-[#F2F2F2] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <h3 className="font-semibold text-[#0D0D0D]">Install</h3>
                </div>
                <p className="text-sm text-[#6E7073] pl-11">Add Reword This from the Chrome Web Store</p>
              </div>
              
              {/* Step 2 */}
              <div className="w-full md:w-1/4 p-3 border-b md:border-b-0 md:border-r border-[#6E7073]/10">
                <div className="flex items-center mb-2">
                  <div className="bg-[#D97904] text-[#F2F2F2] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <h3 className="font-semibold text-[#0D0D0D]">Highlight</h3>
                </div>
                <p className="text-sm text-[#6E7073] pl-11">Select text and right-click → "Reword This"</p>
              </div>
              
              {/* Step 3 */}
              <div className="w-full md:w-1/4 p-3 border-b md:border-b-0 md:border-r border-[#6E7073]/10">
                <div className="flex items-center mb-2">
                  <div className="bg-[#D97904] text-[#F2F2F2] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <h3 className="font-semibold text-[#0D0D0D]">Choose</h3>
                </div>
                <p className="text-sm text-[#6E7073] pl-11">Select your tone or try "Rewrite Battle"</p>
              </div>
              
              {/* Step 4 */}
              <div className="w-full md:w-1/4 p-3">
                <div className="flex items-center mb-2">
                  <div className="bg-[#D97904] text-[#F2F2F2] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                  <h3 className="font-semibold text-[#0D0D0D]">Use</h3>
                </div>
                <p className="text-sm text-[#6E7073] pl-11">Copy or replace the rewritten content</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#6E7073]/10 text-center">
              <p className="font-medium text-[#3C3E40] flex items-center justify-center">
                <span className="text-[#D97904] mr-2">⌛</span> 
                Average user saves 15–30 minutes per day on rewriting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-[#3C3E40] text-[#F2F2F2]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12">Plans:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0D0D0D] p-8 rounded-lg shadow-md border border-[#6E7073]/20 flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-[#F2F2F2]/70 mb-6">Get started instantly with no commitment</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#D97904] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>10 rewrites/day</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#D97904] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>3 core tones</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#D97904] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1 battle/day</span>
                </li>
              </ul>
              <div className="mt-auto pt-4">
                <a 
                  href="https://chrome.google.com/webstore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 px-4 border border-[#F2F2F2]/30 rounded-md shadow-sm text-sm font-medium text-[#0D0D0D] bg-[#D97904] hover:bg-[#D97904]/90 transition-colors"
                >
                  Get Reword This Free
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#3C3E40] to-[#0D0D0D] text-[#F2F2F2] p-8 rounded-lg shadow-md flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-[#F2F2F2]/70 mb-6">Coming Soon - Unlock the full potential</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#D97904] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlock all tones</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#D97904] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited usage</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-[#D97904] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Themes and battles</span>
                </li>
              </ul>
              <div className="mt-auto pt-4">
                <button
                  className="block w-full text-center py-2 px-4 border border-[#D97904] rounded-md shadow-sm text-sm font-medium bg-transparent text-[#D97904] hover:bg-[#D97904]/10 transition-colors"
                  onClick={() => document.getElementById('premium-waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Join the waitlist for Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Waitlist Section */}
      <section id="premium-waitlist" className="py-16 bg-[#0D0D0D] text-[#F2F2F2]">
        <div className="container mx-auto px-4 max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Join the Premium Waitlist</h2>
          <p className="text-lg text-[#F2F2F2]/70 mb-8 text-center">
            Get early access and special offers when Reword This Premium launches
          </p>
          <div className="bg-[#3C3E40] p-6 rounded-lg shadow-lg border border-[#6E7073]/20">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#F2F2F2]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-4 text-[#0D0D0D]">Communicate smarter.</h2>
          <p className="text-xl text-[#6E7073] mb-8">Try Reword This — your AI tone expert, just a click away.</p>
          <a 
            href="https://chrome.google.com/webstore" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-[#D97904]/20 text-base font-medium rounded-md text-[#F2F2F2] bg-[#D97904] hover:bg-[#D97904]/90 transition-colors md:py-4 md:text-lg md:px-8"
          >
            Add to Chrome
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] py-12 border-t border-[#6E7073]/20 text-[#F2F2F2]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Link to="/" className="text-[#D97904] hover:text-[#F2F2F2] mb-4 md:mb-0 transition-colors">
              Back to theboringdev.com
            </Link>
            <p className="text-[#6E7073]">
              Contact: <a href="mailto:contact@theboringdev.com" className="text-[#D97904] hover:text-[#F2F2F2] transition-colors">
                contact@theboringdev.com
              </a>
            </p>
            <div className="mt-4 md:mt-0">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#D97904] hover:text-[#F2F2F2] transition-colors">
                Twitter/X
              </a>
            </div>
          </div>
          <p className="text-[#6E7073] mt-8">© {new Date().getFullYear()} The Boring Dev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RewordThisPage; 