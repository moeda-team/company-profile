'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Features', href: '#tech' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'More', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setActiveSection(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">ACME</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors relative group ${
                    activeSection === link.href
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#cta"
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <a
                  href="#cta"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
