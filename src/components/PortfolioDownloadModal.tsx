import React, { useState } from "react";
import { Download, X, Crown, CheckCircle2, Shield } from "lucide-react";

export function PortfolioDownloadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    techInterest: "Enterprise Infrastructure & GoChargeAm",
    projectScope: "$50k - $200k",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const stored = JSON.parse(localStorage.getItem("reel_tech_leads") || "[]");
      stored.push({
        ...formData,
        division: "REEL Tech Hub",
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("reel_tech_leads", JSON.stringify(stored));
    } catch {}

    // Trigger PDF download
    const link = document.createElement("a");
    link.href = "/REEL_2026_Executive_Portfolio.pdf";
    link.download = "REEL_2026_Executive_Portfolio.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#D4AF37]/50 bg-[#0e121a]/95 p-6 sm:p-8 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#D4AF37]"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
              <Crown className="w-3.5 h-3.5" />
              <span>Technology Portfolio Access</span>
            </div>
            <h3 className="text-2xl font-serif text-white mb-2 font-normal">
              2026 Tech &amp; Infrastructure Portfolio
            </h3>
            <p className="text-sm text-neutral-400 mb-6 font-light leading-relaxed">
              Discover REEL Tech Hub’s digital infrastructure, GoChargeAm smart mobile power networks, enterprise solutions, and clean energy systems.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Alexander Cole"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-1.5">
                  Corporate or Personal Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="executive@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-1.5">
                  WhatsApp / Direct Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 / +44 / +1 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-1.5">
                    Solution Area
                  </label>
                  <select
                    value={formData.techInterest}
                    onChange={(e) => setFormData({ ...formData, techInterest: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141822] border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Enterprise Infrastructure & GoChargeAm">GoChargeAm Mobile Power</option>
                    <option value="Smart Building Technology">Smart Automation Systems</option>
                    <option value="Enterprise Hardware & Procurement">Hardware &amp; Gadgets</option>
                    <option value="Clean Energy & Solar Infrastructure">Clean Energy &amp; Power</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-1.5">
                    Project Range
                  </label>
                  <select
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141822] border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Commercial Deployment">Commercial / Retail Deployment</option>
                    <option value="$25k - $100k">$25k – $100k</option>
                    <option value="$100k - $500k">$100k – $500k</option>
                    <option value="$500k+">$500k+ (Enterprise Infrastructure)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-black font-semibold uppercase tracking-wider text-xs shadow-md hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Instant Download Portfolio (PDF)</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Confidential enterprise advisory. Direct Technical Executive allocated.</span>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-serif text-white mb-2">Portfolio Download Started</h4>
            <p className="text-sm text-neutral-400 mb-6 max-w-sm mx-auto font-light leading-relaxed">
              Your 2026 REEL Executive Portfolio (PDF) is now downloading. An Enterprise Infrastructure Specialist has been notified.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wider hover:bg-white/15"
            >
              Close &amp; Explore Tech Hub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
