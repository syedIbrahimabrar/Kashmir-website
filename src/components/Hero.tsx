import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Calendar, MapPin, Star, Trophy, X, Compass, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (itemName?: string) => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onOpenBooking, onNavigate }: HeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const stats = [
    { value: '10,000+', label: 'Happy Travelers', icon: Star },
    { value: '150+', label: 'Premium Tours', icon: Compass },
    { value: '4.9 / 5', label: 'Customer Rating', icon: Trophy },
    { value: '10 Years', label: 'Of Experience', icon: Calendar },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black flex flex-col justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Decorative premium framing (strictly content area border overlays, no background graphics) */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-900 to-transparent hidden md:block" />
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-900 to-transparent hidden md:block" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center text-center space-y-12 py-12">
        {/* Centered Main Column */}
        <div className="space-y-6 text-center flex flex-col items-center max-w-3xl">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold-500 uppercase text-xs tracking-[0.3em] font-semibold"
          >
            Premium Expedition
          </motion.div>

          {/* Large display titles */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl xl:text-7xl font-normal text-white leading-[1.1]"
            >
              Explore the <span className="italic text-gold-500">Paradise</span> of Kashmir
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#BDBDBD] text-base leading-relaxed max-w-xl mx-auto"
            >
              Travel through majestic mountains, peaceful valleys, and crystal-clear lakes with our award-winning luxury experiences.
            </motion.p>
          </div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-2"
          >
            <button
              onClick={() => onNavigate('packages')}
              className="border-2 border-gold-500 text-gold-500 px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gold-500 hover:text-black transition-all cursor-pointer active:scale-[0.98]"
            >
              Explore Packages
            </button>
            <button
              onClick={() => onNavigate('builder')}
              className="text-white border-b border-white/30 px-2 py-3.5 font-bold uppercase text-xs tracking-widest hover:border-gold-500 transition-all cursor-pointer"
            >
              Plan Your Trip
            </button>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-gold-500 transition flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span className="p-2.5 rounded-full border border-white/10 bg-white/5 group-hover:border-gold-500 group-hover:bg-gold-500/10 text-gold-500 transition duration-300">
                <Play className="w-4 h-4 fill-gold-500 text-gold-500" />
              </span>
              <span className="tracking-widest text-[11px]">Watch Video</span>
            </button>
          </motion.div>
        </div>

        {/* Centered Stats Row */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-t border-white/10 pt-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="flex flex-col gap-1 items-center"
            >
              <span className="font-serif text-3xl sm:text-4xl text-gold-500">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#BDBDBD] font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black border border-neutral-800 rounded-2xl overflow-hidden aspect-video z-10 shadow-2xl"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 text-white bg-black/50 hover:bg-neutral-950 border border-neutral-800 rounded-full transition"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Simulated Luxury Video Stream Player */}
              <div className="w-full h-full flex flex-col items-center justify-center relative bg-neutral-950 p-8 text-center space-y-4">
                <MapPin className="w-12 h-12 text-gold-500 animate-bounce" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500">
                    Kashmir Escape Cinematic Preview
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    Experience Paradise in 4K Ultra HD
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    A cinematic drone montage of Neelum River, Ratti Gali alpine meadows, and Arang Kel peak is loading...
                  </p>
                </div>
                
                {/* Fallback Beautiful Embedded scenery preview */}
                <div className="w-full max-w-lg h-32 bg-black border border-neutral-900 rounded-xl flex items-center justify-center p-4">
                  <span className="text-[11px] font-mono text-neutral-500 text-center leading-relaxed">
                    [ VIDEO EMBED STREAMING PLACEHOLDER ]<br />
                    "High-definition panoramic valleys, mountain lakes and V8 Land Cruiser convoy footage starts playing."
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsVideoOpen(false);
                    onOpenBooking();
                  }}
                  className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition"
                >
                  Book This Experience Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
