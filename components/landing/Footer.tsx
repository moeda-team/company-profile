'use client';

import { Zap, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

const solutions = [
  { label: 'Enterprise Systems', href: '#solutions' },
  { label: 'AI & Intelligent Solutions', href: '#solutions' },
  { label: 'ERP & Business Management', href: '#solutions' },
  { label: 'Mobile Applications', href: '#solutions' },
  { label: 'Data & Analytics', href: '#solutions' },
  { label: 'Cloud & Integration', href: '#solutions' },
];

const industries = [
  { label: 'Mining', href: '#industries' },
  { label: 'Construction', href: '#industries' },
  { label: 'Manufacturing', href: '#industries' },
  { label: 'Healthcare', href: '#industries' },
  { label: 'Education', href: '#industries' },
  { label: 'Government', href: '#industries' },
];

const explore = [
  { label: 'How It Works', href: '#workflow' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Best Project', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Get Started', href: '#cta' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand + contact */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">ACME</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              A powerful, flexible modular system that helps you organize work, track progress, and deliver results.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:hello@acme.example.com" className="hover:text-white transition-colors">hello@acme.example.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+1 (555) 010-2024</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>123 Market St, San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-3 text-sm">
              {solutions.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-white transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Industries</h4>
            <ul className="space-y-3 text-sm">
              {industries.map((i) => (
                <li key={i.label}>
                  <a href={i.href} className="hover:text-white transition-colors">{i.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3 text-sm">
              {explore.map((e) => (
                <li key={e.label}>
                  <a href={e.href} className="hover:text-white transition-colors">{e.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2026 ACME Systems Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
