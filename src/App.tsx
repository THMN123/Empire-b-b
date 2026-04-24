import { motion } from 'motion/react';
import { Instagram, Facebook, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

// --- Components ---

const RotatingImage = ({ images, interval = 4000, className = "", alt = "Empire Breakfast & Bed" }: { images: string[], interval?: number, className?: string, alt?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`} role="region" aria-label="Image Carousel">
      {images.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0 w-full h-full"
          initial={i === 0 ? { opacity: 1 } : { opacity: 0 }}
          animate={{ 
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 1.08,
            zIndex: i === index ? 2 : 1
          }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden={i !== index}
        >
          <img 
            src={src} 
            alt={`${alt} - View ${i + 1}`} 
            className="w-full h-full object-cover" 
            loading={i === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full px-4 py-2 md:px-8 transition-all duration-300 z-[100] ${scrolled ? 'bg-white shadow-md md:py-4' : 'bg-transparent md:py-6'}`}>
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-10 md:h-10 border-2 border-gold rounded-full flex items-center justify-center overflow-hidden bg-white shrink-0">
            <img src="/assets/492137544_1183714880113672_6899017816317927689_n.jpg" alt="Empire B&B Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <span className={`text-sm md:text-xl font-bold tracking-tighter uppercase whitespace-nowrap transition-colors ${scrolled ? 'text-charcoal' : 'text-charcoal md:text-white'}`}>
            Empire <span className="font-light text-gold">B&B</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <a href="#stay" className={`nav-link ${scrolled ? 'text-charcoal' : 'text-white'} hover:text-gold`}>Stay</a>
          <a href="#rooms" className={`nav-link ${scrolled ? 'text-charcoal' : 'text-white'} hover:text-gold`}>Rooms</a>
          <a href="#experience" className={`nav-link ${scrolled ? 'text-charcoal' : 'text-white'} hover:text-gold`}>Experience</a>
          <a href="#events" className={`nav-link ${scrolled ? 'text-charcoal' : 'text-white'} hover:text-gold`}>Events</a>
          <a href="#contact" className={`nav-link ${scrolled ? 'text-charcoal' : 'text-white'} hover:text-gold`}>Contact</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-charcoal p-2 border border-stone/30 bg-white shadow-sm flex items-center justify-center rounded-sm"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-white z-[90] flex flex-col p-8 pt-24 gap-6 md:hidden overflow-y-auto"
        >
          <a href="#stay" onClick={() => setIsOpen(false)} className="text-2xl font-serif italic text-charcoal pb-4 border-b border-stone/10">Stay</a>
          <a href="#rooms" onClick={() => setIsOpen(false)} className="text-2xl font-serif italic text-charcoal pb-4 border-b border-stone/10">Rooms</a>
          <a href="#experience" onClick={() => setIsOpen(false)} className="text-2xl font-serif italic text-charcoal pb-4 border-b border-stone/10">Experience</a>
          <a href="#events" onClick={() => setIsOpen(false)} className="text-2xl font-serif italic text-charcoal pb-4 border-b border-stone/10">Events</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-2xl font-serif italic text-charcoal pb-4 border-b border-stone/10">Contact</a>
          <a href="https://wa.me/26657174242" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="artistic-button w-full text-center py-4 block mt-auto">Book Now</a>
        </motion.div>
      )}
    </header>
  );
};

const Rooms = () => (
  <section id="rooms" className="section-padding bg-ivory">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="relative group">
            <div className="absolute -inset-4 border border-gold/20 -z-10 translate-x-4 translate-y-4"></div>
            <div className="aspect-[4/3] overflow-hidden shadow-2xl">
              <img 
                src="/assets/488185688_1169712728180554_7602020998451194843_n.jpg" 
                alt="Executive Suite" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute top-8 right-8 bg-gold text-white px-6 py-3 font-bold uppercase text-[10px] tracking-widest shadow-xl">
              Featured Suite
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-4">The Collection</p>
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">Rooms That Perfectly Reflect the Photos.</h2>
          </div>
          <p className="text-charcoal/70 leading-relaxed italic border-l-2 border-stone pl-6 py-2">
            Experience complete cohesion between visual vision and physical reality. Desk, wardrobe, bed—every detail is curated for the executive traveler.
          </p>
          <div className="grid grid-cols-2 gap-6">
             <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-charcoal/80">
               <div className="w-2 h-2 rounded-full bg-gold"></div> Executive Desk
             </div>
             <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-charcoal/80">
               <div className="w-2 h-2 rounded-full bg-gold"></div> Fiber Internet
             </div>
             <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-charcoal/80">
               <div className="w-2 h-2 rounded-full bg-gold"></div> Yellow Accents
             </div>
             <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-charcoal/80">
               <div className="w-2 h-2 rounded-full bg-gold"></div> En-suite Bath
             </div>
          </div>
          <a href="https://wa.me/26657174242" target="_blank" rel="noopener noreferrer" className="artistic-button w-full text-center">
            Secure Yours Now
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Hero = () => (
  <section id="stay" className="relative min-h-[90vh] lg:h-screen bg-ivory overflow-hidden border-b border-stone flex flex-col">
    <div className="relative h-full flex-grow flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full lg:w-[60%] bg-stone overflow-hidden shadow-inner z-0">
        <RotatingImage 
          images={[
            "/assets/492137544_1183714880113672_6899017816317927689_n.jpg",
            "/assets/492521021_1183714886780338_7953381629873555991_n.jpg",
            "/assets/582920969_1347482227070269_1785294081989925271_n.jpg"
          ]}
          className="w-full h-full"
          interval={5000}
          alt="Empire Property Exterior"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 z-10 lg:hidden">
          <p className="text-white text-[10px] uppercase tracking-[0.3em] font-medium opacity-90">
            Traditional Basotho Heritage meets Modernity
          </p>
        </div>
      </div>
      
      {/* Overlay Content */}
      <div className="relative container mx-auto px-6 pt-32 lg:pt-0 z-20 flex flex-col lg:flex-row items-center justify-end w-full lg:h-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/95 backdrop-blur-sm lg:bg-white p-8 lg:p-16 shadow-2xl lg:shadow-none lg:w-[50%] lg:ml-auto border border-stone/20 lg:border-none"
        >
          <p className="hidden lg:block text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Established Luxury</p>
          <h1 className="text-4xl sm:text-5xl lg:text-[80px] font-serif italic leading-tight mb-8 tracking-tight text-charcoal">
            Meticulous Comfort.<br/>
            <span className="not-italic text-gold">Unrivaled Hospitality.</span>
          </h1>
          <p className="text-charcoal/60 leading-relaxed mb-10 text-sm md:text-base max-w-md italic">
            Experience the gold standard of stays in Leribe. Minutes from the border, miles from the ordinary.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a href="https://wa.me/26657174242" target="_blank" rel="noopener noreferrer" className="artistic-button py-4 px-12 text-center w-full sm:w-auto">
              Book via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Decorative Elements (Desktop Only) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.2 }}
        className="absolute top-[15%] left-[55%] w-32 h-32 border border-gold/30 rounded-full z-10 hidden xl:block pointer-events-none"
      />
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="section-padding bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-4 space-y-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold mb-3">The Experience</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight">Curated Luxury <br/>in Leribe</h2>
          </div>
          <p className="text-charcoal/70 leading-relaxed italic border-l-2 border-stone pl-6 py-2">
            "Just minutes from the Ficksburg Border, Empire offers a sanctuary of peace and executive-level hospitality."
          </p>
          
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-5 bg-ivory p-6 border border-stone/50 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-stone overflow-hidden flex-shrink-0 border-2 border-gold shadow-md">
                <img src="/assets/492521021_1183714886780338_7953381629873555991_n.jpg" alt="Your Host at Empire" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold mb-1">A Warm Empire Welcome</p>
                <p className="text-[11px] text-charcoal/60">Our team is dedicated to your comfort 24/7.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             <div className="aspect-[3/4] bg-stone relative group overflow-hidden shadow-lg">
                <img src="/assets/480693594_1140200917798402_1399270993489674435_n.jpg" alt="Crisp Linens" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-[9px] uppercase font-bold text-white tracking-[0.2em]">Crisp Linens</p>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="aspect-[3/4] bg-stone relative group overflow-hidden shadow-lg translate-y-8">
                <img src="/assets/480507950_1140667307751763_8503116553220892313_n.jpg" alt="Luxury Amenities" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-[9px] uppercase font-bold text-white tracking-[0.2em]">Luxury Amenities</p>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="aspect-[3/4] bg-stone relative group overflow-hidden shadow-lg col-span-2 md:col-span-1">
                <img src="/assets/500084137_1208702394281587_3235144849188990099_n.jpg" alt="Executive Suites" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-[9px] uppercase font-bold text-white tracking-[0.2em]">Executive Suites</p>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="aspect-[4/3] bg-stone relative group overflow-hidden shadow-lg col-span-2">
                <img src="/assets/481301294_1144677297350764_2370493548641421636_n.jpg" alt="Modern Interiors" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-[9px] uppercase font-bold text-white tracking-[0.2em]">Modern Interiors</p>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="aspect-square bg-stone relative group overflow-hidden shadow-lg translate-y-[-2rem]">
                <img src="/assets/582920969_1347482227070269_1785294081989925271_n.jpg" alt="Basotho Decor" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-[9px] uppercase font-bold text-white tracking-[0.2em]">Basotho Decor</p>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const EventsCommunity = () => (
  <section id="events" className="section-padding bg-paper">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">
      <div className="flex-1 space-y-12">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal relative z-10 leading-tight">Executive Events & <br/><span className="text-gold italic">Local Soul</span></h2>
          <div className="absolute -bottom-2 -left-4 -right-4 h-6 bg-stone/30 -z-0"></div>
        </div>
        <p className="text-charcoal/70 leading-relaxed max-w-md">
          From corporate summits with gold-themed dining to serving as a pillar for Leribe's community. Our spaces are curated to inspire both high-end productivity and genuine connection.
        </p>
        <div className="flex gap-8">
           <div className="text-center">
             <span className="block text-3xl font-serif text-gold">100+</span>
             <span className="text-[9px] uppercase tracking-widest font-bold opacity-50">Event Guests</span>
           </div>
           <div className="w-px h-12 bg-stone"></div>
           <div className="text-center">
             <span className="block text-3xl font-serif text-gold">500+</span>
             <span className="text-[9px] uppercase tracking-widest font-bold opacity-50">Local Ties</span>
           </div>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="aspect-[3/4] bg-stone overflow-hidden shadow-2xl">
           <img src="/assets/540709913_1286618316489994_6741686787667876973_n.jpg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
        </div>
        <div className="aspect-[3/4] bg-stone overflow-hidden shadow-2xl mt-12">
           <img src="/assets/481901385_1144694584015702_7168904359696943188_n.jpg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
        </div>
      </div>
    </div>
  </section>
);

const FooterBooking = () => {
  return (
    <footer id="contact" className="relative bg-neutral-900 text-white overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10">
        {/* Left: Info Grid */}
        <div className="flex flex-col md:flex-row items-center gap-10 w-full lg:w-auto">
           <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30">
              <img src="/assets/492137544_1183714880113672_6899017816317927689_n.jpg" alt="Logo" className="w-full h-full object-cover" />
           </div>
           <div className="space-y-1 text-center md:text-left">
             <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Location & Hours</p>
             <p className="text-[11px] font-medium leading-relaxed">St. Monica’s, near the T-junction goes to mission, Leribe, Lesotho</p>
             <p className="text-[10px] text-gold/60 italic font-serif leading-relaxed">Always Open • 5 mins from Ficksburg Border</p>
           </div>
           <div className="hidden md:block w-px h-12 bg-neutral-800"></div>
           <div className="space-y-1 text-center md:text-left">
             <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Contact</p>
             <p className="text-[11px] font-medium leading-relaxed uppercase">+266 5717 4242 (WA) • 6217 4242</p>
             <a href="mailto:empirelesotho@gmail.com" className="text-[10px] text-gold hover:underline transition-all underline-offset-4 block">empirelesotho@gmail.com</a>
           </div>
        </div>
        
        {/* Center: Brand Quote */}
        <div className="flex flex-col items-center text-center max-w-sm">
           <p className="text-[12px] italic font-serif text-white/50 mb-2 leading-relaxed">
             "Rooms That Perfectly Reflect the Photos"
           </p>
           <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Messenger: Empire Bed & Breakfast</p>
           <div className="w-12 h-[1px] bg-gold/40 mt-2"></div>
        </div>

        {/* Right: Modern Booking Bar */}
        <div id="booking" className="w-full lg:w-auto">
          <div className="flex flex-col sm:flex-row bg-neutral-800 p-1.5 rounded-none sm:rounded-full border border-neutral-700 shadow-2xl items-center lg:min-w-[400px]">
            <div className="flex-1 px-6 py-3 w-full border-b sm:border-b-0 sm:border-r border-neutral-700">
              <p className="text-[9px] uppercase font-black text-neutral-500 tracking-[0.2em] mb-1">Book Your Stay</p>
              <p className="bg-transparent text-white text-[11px] font-bold">Direct Messaging</p>
            </div>
            <a href="https://wa.me/26657174242" target="_blank" rel="noopener noreferrer" className="bg-gold hover:brightness-110 active:scale-95 px-8 sm:px-12 py-4 sm:py-3.5 rounded-none sm:rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all w-full sm:w-auto text-charcoal text-center">
              Chat Now
            </a>
          </div>
        </div>
      </div>
      
      {/* Sub-Footer */}
      <div className="border-t border-neutral-800 p-6 flex flex-col sm:flex-row justify-between items-center bg-black/20 gap-4">
         <div className="flex items-center gap-6">
            <a href="https://wa.me/26657174242" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-gold flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest">
              WhatsApp
            </a>
            <Instagram size={14} className="text-neutral-500 hover:text-gold cursor-pointer" />
            <Facebook size={14} className="text-neutral-500 hover:text-gold cursor-pointer" />
         </div>
         <p className="text-[8px] uppercase tracking-[0.4em] text-neutral-600 font-bold text-center">
           © {new Date().getFullYear()} EMPIRE B&B • LESOTHO HIGHLANDS • BY APEX.DEV
         </p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold/30">
      <Navbar />
      <Hero />
      <Rooms />
      <Experience />
      <EventsCommunity />
      <FooterBooking />
    </div>
  );
}


// Helper for smaller images if needed
