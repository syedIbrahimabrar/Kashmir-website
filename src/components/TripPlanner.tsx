import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Building2, 
  Car, 
  Utensils, 
  UserCheck, 
  Check, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Plus, 
  Minus, 
  Compass, 
  Camera, 
  Tent, 
  Flame, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ShieldAlert,
  Phone 
} from 'lucide-react';
import { sanitizeString, validateLength, checkRateLimit } from '../utils/security';

interface Activity {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  price: number;
}

const DESTINATIONS = [
  { name: 'Neelum Valley', basePrice: 15000 },
  { name: 'Arang Kel', basePrice: 18000 },
  { name: 'Keran', basePrice: 14000 },
  { name: 'Sharda', basePrice: 16000 },
  { name: 'Pir Chinasi', basePrice: 12000 },
  { name: 'Ratti Gali Lake', basePrice: 22000 },
];

const DURATIONS = [
  { label: '2 Days', days: 2, multiplier: 1.0 },
  { label: '3 Days', days: 3, multiplier: 1.4 },
  { label: '5 Days', days: 5, multiplier: 2.0 },
  { label: '7 Days', days: 7, multiplier: 2.6 },
  { label: '10 Days', days: 10, multiplier: 3.5 },
];

const HOTELS = [
  { id: 'standard', name: 'Standard ★★★', pricePerDay: 5000, description: 'Comfortable 3-star local hotels' },
  { id: 'deluxe', name: 'Deluxe ★★★★', pricePerDay: 10000, description: 'Premium 4-star boutique lodgings' },
  { id: 'luxury', name: 'Luxury ★★★★★', pricePerDay: 20000, description: 'Exclusive 5-star resorts & executive suites' },
];

const TRANSPORT_OPTIONS = [
  { id: 'car', name: 'Private Car', pricePerDay: 6000 },
  { id: 'suv', name: 'Luxury SUV', pricePerDay: 12000 },
  { id: 'coaster', name: 'Coaster', pricePerDay: 15000 },
  { id: 'none', name: 'No Transport Required', pricePerDay: 0 },
];

const MEALS_OPTIONS = [
  { id: 'breakfast', name: 'Breakfast', pricePerDay: 1000 },
  { id: 'lunch', name: 'Lunch', pricePerDay: 1500 },
  { id: 'dinner', name: 'Dinner', pricePerDay: 2000 },
  { id: 'all', name: 'All Meals Included', pricePerDay: 4000 }, // discounted full board
];

const ACTIVITIES: Activity[] = [
  { id: 'horse_riding', name: 'Horse Riding', icon: Compass, price: 3000 },
  { id: 'camping', name: 'Camping Setup', icon: Tent, price: 6000 },
  { id: 'boating', name: 'Boating', icon: Navigation, price: 2500 },
  { id: 'photography', name: 'Photography Tour', icon: Camera, price: 8000 },
  { id: 'hiking', name: 'Guided Hiking', icon: Compass, price: 1500 },
  { id: 'jeep_safari', name: '4x4 Jeep Safari', icon: Car, price: 10000 },
  { id: 'bonfire', name: 'Bonfire Night', icon: Flame, price: 4000 },
];

const PICKUP_CITIES = [
  { name: 'Islamabad', basePrice: 3000 },
  { name: 'Rawalpindi', basePrice: 3000 },
  { name: 'Lahore', basePrice: 8000 },
  { name: 'Karachi', basePrice: 15000 },
  { name: 'Peshawar', basePrice: 5000 },
  { name: 'Quetta', basePrice: 12000 },
];

export default function TripPlanner() {
  // Form State
  const [destination, setDestination] = useState('Neelum Valley');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [duration, setDuration] = useState('5 Days');
  const [hotelClass, setHotelClass] = useState('deluxe');
  
  // Transport State - multi-select but No Transport unchecks others and vice-versa
  const [selectedTransport, setSelectedTransport] = useState<string[]>(['suv']);
  
  // Meals State
  const [selectedMeals, setSelectedMeals] = useState<string[]>(['breakfast', 'dinner']);
  
  const [needGuide, setNeedGuide] = useState(true);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['jeep_safari', 'bonfire']);
  const [pickupCity, setPickupCity] = useState('Islamabad');
  const [travelDate, setTravelDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Pricing calculation
  const [pricing, setPricing] = useState({
    base: 0,
    hotel: 0,
    transport: 0,
    meals: 0,
    guide: 0,
    activities: 0,
    pickup: 0,
    total: 0,
  });

  // UI state
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [securityError, setSecurityError] = useState<string | null>(null);

  // Handle transport changes
  const handleTransportChange = (id: string) => {
    if (id === 'none') {
      setSelectedTransport(['none']);
    } else {
      let updated = selectedTransport.filter(t => t !== 'none');
      if (updated.includes(id)) {
        updated = updated.filter(t => t !== id);
      } else {
        updated.push(id);
      }
      if (updated.length === 0) {
        updated = ['none'];
      }
      setSelectedTransport(updated);
    }
  };

  // Handle meals selection helper
  const handleMealsChange = (id: string) => {
    if (id === 'all') {
      if (selectedMeals.includes('all')) {
        setSelectedMeals([]);
      } else {
        setSelectedMeals(['breakfast', 'lunch', 'dinner', 'all']);
      }
    } else {
      let updated = [...selectedMeals];
      if (updated.includes(id)) {
        // if removing a single meal and 'all' was active, deactivate 'all' too
        updated = updated.filter(m => m !== id && m !== 'all');
      } else {
        updated.push(id);
        // if all three primary meals are checked, auto-check 'all'
        const hasPrimary = ['breakfast', 'lunch', 'dinner'].every(m => updated.includes(m));
        if (hasPrimary) {
          updated.push('all');
        }
      }
      setSelectedMeals(updated);
    }
  };

  // Recalculate estimated price dynamically
  useEffect(() => {
    const totalTravelers = adults + children;
    if (totalTravelers <= 0) return;

    // 1. Destination Base
    const destObj = DESTINATIONS.find(d => d.name === destination) || DESTINATIONS[0];
    const baseCost = destObj.basePrice * totalTravelers;

    // 2. Duration Multiplier
    const durationObj = DURATIONS.find(d => d.label === duration) || DURATIONS[2];
    const days = durationObj.days;
    const durationMultiplier = durationObj.multiplier;

    // 3. Hotel Class
    const hotelObj = HOTELS.find(h => h.id === hotelClass) || HOTELS[1];
    // Hotel cost is calculated per day for the group (assuming 1 room per 2 guests)
    const roomsNeeded = Math.ceil(totalTravelers / 2);
    const hotelCost = hotelObj.pricePerDay * days * roomsNeeded;

    // 4. Transportation
    let transportCost = 0;
    selectedTransport.forEach(tId => {
      const transObj = TRANSPORT_OPTIONS.find(t => t.id === tId);
      if (transObj) {
        transportCost += transObj.pricePerDay * days;
      }
    });

    // 5. Meals (Calculated per person, per day)
    let mealsCostPerPersonPerDay = 0;
    if (selectedMeals.includes('all')) {
      mealsCostPerPersonPerDay = 4000; // discounted bundle
    } else {
      selectedMeals.forEach(mId => {
        const mealObj = MEALS_OPTIONS.find(m => m.id === mId);
        if (mealObj && mId !== 'all') {
          mealsCostPerPersonPerDay += mealObj.pricePerDay;
        }
      });
    }
    const totalMealsCost = mealsCostPerPersonPerDay * days * totalTravelers;

    // 6. Guide
    const guideCost = needGuide ? 5000 * days : 0;

    // 7. Activities (Flat rate customized choice fee)
    let activitiesCost = 0;
    selectedActivities.forEach(actId => {
      const actObj = ACTIVITIES.find(a => a.id === actId);
      if (actObj) {
        // Jeep safari and bonfire are usually group costs, camping is per traveler, others are per traveler.
        if (['bonfire', 'jeep_safari'].includes(actId)) {
          activitiesCost += actObj.price;
        } else {
          activitiesCost += actObj.price * totalTravelers;
        }
      }
    });

    // 8. Pickup Logistics
    const pickupObj = PICKUP_CITIES.find(c => c.name === pickupCity) || PICKUP_CITIES[0];
    const pickupCost = pickupObj.basePrice * totalTravelers;

    // Calculate sum applying duration multipliers where applicable
    const subtotal = (baseCost * durationMultiplier) + hotelCost + transportCost + totalMealsCost + guideCost + activitiesCost + pickupCost;
    
    setPricing({
      base: Math.round(baseCost * durationMultiplier),
      hotel: hotelCost,
      transport: transportCost,
      meals: totalMealsCost,
      guide: guideCost,
      activities: activitiesCost,
      pickup: pickupCost,
      total: Math.round(subtotal),
    });

  }, [destination, adults, children, duration, hotelClass, selectedTransport, selectedMeals, needGuide, selectedActivities, pickupCity]);

  // Set default travel date to tomorrow if blank
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTravelDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handlePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);

    // 1. Check rate limit
    const rateCheck = checkRateLimit('booking');
    if (!rateCheck.allowed) {
      setSecurityError(`Anti-Spam Shield: Too many attempts. Please wait ${rateCheck.remainingSeconds} seconds.`);
      return;
    }

    // 2. Sanitize and validate length of user entered text
    const sanitizedRequests = sanitizeString(validateLength(specialRequests, 600));
    setSpecialRequests(sanitizedRequests);

    const ref = 'KE-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setIsSuccess(true);
  };

  return (
    <section id="builder" className="py-24 bg-black relative border-t border-white/5 scroll-mt-20">
      {/* Absolute boundary constraint - strictly solid black background, no graphics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
            Interactive Co-Creator
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
            Build Your Perfect Kashmir Trip
          </h2>
          <p className="text-sm text-[#BDBDBD] leading-relaxed">
            Customize every detail of your journey and receive an estimated trip price instantly. Adjust travel coordinates, select custom lodgings, and let our interactive algorithm map your dream escape.
          </p>
        </div>

        {/* Content Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Trip Planner Form Card (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl text-left space-y-8">
            <form onSubmit={handlePlanSubmit} className="space-y-8">
              
              {/* Destination & Pickup Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="planner-destination" className="text-xs font-bold text-white uppercase tracking-wider block">
                    Choose Destination
                  </label>
                  <div className="relative">
                    <select
                      id="planner-destination"
                      name="destination"
                      value={destination}
                      onChange={e => setDestination(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none transition cursor-pointer appearance-none"
                    >
                      {DESTINATIONS.map(dest => (
                        <option key={dest.name} value={dest.name} className="bg-neutral-950 text-white">
                          {dest.name} (Base: PKR {dest.basePrice.toLocaleString()})
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gold-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="planner-pickup" className="text-xs font-bold text-white uppercase tracking-wider block">
                    Pickup City
                  </label>
                  <div className="relative">
                    <select
                      id="planner-pickup"
                      name="pickupCity"
                      value={pickupCity}
                      onChange={e => setPickupCity(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none transition cursor-pointer appearance-none"
                    >
                      {PICKUP_CITIES.map(city => (
                        <option key={city.name} value={city.name} className="bg-neutral-950 text-white">
                          {city.name} Terminal
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gold-500">
                      <Compass className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Travelers & Duration Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Number of Travelers Counter block */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    Number of Travelers
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Adults */}
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">Adults</span>
                        <span className="text-[10px] text-neutral-400">Age 12+</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-gold-500 hover:text-gold-500 transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold text-white w-4 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(prev => Math.min(20, prev + 1))}
                          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-gold-500 hover:text-gold-500 transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">Children</span>
                        <span className="text-[10px] text-neutral-400">Age 2-11</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-gold-500 hover:text-gold-500 transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold text-white w-4 text-center">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(prev => Math.min(20, prev + 1))}
                          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-gold-500 hover:text-gold-500 transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label htmlFor="planner-duration" className="text-xs font-bold text-white uppercase tracking-wider block">
                    Trip Duration
                  </label>
                  <div className="relative">
                    <select
                      id="planner-duration"
                      name="duration"
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs sm:text-sm focus:border-gold-500 focus:outline-none transition cursor-pointer appearance-none"
                    >
                      {DURATIONS.map(dur => (
                        <option key={dur.label} value={dur.label} className="bg-neutral-950 text-white">
                          {dur.label} ({dur.days} Days Venture)
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gold-500">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Category Choice Cards */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-white uppercase tracking-wider block">
                  Hotel Accommodations Class
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {HOTELS.map(hotel => {
                    const isSelected = hotelClass === hotel.id;
                    return (
                      <div
                        key={hotel.id}
                        onClick={() => setHotelClass(hotel.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left ${
                          isSelected 
                            ? 'bg-gold-500/10 border-gold-500 shadow-md shadow-gold-500/5' 
                            : 'bg-black/40 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className={`text-sm font-bold transition-colors ${isSelected ? 'text-gold-500' : 'text-white'}`}>
                            {hotel.name}
                          </h4>
                          <Building2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-gold-500' : 'text-neutral-500'}`} />
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                          {hotel.description}
                        </p>
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline gap-1">
                          <span className="text-xs text-neutral-400">Est. </span>
                          <span className="text-sm font-serif font-bold text-white">PKR {hotel.pricePerDay.toLocaleString()}</span>
                          <span className="text-[10px] text-neutral-500">/day</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transport & Meals Split Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Transportation Checkboxes */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    Private Transportation
                  </label>
                  <div className="space-y-2.5">
                    {TRANSPORT_OPTIONS.map(opt => {
                      const isChecked = selectedTransport.includes(opt.id);
                      return (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-between p-3 rounded-xl border transition duration-300 cursor-pointer ${
                            isChecked 
                              ? 'bg-gold-500/5 border-gold-500/40 text-white' 
                              : 'bg-black/20 border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleTransportChange(opt.id)}
                              className="accent-gold-500 rounded border-white/15 bg-black cursor-pointer"
                            />
                            <span className="text-xs font-bold text-white">{opt.name}</span>
                          </div>
                          {opt.pricePerDay > 0 && (
                            <span className="text-[10px] text-gold-500 font-mono">
                              +PKR {opt.pricePerDay.toLocaleString()}/day
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Catering & Meals Checkboxes */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    Catering & Meals plan
                  </label>
                  <div className="space-y-2.5">
                    {MEALS_OPTIONS.map(opt => {
                      const isChecked = selectedMeals.includes(opt.id);
                      return (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-between p-3 rounded-xl border transition duration-300 cursor-pointer ${
                            isChecked 
                              ? 'bg-gold-500/5 border-gold-500/40 text-white' 
                              : 'bg-black/20 border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleMealsChange(opt.id)}
                              className="accent-gold-500 rounded border-white/15 bg-black cursor-pointer"
                            />
                            <span className={`text-xs font-bold ${opt.id === 'all' ? 'text-gold-500' : 'text-white'}`}>
                              {opt.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {opt.id === 'all' ? 'Best Bundle Offer' : `+PKR ${opt.pricePerDay.toLocaleString()}/pax`}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Professional Tour Guide Switch Toggle */}
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-gold-500 border border-white/10">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Need a Professional Tour Guide?</span>
                    <span className="text-[11px] text-neutral-400">Highly recommended for remote valleys & historical lore (PKR 5,000/day)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setNeedGuide(!needGuide)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    needGuide ? 'bg-gold-500' : 'bg-white/10'
                  }`}
                  role="switch"
                  aria-checked={needGuide}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                      needGuide ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Adventure Activities Checkboxes */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    Choose Adventure Activities
                  </label>
                  <span className="text-[10px] text-gold-500 font-medium uppercase tracking-wider">
                    Exclusive Concierge Setups
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ACTIVITIES.map(act => {
                    const isChecked = selectedActivities.includes(act.id);
                    const IconComp = act.icon;
                    return (
                      <div
                        key={act.id}
                        onClick={() => {
                          if (isChecked) {
                            setSelectedActivities(selectedActivities.filter(a => a !== act.id));
                          } else {
                            setSelectedActivities([...selectedActivities, act.id]);
                          }
                        }}
                        className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left h-24 relative ${
                          isChecked
                            ? 'bg-gold-500/10 border-gold-500'
                            : 'bg-black/40 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className={`p-1 rounded bg-black/60 border ${isChecked ? 'border-gold-500/40 text-gold-500' : 'border-white/10 text-neutral-500'}`}>
                            <IconComp className="w-3.5 h-3.5" />
                          </span>
                          {isChecked && (
                            <span className="p-0.5 rounded-full bg-gold-500 text-black">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block truncate">{act.name}</span>
                          <span className="text-[9px] text-neutral-400 block mt-0.5 font-mono">
                            +PKR {act.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dates & Specific Notes Area */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Travel Date */}
                <div className="space-y-2">
                  <label htmlFor="planner-date" className="text-xs font-bold text-white uppercase tracking-wider block">
                    Target Departure Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="planner-date"
                      name="travelDate"
                      required
                      value={travelDate}
                      onChange={e => setTravelDate(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs focus:border-gold-500 focus:outline-none transition cursor-pointer"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="planner-special-requests" className="text-xs font-bold text-white uppercase tracking-wider block">
                    Special Requests & Custom Instructions
                  </label>
                  <input
                    type="text"
                    id="planner-special-requests"
                    name="specialRequests"
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="Tell us anything special about your trip (dietary options, photography gears)..."
                    className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white text-xs focus:border-gold-500 focus:outline-none transition placeholder-neutral-600"
                  />
                </div>
              </div>

            </form>
          </div>

          {/* Column 2: Price Summary Card (lg:col-span-4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl text-left relative overflow-hidden flex flex-col justify-between">
              
              {/* Gold header outline */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
              
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <span className="text-xs uppercase tracking-widest text-gold-500 font-bold">Estimated Summary</span>
                </div>

                <div className="space-y-4">
                  {/* Estimated Price big visual */}
                  <div className="pb-5 border-b border-white/10">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold">Estimated Investment</span>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                        PKR {pricing.total.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] text-gold-500/80 block mt-1">
                      Includes luxury base + all custom modules
                    </span>
                  </div>

                  {/* Fact breakdown */}
                  <div className="space-y-3 text-xs border-b border-white/10 pb-5">
                    
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Destination:</span>
                      <span className="font-bold text-white">{destination}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Hotel Type:</span>
                      <span className="font-bold text-white uppercase text-[10px] tracking-wider text-gold-500">
                        {hotelClass === 'standard' ? 'Standard ★★★' : hotelClass === 'deluxe' ? 'Deluxe ★★★★' : 'Luxury ★★★★★'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Duration:</span>
                      <span className="font-bold text-white">{duration}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Travelers:</span>
                      <span className="font-bold text-white">{adults} Adults {children > 0 ? `+ ${children} Children` : ''}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Transportation:</span>
                      <span className="font-bold text-white truncate max-w-[150px]">
                        {selectedTransport.includes('none') 
                          ? 'Not Required' 
                          : selectedTransport.map(t => TRANSPORT_OPTIONS.find(o => o.id === t)?.name).filter(Boolean).join(', ')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Meals:</span>
                      <span className="font-bold text-white">
                        {selectedMeals.includes('all') 
                          ? 'All Meals (Discounted)' 
                          : selectedMeals.length > 0 
                            ? `${selectedMeals.length} Meals Checked` 
                            : 'No Meals'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Guide Service:</span>
                      <span className="font-bold text-white">{needGuide ? 'Certified Escort' : 'Self Guided'}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Pickup Logistics:</span>
                      <span className="font-bold text-white">{pickupCity} Terminal</span>
                    </div>

                  </div>

                  {/* Pricing Detailed breakdowns */}
                  <div className="space-y-2 text-[11px] text-neutral-400">
                    <div className="flex justify-between">
                      <span>Expedition Base:</span>
                      <span className="font-mono">PKR {pricing.base.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hotel Accommodation:</span>
                      <span className="font-mono">PKR {pricing.hotel.toLocaleString()}</span>
                    </div>
                    {pricing.transport > 0 && (
                      <div className="flex justify-between">
                        <span>Vehicle Fleet Logistics:</span>
                        <span className="font-mono">PKR {pricing.transport.toLocaleString()}</span>
                      </div>
                    )}
                    {pricing.meals > 0 && (
                      <div className="flex justify-between">
                        <span>Catering Plan:</span>
                        <span className="font-mono">PKR {pricing.meals.toLocaleString()}</span>
                      </div>
                    )}
                    {pricing.activities > 0 && (
                      <div className="flex justify-between">
                        <span>Adventure Modules:</span>
                        <span className="font-mono">PKR {pricing.activities.toLocaleString()}</span>
                      </div>
                    )}
                    {pricing.guide > 0 && (
                      <div className="flex justify-between">
                        <span>VIP Dedicated Escort:</span>
                        <span className="font-mono">PKR {pricing.guide.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-white/5 font-bold text-white">
                      <span>Estimated Total:</span>
                      <span className="font-mono text-gold-500">PKR {pricing.total.toLocaleString()}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 space-y-3">
                {/* Dynamic Cybersecurity Alerts */}
                <AnimatePresence>
                  {securityError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2 text-left"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{securityError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handlePlanSubmit}
                  className="w-full py-3.5 px-4 bg-gold-500 hover:bg-opacity-90 text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-gold-500/10 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Compass className="w-4 h-4 text-black" />
                  Plan My Trip
                </button>
                <a
                  href="https://wa.me/923000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-transparent hover:bg-white/5 text-white border border-white/15 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  Contact Travel Expert
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                  <span>Secure Session Sandbox Active • Anti-Spam Protected</span>
                </div>
              </div>

            </div>

            {/* Quick trust seal */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-left">
              <ShieldCheck className="w-8 h-8 text-gold-500/40 shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white">Instant Estimated Calculations</h5>
                <p className="text-[10px] text-neutral-400 mt-0.5">Calculated based on standard season parameters and physical partner lists.</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Modern custom modal overlay indicating success for client side demo */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Co-Creator Blueprint Generated</span>
                <h3 className="font-serif text-2xl font-normal text-white">Custom Trip Plan Saved</h3>
                <p className="text-xs text-[#BDBDBD] max-w-sm mx-auto leading-relaxed">
                  Thank you! Your custom Kashmir trip has been saved as a travel blueprint quote. We have logged your tailored estimates and departure metrics.
                </p>
              </div>

              {/* Receipt details */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span className="text-neutral-400">Blueprint Reference:</span>
                  <span className="font-mono font-bold text-gold-500">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Target Destination:</span>
                  <span className="font-semibold text-white">{destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Total Days:</span>
                  <span className="font-semibold text-white">{duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Group Size:</span>
                  <span className="font-semibold text-white">{adults} Adults {children > 0 ? `, ${children} Kids` : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Accommodations:</span>
                  <span className="font-semibold text-white uppercase text-[10px] tracking-wider text-gold-500">
                    {hotelClass === 'standard' ? 'Standard ★★★' : hotelClass === 'deluxe' ? 'Deluxe ★★★★' : 'Luxury ★★★★★'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/5 text-sm">
                  <span className="font-bold text-white">Estimated Total Quote:</span>
                  <span className="font-bold font-mono text-gold-500">PKR {pricing.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="flex-1 py-3 px-4 bg-transparent hover:bg-white/5 border border-white/15 text-white rounded-full text-xs font-semibold uppercase tracking-widest transition cursor-pointer"
                >
                  Revise Blueprint
                </button>
                <a
                  href={`https://wa.me/923000000000?text=Hi%20Kashmir%20Escape!%20I%20just%20designed%20a%20custom%20Kashmir%20Trip%20on%20your%20website.%20Reference%3A%20${bookingRef}%20for%20${destination}%20(${duration})%20for%20PKR%20${pricing.total.toLocaleString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-gold-500 hover:bg-opacity-90 text-black rounded-full text-xs font-bold uppercase tracking-widest transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Discuss on WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
