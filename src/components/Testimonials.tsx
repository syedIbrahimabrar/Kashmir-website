import { motion } from 'motion/react';
import { Star, Quote, ShieldAlert } from 'lucide-react';
import { testimonials } from '../data';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-black border-t border-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
            Verified Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Customer Testimonials
          </h2>
          <p className="text-sm text-[#BDBDBD] leading-relaxed">
            Hear from corporate directors, travel photographers, and luxury enthusiasts who have completed their premium Kashmir journeys with our specialized team.
          </p>
        </div>

        {/* Bento Grid layout for reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl relative flex flex-col justify-between hover:border-gold-500/50 transition group backdrop-blur-md"
            >
              {/* Quote icon accent */}
              <Quote className="w-10 h-10 text-gold-500/10 group-hover:text-gold-500/20 absolute top-6 right-8 transition" />

              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#BDBDBD] leading-relaxed italic text-left">
                  "{test.review}"
                </p>
              </div>

              {/* Guest Profile Details */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10 text-left">
                <img
                  src={test.image}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200';
                  }}
                  className="w-12 h-12 rounded-full object-cover border border-white/15"
                />
                <div>
                  <h4 className="font-serif font-normal text-white text-base group-hover:text-gold-500 transition">
                    {test.name}
                  </h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#BDBDBD]">
                    {test.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote Trust badge */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-neutral-500">
          <ShieldAlert className="w-4 h-4 text-gold-500" />
          <span>All reviews are verified via luxury traveler post-trip surveys and signed digital agreements.</span>
        </div>

      </div>
    </section>
  );
}
