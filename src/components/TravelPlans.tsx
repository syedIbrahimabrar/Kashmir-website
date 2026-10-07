import { motion } from 'motion/react';
import { Check, Shield, Award, Sparkles, Building2, Car, ChefHat, UserCheck } from 'lucide-react';
import { travelPlans } from '../data';

interface TravelPlansProps {
  onOpenBooking: (itemName?: string) => void;
}

export default function TravelPlans({ onOpenBooking }: TravelPlansProps) {
  return (
    <section id="plans" className="py-24 bg-black relative border-t border-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
            Tailored Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Plans for Your Kashmir Trip
          </h2>
          <p className="text-sm text-[#BDBDBD] leading-relaxed">
            Select the perfect duration to match your rhythm. Whether a weekend quick flight or a 10-day ultimate deep retreat, your travel style is fully accommodated.
          </p>
        </div>

        {/* Pricing/Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch">
          {travelPlans.map((plan, i) => {
            // Highlight the 7 Days Premium Escape as most popular
            const isPopular = plan.id === 'plan-7-days';
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex flex-col justify-between bg-white/5 border rounded-2xl p-6 backdrop-blur-md transition duration-300 ${
                  isPopular
                    ? 'border-gold-500 shadow-xl shadow-gold-500/5'
                    : 'border-white/10 hover:border-gold-500/40'
                }`}
              >
                {/* Popular Ribbon Accent */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 py-1 px-3 bg-gold-500 text-black text-[9px] uppercase font-bold tracking-widest rounded-full flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 fill-black" />
                    Recommended Choice
                  </div>
                )}

                {/* Card Top */}
                <div className="space-y-6">
                  {/* Title and Duration */}
                  <div className="text-left">
                    <h3 className="font-serif text-xl font-normal text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <span className="text-xs text-[#BDBDBD] mt-1 block font-medium">
                      {plan.duration}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-white/10 text-left">
                    <span className="text-[10px] text-[#BDBDBD] block uppercase tracking-wider font-semibold">
                      Starting Investment
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-serif font-bold text-white">
                        PKR {plan.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#BDBDBD]">/ traveler</span>
                    </div>
                  </div>

                  {/* Curated Luxury Standard Fields */}
                  <div className="space-y-3 pt-2 text-left">
                    {/* Hotel */}
                    <div className="flex gap-2.5 items-start">
                      <Building2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#BDBDBD] block leading-none">Hotel Accommodation</span>
                        <span className="text-xs text-white block mt-0.5 leading-tight">{plan.hotel}</span>
                      </div>
                    </div>

                    {/* Transport */}
                    <div className="flex gap-2.5 items-start">
                      <Car className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#BDBDBD] block leading-none">Private Transport</span>
                        <span className="text-xs text-white block mt-0.5 leading-tight">{plan.transport}</span>
                      </div>
                    </div>

                    {/* Meals */}
                    <div className="flex gap-2.5 items-start">
                      <ChefHat className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#BDBDBD] block leading-none">Catering & Meals</span>
                        <span className="text-xs text-white block mt-0.5 leading-tight">{plan.meals}</span>
                      </div>
                    </div>

                    {/* Guide */}
                    <div className="flex gap-2.5 items-start">
                      <UserCheck className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#BDBDBD] block leading-none">Dedicated Service</span>
                        <span className="text-xs text-white block mt-0.5 leading-tight">{plan.guide}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points list of features */}
                  <div className="pt-4 border-t border-white/10 space-y-2 text-left">
                    <span className="text-[10px] uppercase font-bold text-[#BDBDBD] tracking-wider block">
                      Tour Highlights
                    </span>
                    <ul className="space-y-2">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-xs text-[#BDBDBD]">
                          <Check className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                          <span className="leading-normal">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button
                    onClick={() => onOpenBooking(plan.name)}
                    className={`w-full py-3 px-4 font-bold text-xs uppercase tracking-widest rounded-full transition duration-300 cursor-pointer active:scale-[0.98] ${
                      isPopular
                        ? 'bg-gold-500 hover:bg-opacity-90 text-black'
                        : 'bg-transparent hover:bg-white/5 text-white border border-white/15 hover:border-white/30'
                    }`}
                  >
                    Book This Plan
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Safety Badges banner */}
        <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <Shield className="w-10 h-10 text-gold-500/40 shrink-0" />
            <div>
              <h4 className="font-serif font-normal text-white text-base">Secure Booking System</h4>
              <p className="text-xs text-[#BDBDBD] mt-0.5">Flexible cancellation and reliable local booking guarantees.</p>
            </div>
          </div>
          <div className="h-[1px] w-full md:w-[1px] md:h-10 bg-white/10" />
          <div className="flex items-center gap-3.5">
            <Award className="w-10 h-10 text-gold-500/40 shrink-0" />
            <div>
              <h4 className="font-serif font-normal text-white text-base">Luxury Escapes Verified</h4>
              <p className="text-xs text-[#BDBDBD] mt-0.5">Only direct five-star partners are listed on our tour programs.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
