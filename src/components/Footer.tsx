import { Mail, Phone, MapPin, MessageSquare, Radio, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import reelLogo from "@/assets/reel-logo.png";

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-16 lg:py-20 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-background/15">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={reelLogo}
                  alt="REEL Tech Hub Logo"
                  className="h-10 w-auto object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-wider text-background">
                    REEL TECH HUB
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-background/60">
                    Royalty Executive Empire
                  </span>
                </div>
              </div>
              <p className="text-background/70 text-xs font-light leading-relaxed max-w-sm mb-6">
                Bridging the gap between corporate strategic intent and flawless technical execution.
                Delivering enterprise digital transformation, smart IT infrastructure, and commercial-grade computing across Africa.
              </p>
            </div>

            <div className="text-[11px] text-background/60 font-light">
              <span className="font-medium text-background">A Division of:</span> Royalty Executive Empire Limited
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold mb-4 text-background">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => scrollTo("shop")}
                  className="text-background/70 hover:text-background transition-colors text-xs font-light"
                >
                  Enterprise Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("solutions")}
                  className="text-background/70 hover:text-background transition-colors text-xs font-light"
                >
                  Solutions & Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-background/70 hover:text-background transition-colors text-xs font-light"
                >
                  Contact Desk
                </button>
              </li>
              <li>
                <a
                  href="https://reelholding.com.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors text-xs font-light inline-flex items-center gap-1.5"
                >
                  <span>Main REEL Website</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2348067029444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:text-[#20ba59] transition-colors text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp Direct
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com/channel/0029Vb8f98uFsn0ZxQtIix05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:text-[#20ba59] transition-colors text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <Radio className="w-3.5 h-3.5" />
                  WhatsApp Channel
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold mb-4 text-background">
              Contact & Location
            </h4>
            <div className="space-y-3 text-xs text-background/70 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-background/80 mt-0.5" />
                <span>
                  Plaza 30, Alatishe, Along Lekki-Epe Expressway, Ibeju-Lekki, Lagos State, Nigeria
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-background/80" />
                <a
                  href="mailto:admin@reelholding.com.ng"
                  className="hover:text-background transition-colors"
                >
                  admin@reelholding.com.ng
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-background/80" />
                <a
                  href="tel:+2348067029444"
                  className="hover:text-background transition-colors"
                >
                  +234 806 702 9444
                </a>{" "}
                &bull;{" "}
                <a
                  href="tel:+2349118024521"
                  className="hover:text-background transition-colors"
                >
                  +234 911 802 4521
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-background/50 text-xs font-light">
          <p>
            &copy; {new Date().getFullYear()} REEL Tech Hub. All rights reserved. Royalty Executive Empire Limited.
          </p>
          <div className="flex items-center gap-6">
            <span>Enterprise IT & Hardware Solutions</span>
            <span>&bull;</span>
            <span>Nigeria & Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
