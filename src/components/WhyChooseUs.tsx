import { motion } from 'motion/react';
import { 
  Building2, 
  Car, 
  Compass, 
  ShieldCheck, 
  Headphones, 
  Sparkles, 
  Map, 
  Heart 
} from 'lucide-react';
import { whyChooseUs } from '../data';

export default function WhyChooseUs() {
  // Map index to respective lucide-react icons for luxury aesthetics
  const icons = [
    Building2,
    Car,
    Compass,
    ShieldCheck,
    Headphones,
    Sparkles,
    Map,
    Heart
  ];

  return (
    <section id="standards" className="py-24 bg-black border-t border-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
            Our Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Why Choose Kashmir Escape
          </h2>
          <p className="text-sm text-[#BDBDBD] leading-relaxed">
            We don’t just coordinate trips; we build meticulously crafted, highly secured experiences. Discover the distinct benchmarks of our elite travel concierge.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((benefit, i) => {
            const IconComponent = icons[i] || Sparkles;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between group hover:border-gold-500/50 transition duration-300 text-left backdrop-blur-md"
              >
                <div className="space-y-4">
                  {/* Icon Container */}
                  <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-gold-500 group-hover:bg-gold-500/10 group-hover:border-gold-500/35 transition duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title and description */}
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-normal text-white text-base group-hover:text-gold-500 transition duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-[#BDBDBD] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Subtle bottom indicator */}
                <div className="h-px w-0 bg-gold-500/30 group-hover:w-full transition-all duration-500 mt-6" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
