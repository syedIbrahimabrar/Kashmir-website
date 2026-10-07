import React from 'react';
import { Compass, Mail, Phone, MapPin, Youtube, Instagram, Facebook, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  
  const popularDestinations = [
    { name: 'Neelum Valley', id: 'destinations' },
    { name: 'Arang Kel', id: 'destinations' },
    { name: 'Keran', id: 'destinations' },
    { name: 'Sharda', id: 'destinations' },
    { name: 'Ratti Gali Lake', id: 'destinations' },
    { name: 'Pir Chinasi', id: 'destinations' }
  ];

  const coreServices = [
    { name: 'Tour Packages', id: 'packages' },
    { name: 'Travel Plans', id: 'plans' },
    { name: 'Travel Blog', id: 'blog' },
    { name: 'FAQs', id: 'faqs' }
  ];

  const policyLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Refund Policy', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePolicyClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    alert(`[POLICY DIALOG] The physical copy of the "${name}" is managed in compliance with Kashmir Escape corporate regulations at our Karachi HQ.`);
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 text-xs sm:text-sm relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
          
          {/* Col 1: Branding (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            >
              <div className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-gold-500">
                <Compass className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <span className="font-serif text-lg sm:text-xl font-normal tracking-widest text-white uppercase block">
                  Kashmir <span className="text-gold-500 font-serif">Escape</span>
                </span>
                <span className="text-[9px] text-[#BDBDBD] tracking-[0.3em] uppercase block -mt-0.5 font-medium">
                  Luxury Journeys
                </span>
              </div>
            </button>

            <p className="text-[#BDBDBD] text-xs leading-relaxed max-w-sm">
              Experience breathtaking mountains, crystal-clear lakes, peaceful valleys, and unforgettable adventures with our premium travel experiences. Every journey begins with a dream.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-gold-500 hover:border-gold-500/40 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-gold-500 hover:border-gold-500/40 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-gold-500 hover:border-gold-500/40 transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Destinations (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-normal text-white text-xs uppercase tracking-[0.2em] text-gold-500">
              Popular Spots
            </h4>
            <ul className="space-y-2 text-xs">
              {popularDestinations.map((dest, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(dest.id)}
                    className="text-[#BDBDBD] hover:text-white transition cursor-pointer"
                  >
                    {dest.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-normal text-white text-xs uppercase tracking-[0.2em] text-gold-500">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              {coreServices.map((serv, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(serv.id)}
                    className="text-[#BDBDBD] hover:text-white transition cursor-pointer"
                  >
                    {serv.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-gold-500 font-bold hover:text-white transition cursor-pointer"
                >
                  Book Securely
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Policy (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <h4 className="font-serif font-normal text-white text-xs uppercase tracking-[0.2em] text-gold-500">
              HQ Branch Contact
            </h4>
            
            <div className="space-y-3 text-[#BDBDBD]">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>M.A. Jinnah Road, Near Quaid-e-Azam Mausoleum, Karachi, Pakistan.</span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-gold-500" />
                <span>+92 300 0000000</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-gold-500" />
                <span>info@example.com</span>
              </div>
            </div>

            {/* Document Policy Row */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#BDBDBD]/60">
              {policyLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handlePolicyClick(e, link.name)}
                  className="hover:text-gold-500 transition"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#BDBDBD]/50 text-center sm:text-left">
            © 2026 Kashmir Escape. All Rights Reserved. Special Portfolios Standard Edition.
          </p>

          <button
            onClick={handleScrollTop}
            className="px-5 py-2.5 bg-white/5 border border-white/15 hover:border-white/30 text-white rounded-full transition group flex items-center gap-1.5 cursor-pointer text-xs font-semibold uppercase tracking-wider"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
