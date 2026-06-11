import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wider">
          AI Fake News Detector
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-300 transition">Анализ</Link>
          <Link to="/history" className="hover:text-blue-300 transition">История</Link>
          <Link to="/statistics" className="hover:text-blue-300 transition">Статистика</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
