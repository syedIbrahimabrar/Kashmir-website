import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripPlanner from './components/TripPlanner';
import Destinations from './components/Destinations';
import FeaturedPackages from './components/FeaturedPackages';
import TravelPlans from './components/TravelPlans';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import Newsletter from './components/Newsletter';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState<string | undefined>(undefined);

  const handleOpenBooking = (itemName?: string) => {
    if (!itemName) {
      // If book is pressed without a specific item, take the customer directly to the planner
      handleNavigate('builder');
    } else {
      setSelectedBookingItem(itemName);
      setIsBookingOpen(true);
    }
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scrolling slightly to account for the sticky navigation header
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Setup active section highlighting based on scroll coordinates
  useEffect(() => {
    const sections = ['home', 'builder', 'packages', 'plans', 'destinations', 'about', 'gallery', 'blog', 'faqs', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 130; // Include navbar height offset
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          // Calculate absolute offset top of element relative to page
          let absoluteOffsetTop = 0;
          let tempEl: HTMLElement | null = el;
          while (tempEl) {
            absoluteOffsetTop += tempEl.offsetTop;
            tempEl = tempEl.offsetParent as HTMLElement | null;
          }
          
          const height = el.offsetHeight;
          if (scrollPosition >= absoluteOffsetTop && scrollPosition < absoluteOffsetTop + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white select-none selection:bg-gold-500 selection:text-black">
      
      {/* Sticky Premium Navbar */}
      <Navbar 
        onOpenBooking={handleOpenBooking} 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />

      {/* Main Sections */}
      <main className="relative">
        <Hero 
          onOpenBooking={handleOpenBooking} 
          onNavigate={handleNavigate} 
        />

        {/* Customer Interactive Trip Planner */}
        <TripPlanner />
        
        {/* Featured Tour Packages placed directly below the Planner */}
        <FeaturedPackages 
          onOpenBooking={handleOpenBooking} 
        />
        
        {/* Tailored Travel Plans placed below Packages */}
        <TravelPlans 
          onOpenBooking={handleOpenBooking} 
        />
        
        {/* Destinations */}
        <Destinations 
          onOpenBooking={handleOpenBooking} 
        />
        
        <WhyChooseUs />
        
        <Gallery />
        
        <Blog />
        
        <Testimonials />
        
        <FAQSection />
        
        <Newsletter />
        
        <ContactSection />
      </main>

      {/* Footer Column Matrix */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenBooking={() => handleOpenBooking()} 
      />

      {/* Interactive Reservation modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        selectedItemName={selectedBookingItem} 
        onNavigateToPlanner={() => {
          setIsBookingOpen(false);
          handleNavigate('builder');
        }}
      />

    </div>
  );
}
