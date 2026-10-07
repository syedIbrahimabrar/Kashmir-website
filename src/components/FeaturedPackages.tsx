import { motion } from 'motion/react';
import { Star, Clock, CheckCircle2, ChevronRight, Tag } from 'lucide-react';
import { tourPackages } from '../data';

interface FeaturedPackagesProps {
  onOpenBooking: (itemName?: string) => void;
}

export default function FeaturedPackages({ onOpenBooking }: FeaturedPackagesProps) {
  return (
    <section id="packages" className="py-24 bg-black border-t border-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
            Curated Expeditions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Featured Tour Packages
          </h2>
          <p className="text-sm text-[#BDBDBD] leading-relaxed">
            Immerse yourself in specialized signature excursions. Our signature tour packages offer fully chauffeured VIP tracks, pre-arranged luxury suites, and elite details.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tourPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white/5 rounded-2xl border border-white/10 p-5 backdrop-blur-md flex flex-col justify-between hover:border-gold-500/50 transition duration-300"
            >
              <div>
                {/* Image and ribbon */}
                <div className="relative aspect-video overflow-hidden bg-neutral-900 rounded-xl mb-4">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Tag Ribbon */}
                  {pkg.tag && (
                    <div className="absolute top-3 left-3 py-1 px-3 bg-gold-500 text-black text-[9px] uppercase font-extrabold tracking-wider rounded-lg flex items-center gap-1 shadow-md shadow-black/40">
                      <Tag className="w-3 h-3 fill-black" />
                      {pkg.tag}
                    </div>
                  )}

                  {/* Price overlay */}
                  <div className="absolute bottom-3 right-3 py-1.5 px-3 rounded-xl bg-black/85 border border-white/10 text-right backdrop-blur-md">
                    <span className="text-[8px] uppercase tracking-wider text-[#BDBDBD] block font-bold">Starting At</span>
                    <span className="text-sm font-serif font-bold text-gold-500 block">PKR {pkg.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 text-left">
                  {/* Rating & Duration */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gold-500 font-semibold bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                      <span>{pkg.rating.toFixed(1)}</span>
                      <span className="text-[#BDBDBD] text-[10px]">({pkg.reviewsCount} reviews)</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#BDBDBD] font-medium">
                      <Clock className="w-3.5 h-3.5 text-gold-500" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-normal text-white group-hover:text-gold-500 transition duration-300">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#BDBDBD] leading-relaxed min-h-[50px]">
                      {pkg.description}
                    </p>
                  </div>

                  {/* What is Included list */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#BDBDBD] tracking-wider block">
                      VIP Privileges Included:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.included.map((item, idx) => (
                        <div key={idx} className="flex gap-1.5 items-center text-[10px] text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-6 border-t border-white/10 mt-6">
                <button
                  onClick={() => onOpenBooking(pkg.name)}
                  className="w-full py-3 bg-gold-500 hover:bg-opacity-90 text-black font-bold text-xs uppercase tracking-widest rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Book Secure Package
                  <ChevronRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
