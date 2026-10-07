import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import { faqs } from '../data';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-24 bg-black border-t border-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
            Clear Counsel
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#BDBDBD] leading-relaxed">
            Everything you need to know about preparing for your luxury tour, customized itineraries, booking protocols, and high-altitude safety guidelines.
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition hover:border-gold-500/30 backdrop-blur-md"
              >
                {/* Accordion Trigger Head */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-gold-500' : 'text-neutral-500'}`} />
                    <span className={`font-serif font-normal text-sm sm:text-base leading-snug transition-colors ${isOpen ? 'text-gold-500' : 'text-white'}`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  <span className={`p-1 rounded-lg border transition ${
                    isOpen ? 'border-gold-500 bg-gold-500/10 text-gold-500' : 'border-white/10 text-neutral-400'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Accordion Content Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-white/10 text-left">
                        <p className="text-xs sm:text-sm text-[#BDBDBD] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary prompt banner */}
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left backdrop-blur-md">
          <div className="space-y-1">
            <h4 className="font-serif font-normal text-white text-base">Have secondary custom inquiries?</h4>
            <p className="text-xs text-[#BDBDBD]">Our concierge director is standing by on WhatsApp to answer detailed packing or vehicle queries.</p>
          </div>
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gold-500 hover:bg-opacity-90 text-black text-xs font-bold uppercase tracking-widest rounded-full transition inline-flex items-center gap-1.5 cursor-pointer"
          >
            Live Concierge Chat <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
