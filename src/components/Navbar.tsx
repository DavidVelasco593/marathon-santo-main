// Navbar.jsx
import { Link, useLocation } from 'wouter';
import { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const isHidden =
    location === '/' ||
    /^\/pagar\/[^/]+$/.test(location) ||
    location === '/info';

  if (isHidden) {
    return null;
  }

  const navItems = [
    { label: 'Preinscripciones', path: '/preinscripciones' },
    { label: 'Pagos', path: '/pagos' },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img
              alt="logo-sd"
              src="https://www.santodomingo.gob.ec/wp-content/uploads/2020/05/favicon.png"
              className="h-8 w-8 mr-2"
            />
            <span className="font-bold text-lg">GADMSD</span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${
                location === item.path
                  ? 'text-yellow-300 font-semibold'
                  : 'text-white'
              } hover:text-yellow-300`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${
                  location === item.path
                    ? 'text-yellow-300 font-semibold'
                    : 'text-white'
                } hover:text-yellow-300`}
                onClick={() => setIsMenuOpen(false)} // Cierra el menú al seleccionar una opción
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
