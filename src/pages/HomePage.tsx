import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import LandingColorTheme from '../components/LandingColorTheme';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-boring-offwhite">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-theme-gradient py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-boring-offwhite">The Boring Dev</h1>
          <p className="text-xl text-boring-offwhite opacity-90 mb-8">Simple tools, thoughtful design.</p>
          <a href="#projects" className="bg-boring-offwhite text-boring-main px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all">Explore Projects</a>
        </div>
      </section>

      {/* Featured Project Block */}
      <section id="projects" className="py-16 bg-boring-offwhite">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-boring-dark">Projects</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
            <div className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-boring-main/10 rounded-full flex items-center justify-center text-boring-main">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2 text-boring-dark">Reword This</h3>
              <p className="text-boring-gray text-center mb-6">Rewrite anything in one click</p>
              <div className="text-center">
                <Link to="/reword-this" className="bg-boring-main text-boring-offwhite px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all">Visit Site</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Maker */}
      <section className="py-16 bg-boring-dark">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-8 text-boring-offwhite">About the Maker</h2>
          <p className="text-xl text-boring-offwhite opacity-80 mb-8">
            Built by Nhien Dang — a solo dev and designer building smart, boring tools that just work.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-boring-offwhite hover:text-opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-boring-offwhite hover:text-opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-boring-offwhite">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-boring-dark">Contact</h2>
          <ContactForm />
        </div>
      </section>

      {/* Color Theme Showcase */}
      <LandingColorTheme />

      {/* Footer */}
      <footer className="bg-boring-main py-8">
        <div className="container mx-auto text-center">
          <p className="text-boring-offwhite opacity-90">© {new Date().getFullYear()} The Boring Dev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 