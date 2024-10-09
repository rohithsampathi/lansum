import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Logo from './Logo';
import { User, LogOut, Menu, X } from 'lucide-react';

const Header = ({ user, logout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          <Link to="/" className="flex items-center text-xl md:text-2xl font-bold text-primary">
            <Logo className="w-6 h-6 md:w-8 md:h-8 mr-2" />
            <span className="hidden sm:inline">CommUnity Hub</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/profile" className="text-gray-700 hover:text-primary">
              <User className="inline-block mr-1" size={18} />
              <span>{user.username}</span>
            </Link>
            <Button onClick={logout} className="flex items-center text-sm">
              <LogOut className="mr-2" size={18} /> Logout
            </Button>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              <User className="inline-block mr-2" size={18} />
              {user.username}
            </Link>
            <button
              onClick={() => {
                logout();
                toggleMobileMenu();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              <LogOut className="inline-block mr-2" size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;