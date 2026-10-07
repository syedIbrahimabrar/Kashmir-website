import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Compass, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (itemName?: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onOpenBooking, activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Destinations', id: 'destinations' },
    { name: 'Tour Packages', id: 'packages' },
    { name: 'Custom Planner', id: 'builder' },
    { name: 'Travel Plans', id: 'plans' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Blog', id: 'blog' },
    { name: 'About Us', id: 'about' },
    { name: 'FAQs', id: 'faqs' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-black/95 border-b border-neutral-900 py-3 backdrop-blur-md' : 'bg-black/70 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <span className="text-gold-500 font-serif text-3xl font-bold tracking-tighter transition-transform duration-500 group-hover:scale-105">KE</span>
          <div className="h-8 w-px bg-white/20"></div>
          <div>
            <h1 className="text-lg sm:text-xl font-serif tracking-widest text-gold-500 uppercase leading-none">
              Kashmir Escape
            </h1>
            <p className="text-[9px] text-[#BDBDBD] tracking-[0.2em] uppercase leading-none mt-1">
              Luxury Travel
            </p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer ${
                activeSection === link.id
                  ? 'text-gold-500 border-b border-gold-500 pb-1'
                  : 'text-[#BDBDBD] hover:text-gold-500'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* CTA and Call info */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href="tel:+923000000000"
            className="flex items-center gap-1.5 text-[#BDBDBD] hover:text-gold-500 transition text-xs font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-gold-500" />
            <span className="tracking-wider">+92 300 0000000</span>
          </a>
          <button
            onClick={() => onOpenBooking()}
            className="bg-gold-500 text-black px-6 py-2.5 rounded-full hover:bg-opacity-90 transition-all font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-[0.97]"
          >
            BOOK NOW
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="px-4 py-2 text-[10px] uppercase font-bold tracking-wider text-black bg-gold-500 hover:bg-gold-400 rounded-full transition cursor-pointer"
          >
            Book
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900/40 rounded-full transition"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-neutral-950/95 border-b border-white/10 overflow-hidden backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-4 max-w-7xl mx-auto">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-3 py-2 text-left text-[11px] uppercase tracking-wider font-semibold rounded-lg transition-colors ${
                      activeSection === link.id
                        ? 'text-gold-500 bg-white/5 border border-white/15'
                        : 'text-[#BDBDBD] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <a
                  href="tel:+923000000000"
                  className="flex items-center gap-2 text-[#BDBDBD] hover:text-gold-500 transition text-xs"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span className="tracking-wider">+92 300 0000000</span>
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 text-center text-xs uppercase font-bold tracking-widest text-black bg-gold-500 hover:bg-gold-400 rounded-full transition flex items-center justify-center gap-1.5"
                >
                  Book Your Luxury Tour <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
