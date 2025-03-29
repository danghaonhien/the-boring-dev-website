import { Link } from 'react-router-dom';
import Header from '../components/Header';

const RewordThisPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Rewrite Anything in One Click</h1>
          <p className="text-xl mb-8">Change your tone, sound smarter, save time — directly from your browser.</p>
          <a 
            href="https://chrome.google.com/webstore" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-8"
          >
            Add to Chrome
          </a>
          <div className="mt-12">
            <img 
              src="https://via.placeholder.com/800x400" 
              alt="Reword This Chrome Extension Screenshot" 
              className="rounded-lg shadow-xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* What is Reword This */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-8">What is Reword This?</h2>
          <p className="text-xl text-gray-600">
            A Chrome extension that uses AI to reword selected text in different tones (Clarity, Friendly, Persuasive, etc.). 
            Built for job seekers, creators, ESL users, and founders.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-green-500 mr-2">✅</span>
                <h3 className="text-xl font-semibold">One-click rewrite</h3>
              </div>
              <p className="text-gray-600">Instantly rewrite any text with a simple right-click menu.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-blue-500 mr-2">🎨</span>
                <h3 className="text-xl font-semibold">Multiple tones</h3>
              </div>
              <p className="text-gray-600">Clarity, Friendly, Formal, Persuasive, Creative, Executive and more.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-purple-500 mr-2">🎲</span>
                <h3 className="text-xl font-semibold">Surprise Me mode</h3>
              </div>
              <p className="text-gray-600">Let the AI choose a random tone for unexpected results.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-red-500 mr-2">🥊</span>
                <h3 className="text-xl font-semibold">Battle of the Rewrites</h3>
              </div>
              <p className="text-gray-600">Compare different tones side-by-side to pick the perfect one.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-orange-500 mr-2">🔥</span>
                <h3 className="text-xl font-semibold">XP + streak gamification</h3>
              </div>
              <p className="text-gray-600">Earn points and build streaks as you use the extension.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-pink-500 mr-2">🎁</span>
                <h3 className="text-xl font-semibold">Unlockable themes + tones</h3>
              </div>
              <p className="text-gray-600">Earn rewards the more you use the extension.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-gray-800 mr-2">🔐</span>
                <h3 className="text-xl font-semibold">Privacy-first</h3>
              </div>
              <p className="text-gray-600">No tracking, no data stored. Your text remains private.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use It */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Use It?</h2>
          <div className="space-y-6">
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Write faster and smarter</h3>
                <p className="mt-1 text-gray-600">Save time by quickly transforming your writing without starting from scratch.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Match your tone to your audience</h3>
                <p className="mt-1 text-gray-600">Adjust your communication style to fit different situations and readers.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Eliminate writer's block</h3>
                <p className="mt-1 text-gray-600">Get unstuck with AI-powered rewrites that maintain your original message.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Look more polished</h3>
                <p className="mt-1 text-gray-600">Make your emails, posts, and resumes sound professional and well-crafted.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Highlight Text</h3>
              <p className="text-gray-600">Highlight any text on any website</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Right-Click</h3>
              <p className="text-gray-600">Choose "Reword This" from the context menu</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">Instantly see your text rewritten in your chosen tone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <p className="text-gray-600 mb-6">Perfect for occasional use</p>
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
                  <span>3 core tones (Clarity, Friendly, Formal)</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1 Surprise Me/day</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Local XP & streak tracking</span>
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
              <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
              <p className="text-blue-100 mb-6">Coming Soon</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited rewrites</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlock all 10+ tones</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Full gamification (XP leaderboard, streak rewards)</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Rewrite Battle Mode</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom tone trainer</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Theme unlocks (Dark mode, Focus mode)</span>
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

      {/* Testimonials - Optional */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"This helped me polish my resume instantly!"</p>
              <p className="font-medium">— Job seeker</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"I use it every day to rewrite emails."</p>
              <p className="font-medium">— Freelancer</p>
            </div>
          </div>
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