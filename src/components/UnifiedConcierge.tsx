import React, { useState, useEffect, useRef } from "react";
import { Crown, Phone, Mail, ArrowRight, X } from "lucide-react";

export function UnifiedConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const divisions = [
    {
      name: "REEL Tech Hub",
      icon: "⚡",
      subtitle: "Current Division • Tech Advisory & Digital Solutions",
      text: "Hello REEL Tech Hub team, I am inquiring about tech advisory, power and enterprise solutions.",
    },
    {
      name: "REEL Properties",
      icon: "🏢",
      subtitle: "Real Estate & Diaspora Portfolio",
      text: "Hello REEL Properties team, I would like to inquire about exclusive property acquisitions and off-plan developments.",
    },
    {
      name: "REEL Auto",
      icon: "🚗",
      subtitle: "Luxury Fleet & Bespoke Sourcing",
      text: "Hello REEL Auto team, I am inquiring about luxury fleet inventory and bespoke vehicle sourcing.",
    },
    {
      name: "REEL Global Palace",
      icon: "👑",
      subtitle: "VIP Suite Booking & Luxury Hospitality",
      text: "Hello REEL Global Palace Concierge, I wish to inquire about VIP suite reservations and luxury hospitality.",
    },
    {
      name: "Executive Holding Office",
      icon: "🏛️",
      subtitle: "Partnerships & Sovereign Advisory",
      text: "Hello Royalty Executive Empire, I would like to connect with the Holding Executive Office.",
    },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open REEL VIP Concierge"
        aria-expanded={isOpen}
        className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0d111a]/95 border border-[#D4AF37]/70 text-white backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_24px_rgba(212,175,55,0.3)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
          <Crown className="w-4 h-4" />
        </div>
        <div className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
            24/7 VIP Concierge
          </span>
          <span className="text-xs font-semibold text-white">Connect Division</span>
        </div>
        <div className="relative w-2.5 h-2.5">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
          <span className="relative block w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
      </button>

      {/* Drawer Card */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] max-w-[calc(100vw-32px)] rounded-3xl border border-[#D4AF37]/40 bg-[#0d111a]/98 p-5 shadow-2xl backdrop-blur-2xl animate-fade-in text-white">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">REEL VIP Concierge</h4>
                <p className="text-[11px] text-[#D4AF37]">Direct Division Routing</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-neutral-400 mb-3 font-light">
            Select a division to connect directly with the lead manager via WhatsApp:
          </p>

          {/* List */}
          <div className="space-y-1.5 mb-3.5">
            {divisions.map((div, i) => (
              <a
                key={i}
                href={`https://wa.me/2348067029444?text=${encodeURIComponent(div.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all group"
              >
                <span className="text-base">{div.icon}</span>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-xs font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                    {div.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate font-light">
                    {div.subtitle}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>

          {/* Footer Contacts */}
          <div className="flex items-center justify-center gap-4 pt-3 border-t border-white/10 text-[11px]">
            <a
              href="tel:+2348067029444"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-[#D4AF37]"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span>Direct Call</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href="mailto:tech@reelholding.com.ng"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-[#D4AF37]"
            >
              <Mail className="w-3 h-3 text-[#D4AF37]" />
              <span>VIP Desk</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
