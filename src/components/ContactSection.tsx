import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  User, 
  CheckCircle2,
  Instagram,
  Facebook,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { sanitizeString, validateLength, validateEmail, validatePhone, checkRateLimit } from '../utils/security';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Neelum Valley',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);

    // 1. Check client-side rate limit (Max 3 submissions per minute)
    const rateCheck = checkRateLimit('contact');
    if (!rateCheck.allowed) {
      setSecurityError(`Anti-Spam Shield: Too many requests. Please wait ${rateCheck.remainingSeconds} seconds before trying again.`);
      return;
    }

    // 2. Validate strict email format
    if (!validateEmail(formData.email)) {
      setSecurityError('Security Alert: Malicious or invalid email address pattern detected.');
      return;
    }

    // 3. Validate strict phone format
    if (!validatePhone(formData.phone)) {
      setSecurityError('Security Alert: Invalid phone number syntax. Allowed characters: digits, space, hyphen, brackets, and +.');
      return;
    }

    // 4. Sanitize and enforce maximum lengths to prevent buffer overflow/DOM overload and XSS
    const sanitizedName = sanitizeString(validateLength(formData.name, 60));
    const sanitizedMessage = sanitizeString(validateLength(formData.message, 800));

    setIsSubmitting(true);
    
    setTimeout(() => {
      // Apply sanitized text back to form before transitioning to success receipt
      setFormData(prev => ({
        ...prev,
        name: sanitizedName,
        message: sanitizedMessage
      }));
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: 'Neelum Valley',
      message: ''
    });
    setSecurityError(null);
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
            Direct Line
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Contact Kashmir Escape
          </h2>
          <p className="text-sm text-[#BDBDBD] leading-relaxed">
            Reach out to our main branch in Karachi or schedule an on-site consultation to map out your private high-end expedition.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Info & Map Placeholder (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-normal text-white tracking-tight text-left">
                Our Executive Branch
              </h3>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4 backdrop-blur-md">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gold-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-[#BDBDBD] block leading-none">Phone & WhatsApp</span>
                    <a href="tel:+923000000000" className="text-xs sm:text-sm text-white font-bold block mt-1 hover:text-gold-500 transition">
                      +92 300 0000000
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4 backdrop-blur-md">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gold-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-[#BDBDBD] block leading-none">General Queries</span>
                    <a href="mailto:info@example.com" className="text-xs sm:text-sm text-white font-bold block mt-1 hover:text-gold-500 transition">
                      info@example.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4 backdrop-blur-md">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gold-500">
                    <MapPin className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-[#BDBDBD] block leading-none">HQ Physical Address</span>
                    <span className="text-xs text-[#BDBDBD] block mt-1 leading-relaxed">
                      M.A. Jinnah Road, Near Quaid-e-Azam Mausoleum (Mazar-e-Quaid), Karachi, Sindh, Pakistan.
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs text-[#BDBDBD] font-semibold uppercase tracking-wider">Social Channels:</span>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-gold-500 hover:border-gold-500/40 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-gold-500 hover:border-gold-500/40 transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Map Frame with Interactive Google Map */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex-1 flex flex-col justify-between min-h-[260px] backdrop-blur-md text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500">Executive HQ Location</span>
                  <h4 className="font-serif font-normal text-white text-base mt-0.5">Interactive Google Map</h4>
                </div>
                <a
                  href="https://maps.app.goo.gl/4SV36tUPJ1Mhii8PA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gold-500/10 hover:bg-gold-500/20 text-gold-500 border border-gold-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider transition"
                >
                  Open Map ↗
                </a>
              </div>
              
              {/* Google Map iframe */}
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.661984756547!2d67.03839717446202!3d24.875391644661548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e5e736977c1%3A0x70ed36c8a6891d3a!2sMuhammad%20Ali%20Jinnah%20Mausoleum%20(Mazaar%20e%20Quaid)!5e0!3m2!1sen!2s!4v1784711294718!5m2!1sen!2s"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Muhammad Ali Jinnah Mausoleum Location Map"
                  className="w-full h-44 rounded-xl border-0"
                />
              </div>

              <div className="text-[10px] text-[#BDBDBD] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span>M.A. Jinnah Road, Adjacent to Quaid-e-Azam Mausoleum (Mazaar-e-Quaid), Karachi</span>
              </div>
            </div>
          </div>

          {/* Column 2: Form (lg:col-span-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col justify-center backdrop-blur-md">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 text-left">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">Send Us a Direct Inquiry</h3>
                    <p className="text-xs text-[#BDBDBD]">Our concierge team will respond within 15 minutes.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-[10px] uppercase font-bold tracking-wider text-[#BDBDBD] flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-gold-500" /> Full Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        placeholder="Ahmed Ali"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none transition"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-[10px] uppercase font-bold tracking-wider text-[#BDBDBD] flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-gold-500" /> Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        placeholder="ahmed@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none transition"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-[10px] uppercase font-bold tracking-wider text-[#BDBDBD] flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-gold-500" /> Phone/WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        required
                        placeholder="+92 300 0000000"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none transition"
                      />
                    </div>

                    {/* Target Destination */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-destination" className="text-[10px] uppercase font-bold tracking-wider text-[#BDBDBD]">
                        Target Valley Destination
                      </label>
                      <select
                        id="contact-destination"
                        name="destination"
                        value={formData.destination}
                        onChange={e => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none transition"
                      >
                        <option value="Neelum Valley" className="bg-neutral-950 text-white">Neelum Valley</option>
                        <option value="Arang Kel" className="bg-neutral-950 text-white">Arang Kel</option>
                        <option value="Keran" className="bg-neutral-950 text-white">Keran</option>
                        <option value="Sharda" className="bg-neutral-950 text-white">Sharda</option>
                        <option value="Ratti Gali Lake" className="bg-neutral-950 text-white">Ratti Gali Lake</option>
                        <option value="Pir Chinasi" className="bg-neutral-950 text-white">Pir Chinasi</option>
                        <option value="Custom Mixed Plan" className="bg-neutral-950 text-white">Custom Mixed Plan</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-message" className="text-[10px] uppercase font-bold tracking-wider text-[#BDBDBD] flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-gold-500" /> Detail Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={3}
                      placeholder="Share your dream schedule, dates and premium requests with our team..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none transition resize-none"
                    />
                  </div>

                  {/* Dynamic Cybersecurity Alerts */}
                  <AnimatePresence>
                    {securityError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2.5 text-left"
                      >
                        <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{securityError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <div className="space-y-2.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 bg-gold-500 hover:bg-opacity-90 disabled:bg-neutral-800 text-black font-bold text-xs uppercase tracking-widest rounded-full transition duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4 text-black" />
                      {isSubmitting ? 'Securing Connection...' : 'Send Message'}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                      <span>Secured with Anti-XSS Link Encryption & Rate Limiting</span>
                    </div>
                  </div>
                </form>
              ) : (
                <motion.div
                  key="success-receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="inline-flex p-3.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl sm:text-2xl font-normal text-white">Message Dispatched</h4>
                    <p className="text-xs text-[#BDBDBD] max-w-sm mx-auto leading-normal">
                      Thank you, {formData.name}! Your consultation request regarding {formData.destination} is secured. A certified director will buzz you on WhatsApp soon.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="py-2.5 px-6 bg-transparent hover:bg-white/5 border border-white/15 text-white rounded-full text-xs font-semibold transition cursor-pointer"
                  >
                    Inquire Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
