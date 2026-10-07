import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Phone, Mail, User, ShieldCheck, ShieldAlert, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { travelPlans, tourPackages } from '../data';
import { sanitizeString, validateLength, validateEmail, validatePhone, checkRateLimit } from '../utils/security';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItemName?: string;
  onNavigateToPlanner?: () => void;
}

export default function BookingModal({ isOpen, onClose, selectedItemName, onNavigateToPlanner }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '2',
    date: '',
    plan: '',
    transport: 'Luxury Prado (4x4)',
    specialRequests: '',
    agreeTerms: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [securityError, setSecurityError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedItemName) {
      setFormData(prev => ({ ...prev, plan: selectedItemName }));
    } else {
      setFormData(prev => ({ ...prev, plan: travelPlans[0].name }));
    }
  }, [selectedItemName, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);

    // 1. Check rate limit
    const rateCheck = checkRateLimit('booking');
    if (!rateCheck.allowed) {
      setSecurityError(`Anti-Spam Shield: Too many reservation requests. Please wait ${rateCheck.remainingSeconds} seconds.`);
      return;
    }

    // 2. Validate email
    if (!validateEmail(formData.email)) {
      setSecurityError('Security Alert: Malicious or invalid email format detected.');
      return;
    }

    // 3. Validate phone number format
    if (!validatePhone(formData.phone)) {
      setSecurityError('Security Alert: Invalid phone number pattern. Please enter a valid number.');
      return;
    }

    // 4. Sanitize strings to mitigate injections (XSS)
    const sanitizedName = sanitizeString(validateLength(formData.name, 60));
    const sanitizedRequests = sanitizeString(validateLength(formData.specialRequests, 600));

    setIsSubmitting(true);
    
    // Simulate premium booking request processing
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        name: sanitizedName,
        specialRequests: sanitizedRequests
      }));
      setIsSubmitting(false);
      setIsSuccess(true);
      setBookingReference('KE-' + Math.floor(100000 + Math.random() * 900000));
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      travelers: '2',
      date: '',
      plan: travelPlans[0].name,
      transport: 'Luxury Prado (4x4)',
      specialRequests: '',
      agreeTerms: true
    });
    setSecurityError(null);
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-2xl bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-neutral-950 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-gold-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-white">Luxury Tour Reservation</h3>
                <p className="text-xs text-[#BDBDBD]">Design your perfect high-end Kashmir experience</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="overflow-y-auto p-6 space-y-6 flex-1 no-scrollbar">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Selected Plan Banner */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                    <span className="text-xs text-[#BDBDBD]">Selected Experience:</span>
                    <span className="text-sm font-semibold text-white ml-1">{formData.plan}</span>
                  </div>
                  {onNavigateToPlanner ? (
                    <button
                      type="button"
                      onClick={onNavigateToPlanner}
                      className="text-[10px] uppercase font-bold tracking-wider text-gold-500 hover:text-white underline underline-offset-4 cursor-pointer text-left sm:text-right"
                    >
                      Use Interactive Trip Planner →
                    </button>
                  ) : (
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-gold-500/10 text-gold-500 border border-gold-500/20">
                      Premium Tier
                    </span>
                  )}
                </div>                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-name" className="text-xs font-semibold text-[#BDBDBD] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gold-500" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="booking-name"
                      name="name"
                      required
                      placeholder="Ahmed Ali"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:border-gold-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-email" className="text-xs font-semibold text-[#BDBDBD] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gold-500" /> Email Address
                    </label>
                    <input
                      type="email"
                      id="booking-email"
                      name="email"
                      required
                      placeholder="ahmed@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:border-gold-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-phone" className="text-xs font-semibold text-[#BDBDBD] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gold-500" /> WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      id="booking-phone"
                      name="phone"
                      required
                      placeholder="+92 300 0000000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:border-gold-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-date" className="text-xs font-semibold text-[#BDBDBD] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-500" /> Desired Travel Date
                    </label>
                    <input
                      type="date"
                      id="booking-date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:border-gold-500 focus:outline-none transition"
                    />
                  </div>

                  {/* Travelers */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-travelers" className="text-xs font-semibold text-[#BDBDBD] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gold-500" /> Number of Guests
                    </label>
                    <select
                      id="booking-travelers"
                      name="travelers"
                      value={formData.travelers}
                      onChange={e => setFormData({ ...formData, travelers: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:border-gold-500 focus:outline-none transition"
                    >
                      <option value="1" className="bg-neutral-950 text-white">Solo Traveler</option>
                      <option value="2" className="bg-neutral-950 text-white">Couples (2 Guests)</option>
                      <option value="4" className="bg-neutral-950 text-white">Family (3 - 5 Guests)</option>
                      <option value="8" className="bg-neutral-950 text-white">Executive Group (6+ Guests)</option>
                    </select>
                  </div>

                  {/* Transport */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-transport" className="text-xs font-semibold text-[#BDBDBD] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-500" /> Preferred Transport
                    </label>
                    <select
                      id="booking-transport"
                      name="transport"
                      value={formData.transport}
                      onChange={e => setFormData({ ...formData, transport: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:border-gold-500 focus:outline-none transition"
                    >
                      <option value="Luxury Prado (4x4)" className="bg-neutral-950 text-white">Luxury Toyota Prado (4x4)</option>
                      <option value="Land Cruiser V8" className="bg-neutral-950 text-white">Land Cruiser V8 (Premium Comfort)</option>
                      <option value="Mercedes Sprinter" className="bg-neutral-950 text-white">Mercedes Sprinter (Family Suite)</option>
                      <option value="Helicopter Transfer" className="bg-neutral-950 text-white">Helicopter Charter (Premium Request)</option>
                    </select>
                  </div>
                </div>

                {/* Tour Selector (Dropdown to override or select other) */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="booking-plan" className="text-xs font-semibold text-[#BDBDBD]">Choose Package or Custom Plan</label>
                  <select
                    id="booking-plan"
                    name="plan"
                    value={formData.plan}
                    onChange={e => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:border-gold-500 focus:outline-none transition"
                  >
                    <optgroup label="Travel Plans">
                      {travelPlans.map(plan => (
                        <option key={plan.id} value={plan.name} className="bg-neutral-950 text-white">{plan.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Tour Packages">
                      {tourPackages.map(pkg => (
                        <option key={pkg.id} value={pkg.name} className="bg-neutral-950 text-white">{pkg.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Special Requests */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="booking-special-requests" className="text-xs font-semibold text-[#BDBDBD]">Bespoke Custom Requests (Optional)</label>
                  <textarea
                    id="booking-special-requests"
                    name="specialRequests"
                    rows={2}
                    placeholder="e.g., Traditional Wazwan culinary setup, pre-arranged horse riding in Arang Kel, custom birthday surprise..."
                    value={formData.specialRequests}
                    onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:border-gold-500 focus:outline-none transition resize-none"
                  />
                </div>

                {/* Agreement */}
                <label htmlFor="booking-terms" className="flex items-start gap-2.5 cursor-pointer select-none py-1 text-left">
                  <input
                    type="checkbox"
                    id="booking-terms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-1 rounded accent-gold-500 border-white/10 bg-black text-black focus:ring-0 focus:outline-none cursor-pointer"
                  />
                  <span className="text-[11px] text-[#BDBDBD] leading-normal">
                    I agree to the luxury concierge terms & conditions. Kashmir Escape guarantees elite support, real-time safety monitoring, and secure reservations.
                  </span>
                </label>

                {/* Dynamic Cybersecurity Alerts */}
                <AnimatePresence>
                  {securityError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2.5 text-left"
                    >
                      <ShieldAlert className="w-4.5 h-4.5 text-red-500 shrink-0" />
                      <span>{securityError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button with Encryption Seal */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreeTerms}
                    className="w-full py-3.5 px-4 bg-gold-500 hover:bg-opacity-90 disabled:bg-neutral-800 disabled:text-neutral-500 text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-gold-500/10 active:scale-[0.98] cursor-pointer"
                  >
                    {isSubmitting ? 'Securing Elite Reservation...' : 'Confirm Premium Booking'}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                    <span>Secure Booking Socket Activated • Anti-Injection Protected</span>
                  </div>
                </div>
              </form>
            ) : (
              /* SuccessReceipt Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-6"
              >
                <div className="inline-flex items-center justify-center p-3 bg-gold-500/10 border border-gold-500/20 text-gold-500 rounded-full animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-2xl font-normal tracking-tight text-white">Reservation Confirmed</h4>
                  <p className="text-xs text-[#BDBDBD] max-w-md mx-auto">
                    Your luxury travel request has been logged. Our dedicated travel director will contact you via WhatsApp or Email within 15 minutes to finalize your customized itinerary.
                  </p>
                </div>

                {/* Receipt Details */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left max-w-md mx-auto space-y-4 backdrop-blur-md">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-xs text-[#BDBDBD]">Booking Reference</span>
                    <span className="text-sm font-mono font-bold text-gold-500">{bookingReference}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#BDBDBD]">Guest Name:</span>
                      <span className="font-medium text-white">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#BDBDBD]">Chosen Experience:</span>
                      <span className="font-medium text-white">{formData.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#BDBDBD]">Departure Date:</span>
                      <span className="font-medium text-white">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#BDBDBD]">Group Size:</span>
                      <span className="font-medium text-white">{formData.travelers} Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#BDBDBD]">VIP Transport:</span>
                      <span className="font-medium text-white">{formData.transport}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-gold-500" />
                    Kashmir Escape Certified Luxury Partner
                  </div>
                </div>

                {/* Close Success Buttons */}
                <div className="flex gap-3 justify-center max-w-md mx-auto pt-4">
                  <button
                    onClick={handleClose}
                    className="flex-1 py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/15 text-white rounded-full text-xs font-semibold transition cursor-pointer"
                  >
                    Close Window
                  </button>
                  <a
                    href="https://wa.me/923000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 bg-gold-500 hover:bg-opacity-90 text-black rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
