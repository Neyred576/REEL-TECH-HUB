import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import reelLogo from "@/assets/reel-logo.png";

interface NavigationProps {
  variant?: "default" | "dark";
}

const Navigation = ({ variant = "default" }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = variant === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const scrollToContact = () => {
    if (isHomePage) {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);
    }
  };

  const navItems = [
    {
      label: "Shop",
      action: () => scrollToSection("shop"),
      isExternal: false,
    },
    {
      label: "Solutions",
      action: () => scrollToSection("solutions"),
      isExternal: false,
    },
    {
      label: "Main REEL Website",
      href: "https://reelholding.com.ng/",
      isExternal: true,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
        isMobileMenuOpen
          ? "bg-foreground"
          : isDark
          ? isScrolled
            ? "bg-foreground/95 backdrop-blur-lg shadow-soft"
            : "bg-foreground"
          : isScrolled
          ? "bg-card/95 backdrop-blur-lg shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - clicking scrolls up to Homepage */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer group"
            title="Go to Homepage"
          >
            <img
              src={reelLogo}
              alt="REEL Tech Hub Logo"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span
                className={`text-sm font-semibold tracking-wider ${
                  isMobileMenuOpen || isDark || !isScrolled
                    ? "text-white"
                    : "text-foreground"
                }`}
              >
                REEL TECH HUB
              </span>
              <span
                className={`text-[9px] uppercase tracking-widest font-light ${
                  isMobileMenuOpen || isDark || !isScrolled
                    ? "text-white/70"
                    : "text-muted-foreground"
                }`}
              >
                Royalty Executive Empire
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-9">
            {navItems.map((item) =>
              item.isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium smooth-hover hover:opacity-60 transition-opacity ${
                    isDark || !isScrolled ? "text-white" : "text-foreground"
                  }`}
                  title="Visit Royalty Executive Empire Holding Website"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`text-[11px] uppercase tracking-wider font-medium smooth-hover hover:opacity-60 transition-opacity ${
                    isDark || !isScrolled ? "text-white" : "text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              )
            )}

            {/* Contact Action Button */}
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full smooth-hover text-[11px] uppercase tracking-wider font-medium backdrop-blur-md border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-6 ${
                isDark || !isScrolled
                  ? "bg-white/10 text-white hover:bg-white hover:text-black hover:border-white"
                  : "bg-foreground text-background hover:bg-foreground/90 hover:text-background border-transparent"
              }`}
              onClick={scrollToContact}
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`md:hidden p-2 ${
              isMobileMenuOpen || isDark || !isScrolled
                ? "text-white"
                : "text-foreground"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className={`md:hidden mt-4 pb-6 -mx-6 px-6 border-t border-white/10 ${
                isDark || !isScrolled ? "bg-foreground" : "bg-card"
              }`}
            >
              {navItems.map((item) =>
                item.isExternal ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between w-full py-3.5 text-[11px] uppercase tracking-wider font-medium border-b border-white/5 ${
                      isDark || !isScrolled ? "text-white" : "text-foreground"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      item.action();
                    }}
                    className={`block w-full text-left py-3.5 text-[11px] uppercase tracking-wider font-medium border-b border-white/5 ${
                      isDark || !isScrolled ? "text-white" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                )
              )}
              <Button
                variant="outline"
                className="w-full mt-5 rounded-full text-[11px] uppercase tracking-wider font-medium bg-white text-black hover:bg-white/90 border-transparent py-3"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToContact();
                }}
              >
                Contact Us
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
