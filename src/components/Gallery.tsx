import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { galleryImages } from '../data';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex(activeIndex === 0 ? galleryImages.length - 1 : activeIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex(activeIndex === galleryImages.length - 1 ? 0 : activeIndex + 1);
    }
  };

  return (
    <section id="about" className="py-24 bg-black border-t border-neutral-950 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* About Us Sub-section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-white/10 pb-20 text-left">
          {/* Left Column: Vision & Story */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500 block">
              Our Vision & Story
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Bespoke Mountain Journeys <br />
              <span className="italic text-gold-500">For The Discriminating Traveler</span>
            </h2>
            <p className="text-sm text-[#BDBDBD] leading-relaxed">
              Founded on the belief that travel should be both inspiring and seamless, Kashmir Escape is Azad Kashmir's premier luxury travel concierge. We specialize in mapping elite coordinate paths, arranging luxury timber chalets, and curating private 4x4 expedition fleets.
            </p>
            <p className="text-sm text-[#BDBDBD] leading-relaxed">
              Every turn of our tour, from the whispering current of the Neelum River to the high alpine serenity of Ratti Gali, is synchronized with safety, comfort, and cultural immersion. We invite you to experience paradise, elevated.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div>
                <span className="block text-xl font-serif text-gold-500">100%</span>
                <span className="text-[10px] uppercase text-[#BDBDBD] tracking-wider font-bold">Safety Record</span>
              </div>
              <div className="w-px bg-white/10 h-10 hidden sm:block"></div>
              <div>
                <span className="block text-xl font-serif text-gold-500">5-Star</span>
                <span className="text-[10px] uppercase text-[#BDBDBD] tracking-wider font-bold">Elite Partners</span>
              </div>
              <div className="w-px bg-white/10 h-10 hidden sm:block"></div>
              <div>
                <span className="block text-xl font-serif text-gold-500">24/7</span>
                <span className="text-[10px] uppercase text-[#BDBDBD] tracking-wider font-bold">VIP Concierge</span>
              </div>
            </div>
          </div>

          {/* Right Column: Statement Card with custom border style */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl relative text-left space-y-6 backdrop-blur-md">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
            <h3 className="font-serif text-xl text-white font-normal">Our Commitment to Perfection</h3>
            <p className="text-xs text-[#BDBDBD] leading-relaxed">
              Our travel specialists possess deep-rooted local intelligence, ensuring you bypass crowded checkpoints and gain exclusive access to private valleys. We handle all logistics—so you can fully connect with the sublime landscape.
            </p>
            <div className="p-5 bg-black/40 border border-white/5 rounded-xl space-y-2">
              <span className="text-[10px] text-gold-500 uppercase font-bold tracking-widest block">Founder's Standard</span>
              <p className="text-xs italic text-white leading-relaxed">
                "We do not merely sell packages. We curate core memories. Every bridge crossed, every meal served is a brushstroke of Kashmir’s finest sapphire."
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Sub-section */}
        <div id="gallery" className="space-y-16 scroll-mt-20">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
              Visual Escapes
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
              Cinematic Gallery
            </h2>
            <p className="text-sm text-[#BDBDBD] leading-relaxed">
              A curated photographic collection capturing the timeless valleys, misty rivers, and sapphire-hued ridges of Azad Kashmir. Hover over each canvas to begin the preview.
            </p>
          </div>

        {/* Masonry-style Grid (using tailwind columns for standard CSS masonry) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setActiveIndex(i)}
              className="break-inside-avoid relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer hover:border-gold-500/50 transition-all duration-300 block"
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800';
                }}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 rounded-2xl"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 rounded-2xl">
                <div className="flex justify-end">
                  <span className="p-2.5 rounded-full bg-black/85 border border-white/10 text-gold-500">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-1.5 text-left">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-gold-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Kashmir Wilderness
                  </span>
                  <h4 className="font-serif font-normal text-white text-base leading-tight">
                    {image.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[85vh] z-10 flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute -top-12 right-0 p-2 text-neutral-300 hover:text-white hover:bg-white/5 border border-white/15 rounded-full transition z-20 cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Frame with gold border */}
              <div className="relative w-full h-full border border-white/10 bg-[#0c0c0c] rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl p-1">
                <img
                  src={galleryImages[activeIndex].url}
                  alt={galleryImages[activeIndex].title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="max-h-[70vh] w-auto max-w-full object-contain p-4 rounded-xl"
                />

                {/* Left navigation arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-black text-white border border-white/15 transition cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right navigation arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-black text-white border border-white/15 transition cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Footer info box */}
              <div className="mt-4 text-center space-y-1">
                <h4 className="font-serif text-white font-normal text-xl">
                  {galleryImages[activeIndex].title}
                </h4>
                <p className="text-xs text-gold-500 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Kashmir Escape Premium Fine-Art Asset ({activeIndex + 1} of {galleryImages.length})
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
