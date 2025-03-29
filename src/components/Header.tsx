import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-boring-dark shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-boring-offwhite">The Boring Dev</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-boring-offwhite hover:text-opacity-80 transition-all">Home</Link>
            </li>
            <li>
              <Link to="/reword-this" className="text-boring-offwhite hover:text-opacity-80 transition-all">Reword This</Link>
            </li>
            <li>
              <a href="mailto:contact@theboringdev.com" className="text-boring-offwhite hover:text-opacity-80 transition-all">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 