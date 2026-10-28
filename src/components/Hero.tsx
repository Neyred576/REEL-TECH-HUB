import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import heroShowroom from "@/assets/hero-showroom.png";
import heroTechStore from "@/assets/hero-tech-store.png";
import heroLaptop from "@/assets/hero-laptop-showcase.png";
import heroGaming from "@/assets/hero-gaming-setup.png";

const slides = [
  {
    image: heroShowroom,
    subtitle: "A Royalty Executive Empire Division",
    line1: "Closing Africa's",
    line2: "Digital Execution Gap",
    desc: "Delivering enterprise digital transformation, executive smart office solutions, and commercial-grade computing.",
    objectPosition: "center",
  },
  {
    image: heroTechStore,
    subtitle: "Enterprise Hardware & Computing",
    line1: "Commercial-Grade",
    line2: "Laptops & Workstations",
    desc: "Precision enterprise PCs and workstation computers tailored for high-performance corporate operations.",
    objectPosition: "center",
  },
  {
    image: heroLaptop,
    subtitle: "Smart IT & Infrastructure",
    line1: "Digital Transformation",
    line2: "& Systems Integration",
    desc: "Bridging the gap between corporate strategic intent and flawless technical execution.",
    objectPosition: "center top",
  },
  {
    image: heroGaming,
    subtitle: "Technical Capacity Building",
    line1: "Empowering Modern",
    line2: "Technical Leaders",
    desc: "Structured, hands-on digital skills training in software engineering and cloud systems.",
    objectPosition: "center",
  },
];

const SLIDE_DURATION = 5500;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [nextSlide]);

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Image Ticker with Darker Enterprise Overlay */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.line2}
            className="w-full h-full object-cover"
            style={{ objectPosition: activeSlide.objectPosition }}
          />
          {/* Subtle gradient overlay to make typography pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
        </motion.div>
      </AnimatePresence>

      {/* Bottom-Left Content */}
      <div className="absolute bottom-24 left-6 md:left-12 lg:left-20 z-10 text-white max-w-xl">
        {/* Division Badge / Tech Icon */}
        <motion.div
          key={`badge-${currentSlide}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-3 flex items-center gap-2"
        >
          <Cpu className="w-4 h-4 text-white/90" />
          <span className="text-[11px] uppercase tracking-widest font-semibold text-white/90">
            {activeSlide.subtitle}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          key={`headline-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-left flex flex-col leading-[1.1] mb-4"
        >
          <span className="font-extralight text-white/90">{activeSlide.line1}</span>
          <span className="font-semibold text-white">{activeSlide.line2}</span>
        </motion.h1>

        {/* Sub-description */}
        <motion.p
          key={`desc-${currentSlide}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xs md:text-sm text-white/80 font-light leading-relaxed max-w-lg mb-8"
        >
          {activeSlide.desc}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-3 bg-white text-black px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-white/90 transition-all hover:scale-105"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() =>
              document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 border border-white/40 text-white px-6 py-3 rounded-full text-xs font-medium uppercase tracking-wider backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            Explore Shop
          </button>
        </motion.div>
      </div>

      {/* Slide Progress Bars */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="flex-1 h-[2px] bg-white/25 overflow-hidden cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width:
                  index === currentSlide
                    ? `${progress}%`
                    : index < currentSlide
                    ? "100%"
                    : "0%",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
