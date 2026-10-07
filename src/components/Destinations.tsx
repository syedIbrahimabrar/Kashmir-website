import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Star, Compass, Calendar, ArrowRight, X, Clock, HelpCircle } from 'lucide-react';
import { destinations } from '../data';
import { Destination } from '../types';

interface DestinationsProps {
  onOpenBooking: (itemName?: string) => void;
}

export default function Destinations({ onOpenBooking }: DestinationsProps) {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  return (
    <section id="destinations" className="py-24 bg-black border-t border-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
            Bespoke Coordinates
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Popular Destinations
          </h2>
          <p className="text-sm text-[#BDBDBD] leading-relaxed">
            Unravel Kashmir’s ultimate majestic treasures. From soaring alpine fields to turquoise pristine rivers, each site is a testament to natural wonder.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white/5 rounded-2xl border border-white/10 p-5 backdrop-blur-md flex flex-col justify-between hover:border-gold-500/50 transition duration-300 relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 rounded-xl mb-4">
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 py-1 px-2.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-bold text-gold-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {dest.location.split(',')[0]}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 py-1 px-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                  {dest.rating}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1 text-left">
                  <h3 className="font-serif text-xl font-normal text-white group-hover:text-gold-500 transition duration-300">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-[#BDBDBD] leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#BDBDBD] tracking-wider">
                    Best: <span className="text-white">{dest.bestTime}</span>
                  </span>
                  <button
                    onClick={() => setSelectedDest(dest)}
                    className="w-full py-2.5 border border-gold-500/30 rounded-lg text-[9px] uppercase tracking-widest text-gold-500 hover:bg-gold-500 hover:text-black transition-all font-bold cursor-pointer"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Destination Detail Drawer/Modal */}
      <AnimatePresence>
        {selectedDest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDest(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 p-1"
            >
              {/* Header Close */}
              <button
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white bg-black/60 hover:bg-neutral-900 border border-white/10 rounded-full transition cursor-pointer"
                aria-label="Close destination guide"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Photo */}
              <div className="relative h-56 bg-neutral-900 rounded-t-xl overflow-hidden">
                <img
                  src={selectedDest.image}
                  alt={selectedDest.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h4 className="font-serif text-3xl font-normal text-white">{selectedDest.name}</h4>
                  <p className="text-xs text-gold-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedDest.location}
                  </p>
                </div>
              </div>

              {/* Detailed Info */}
              <div className="p-6 space-y-6">
                <div className="space-y-2 text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#BDBDBD] block">
                    Scenic Insight
                  </span>
                  <p className="text-xs text-[#BDBDBD] leading-relaxed">
                    {selectedDest.description} This spot serves as a prime centerpiece for high-end photography and immersive exploration. Our luxury tours ensure priority permissions, private local host access, and customized slow-paced travel loops.
                  </p>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 bg-black/50 border border-white/10 rounded-xl space-y-1 text-left">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#BDBDBD]">
                      <Clock className="w-3.5 h-3.5 text-gold-500" />
                      Ideal Season
                    </div>
                    <span className="text-xs font-semibold text-white">{selectedDest.bestTime}</span>
                  </div>

                  <div className="p-3.5 bg-black/50 border border-white/10 rounded-xl space-y-1 text-left">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#BDBDBD]">
                      <Compass className="w-3.5 h-3.5 text-gold-500" />
                      Trip Difficulty
                    </div>
                    <span className="text-xs font-semibold text-white">Easy to Moderate</span>
                  </div>
                </div>

                {/* Concierge Suggestion */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-3 items-start text-left">
                  <HelpCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-white block uppercase tracking-wider">
                      Exclusive Concierge Tip
                    </span>
                    <span className="text-[10px] text-[#BDBDBD] block leading-normal mt-0.5">
                      Private photography spots with optimal mountain lighting are available around 5:30 AM. Ask your guide to arrange the early dawn premium bonfire setup.
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedDest(null);
                      onOpenBooking(selectedDest.name);
                    }}
                    className="flex-1 py-3 bg-gold-500 hover:bg-opacity-90 text-black font-bold text-xs uppercase tracking-widest rounded-full transition cursor-pointer"
                  >
                    Inquire About {selectedDest.name}
                  </button>
                  <button
                    onClick={() => setSelectedDest(null)}
                    className="px-6 py-3 bg-transparent hover:bg-white/5 text-white border border-white/15 rounded-full text-xs font-semibold transition cursor-pointer"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
