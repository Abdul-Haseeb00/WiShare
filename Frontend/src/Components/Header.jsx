import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wifi, Rocket, X, Menu } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();

  // navLinks: sectionId = scroll target, path = route navigation
  const navLinks = [
    { name: 'Home', href: '/', sectionId: null, path: null },
    { name: 'Features', href: '#features', sectionId: 'features', path: null },
    { name: 'How it Works', href: '#how-it-works', sectionId: 'how-it-works', path: null },
    { name: 'About us', href: '/about-us', sectionId: null, path: '/about-us' },
  ];

  // Scroll spy - only on homepage
  useEffect(() => {
    if (location.pathname !== '/') {
      // On other pages, no scroll spy - activeLink stays as-is or reset
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      const featuresEl = document.getElementById('features');
      const howItWorksEl = document.getElementById('how-it-works');

      if (howItWorksEl && scrollPos >= howItWorksEl.offsetTop) {
        setActiveLink('How it Works');
      } else if (featuresEl && scrollPos >= featuresEl.offsetTop) {
        setActiveLink('Features');
      } else {
        setActiveLink('Home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Reset active link when route changes to home
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveLink('Home');
    } else if (location.pathname === '/about-us') {
      setActiveLink('About us');
    }
  }, [location.pathname]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Route navigation (About us, etc.)
    if (link.path) {
      navigate(link.path);
      setActiveLink(link.name);
      return;
    }

    // Home click
    if (link.name === 'Home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      setActiveLink('Home');
      return;
    }

    // Section scroll (Features, How it Works)
    if (link.sectionId) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(link.sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveLink(link.name);
          }
        }, 300);
      } else {
        const el = document.getElementById(link.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveLink(link.name);
        }
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setActiveLink('Home');
    setIsMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    setIsMobileMenuOpen(false);
    navigate('/share');
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleLogoClick}
          >
            <Wifi className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              WiShare
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative text-[15px] font-medium transition-colors pb-1 cursor-pointer ${
                  activeLink === link.name
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {link.name}
                {activeLink === link.name && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <button 
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Rocket className="w-4 h-4" />
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium cursor-pointer ${
                  activeLink === link.name
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={handleGetStarted}
              className="w-full mt-3 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Rocket className="w-4 h-4" />
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;