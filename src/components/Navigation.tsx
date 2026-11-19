import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink, ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import reelLogo from "@/assets/reel-logo.png";
import { useCart } from "@/context/CartContext";

interface NavigationProps {
  variant?: "default" | "dark";
}

const Navigation = ({ variant = "default" }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = variant === "dark";
  const { cartCount } = useCart();

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
      action: () => navigate("/shop"),
      isExternal: false,
    },
    {
      label: "Solutions",
      action: () => scrollToSection("solutions"),
      isExternal: false,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${isMobileMenuOpen
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
      <div className="container mx-auto px-6 lg:px-12 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Branding: Crown -> Main Website | Text -> Tech Hub Home */}
          <div className="flex items-center gap-3">
            <a
              href="https://reelholding.com.ng/"
              className="group focus:outline-none"
              title="Royalty Executive Empire Main Website"
            >
              <img
                src={reelLogo}
                alt="Royalty Executive Empire"
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]"
              />
            </a>
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex flex-col text-left group focus:outline-none cursor-pointer"
              title="REEL Tech Hub Home"
            >
              <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#D4AF37] leading-none transition-opacity duration-300 group-hover:opacity-85">
                REEL TECH HUB
              </span>
              <span className="text-[7px] sm:text-[8.5px] font-sans tracking-[0.22em] text-neutral-400 uppercase font-light leading-tight mt-1 transition-colors duration-300 group-hover:text-neutral-300">
                ROYALTY EXECUTIVE EMPIRE LIMITED
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-9">
            {navItems.map((item) =>
              item.isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium smooth-hover hover:opacity-60 transition-opacity ${isDark || !isScrolled ? "text-white" : "text-foreground"
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
                  className={`text-[11px] uppercase tracking-wider font-medium smooth-hover hover:opacity-60 transition-opacity ${isDark || !isScrolled ? "text-white" : "text-foreground"
                    }`}
                >
                  {item.label}
                </button>
              )
            )}

            {/* News & Media Button */}
            <a
              href="https://reelholding.com.ng/blog.html"
              className={`rounded-full smooth-hover text-[11px] uppercase tracking-wider font-medium backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_4px_30px_rgba(212,175,55,0.15)] px-5 py-2 inline-flex items-center justify-center transition-all ${isDark || !isScrolled
                ? "bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border-[#D4AF37]"
                : "bg-foreground text-background hover:bg-[#D4AF37] hover:text-black border-transparent"
                }`}
            >
              News & Media
            </a>

            {/* Contact Us Action Button at Corner */}
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full smooth-hover text-[11px] uppercase tracking-wider font-medium backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_4px_30px_rgba(212,175,55,0.15)] px-6 ${isDark || !isScrolled
                ? "bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border-[#D4AF37]"
                : "bg-foreground text-background hover:bg-[#D4AF37] hover:text-black border-transparent"
                }`}
              onClick={() => { window.location.href = "https://reelholding.com.ng/contact.html"; }}
            >
              Contact Us
            </Button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className={`relative p-2.5 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                isDark || !isScrolled
                  ? "bg-white/10 text-white border-white/20 hover:border-primary hover:text-primary"
                  : "bg-foreground/5 text-foreground border-border hover:border-primary hover:text-primary"
              }`}
              aria-label={`Shopping Cart (${cartCount} items)`}
              title="View Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart & Menu Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className={`relative p-2 rounded-full border transition-all duration-200 cursor-pointer ${
                isMobileMenuOpen || isDark || !isScrolled
                  ? "bg-white/10 text-white border-white/20"
                  : "bg-foreground/5 text-foreground border-border"
              }`}
              aria-label={`Cart (${cartCount})`}
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-black text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className={`p-2 ${isMobileMenuOpen || isDark || !isScrolled
                ? "text-white"
                : "text-foreground"
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className={`md:hidden mt-4 pb-6 -mx-6 px-6 border-t border-white/10 ${isDark || !isScrolled ? "bg-foreground" : "bg-card"
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
                    className={`flex items-center justify-between w-full py-3.5 text-[11px] uppercase tracking-wider font-medium border-b border-white/5 ${isDark || !isScrolled ? "text-white" : "text-foreground"
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
                    className={`block w-full text-left py-3.5 text-[11px] uppercase tracking-wider font-medium border-b border-white/5 ${isDark || !isScrolled ? "text-white" : "text-foreground"
                      }`}
                  >
                    {item.label}
                  </button>
                )
              )}
              <a
                href="https://reelholding.com.ng/blog.html"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full mt-4 rounded-full text-[11px] uppercase tracking-wider font-medium bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37] py-3 text-center block"
              >
                News & Media
              </a>
              <Button
                variant="outline"
                className="w-full mt-2 rounded-full text-[11px] uppercase tracking-wider font-medium bg-white text-black hover:bg-white/90 border-transparent py-3"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = "https://reelholding.com.ng/contact.html";
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
