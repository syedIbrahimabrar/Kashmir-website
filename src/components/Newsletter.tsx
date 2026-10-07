import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, ShieldCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { validateEmail, checkRateLimit } from '../utils/security';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSecurityError(null);

    // 1. Check rate limits to prevent spam
    const rateCheck = checkRateLimit('newsletter');
    if (!rateCheck.allowed) {
      setSecurityError(`Spam Prevention: Please wait ${rateCheck.remainingSeconds} seconds.`);
      return;
    }

    // 2. Validate email structure
    if (!validateEmail(email)) {
      setSecurityError('Security Warning: Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
    }, 1200);
  };

  return (
    <section className="py-20 bg-black border-t border-neutral-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 bg-white/5 border border-white/10 rounded-3xl text-center relative overflow-hidden backdrop-blur-md"
        >
          {/* Subtle design framework border accents (no decorative graphic files) */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500 block">
                    Exclusive Dispatches
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-white">
                    Get Travel Inspiration Delivered Weekly
                  </h3>
                  <p className="text-xs sm:text-sm text-[#BDBDBD] max-w-xl mx-auto leading-relaxed">
                    Subscribe to receive bespoke mountain travel guides, private tour offers, and luxury resort updates directly in your inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-2 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1 text-left">
                      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                      <input
                        type="email"
                        id="newsletter-email"
                        name="email"
                        required
                        placeholder="Enter your premium email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none transition placeholder-neutral-600"
                      />
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 px-8 bg-gold-500 hover:bg-opacity-90 disabled:bg-neutral-800 text-black font-bold text-xs uppercase tracking-widest rounded-full transition duration-300 active:scale-[0.98] shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isSubmitting ? 'Verifying...' : 'Subscribe'}
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </button>
                  </div>

                  {/* Dynamic Cybersecurity Alerts */}
                  <AnimatePresence>
                    {securityError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-2.5 bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2 text-left"
                      >
                        <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{securityError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="text-[10px] text-[#BDBDBD] flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                    Secure Sandbox • We respect your privacy.
                  </span>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 space-y-4"
              >
                <div className="inline-flex p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-white">Inspiration Standard Logged</h4>
                  <p className="text-xs sm:text-sm text-[#BDBDBD] max-w-sm mx-auto">
                    Thank you for subscribing! Your address is now added to the Kashmir Escape private mailing list. Prepare for elite weekly journals.
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 bg-transparent hover:bg-white/5 border border-white/15 text-white text-[10px] uppercase font-bold tracking-widest rounded-full cursor-pointer transition"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
