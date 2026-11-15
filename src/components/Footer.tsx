import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight, ExternalLink } from "lucide-react";
import reelLogo from "@/assets/reel-logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const subject = encodeURIComponent("Newsletter Subscription Request");
    const body = encodeURIComponent(
      `Hello REEL Team,\n\nI would like to subscribe to your newsletter.\n\nEmail: ${email}\n\nThank you.`
    );
    window.location.href = `mailto:admin@reelholding.com.ng?subject=${subject}&body=${body}`;
    setEmail("");
  };

  return (
    <footer className="bg-[#0B0B0B] text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambience Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* 1. Brand Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <a
                href="https://reelholding.com.ng/"
                className="flex items-center gap-3.5 mb-5 group"
                aria-label="REEL Holding Home"
              >
                <img
                  src={reelLogo}
                  alt="Royalty Executive Empire Limited"
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="text-base font-semibold tracking-wider text-white">
                    REEL TECH HUB
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/60">
                    Royalty Executive Empire Limited
                  </span>
                </div>
              </a>

              <p className="text-white/70 text-xs font-light leading-relaxed mb-6 max-w-sm">
                Royalty Executive Empire Limited &mdash; Building Empires, Shaping Futures, Leading Innovation across Africa and beyond.
              </p>

              {/* Social Media Row */}
              <div className="flex flex-wrap items-center gap-2 mb-6" aria-label="Social media links">
                {/* Facebook */}
                <a
                  href="https://web.facebook.com/ReelHolding/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com/ReelHolding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all"
                  aria-label="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/reelholding/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@ReelHolding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.48z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0B0B0B" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@reelholding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all"
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/reelholding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>

              {/* Join WhatsApp Channel Button */}
              <a
                href="https://whatsapp.com/channel/0029Vb8f98uFsn0ZxQtIix05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 px-4 py-2.5 rounded-full text-xs font-medium transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Join Our WhatsApp Channel</span>
              </a>
            </div>
          </div>

          {/* 2. Instagram Showcase Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-white mb-4">
              Instagram
            </h3>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3.5">
                <a
                  href="https://www.instagram.com/reelholding/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-pink-400 mt-0.5 shrink-0">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-white text-[11px] tracking-wider uppercase leading-tight">ROYALTY EXECUTIVE EMPIRE LIMITED</span>
                    <span className="text-[10px] text-white/60">@reelholding</span>
                  </div>
                </a>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              {/* 6 Grid Preview Tiles */}
              <div className="grid grid-cols-3 gap-2 mb-3.5">
                {[
                  { img: "/real_estate_hero.png", title: "REEL Properties" },
                  { img: "/efuas_auto_center_hero.jpg", title: "REEL Auto Centre" },
                  { img: "/vannys_tech_hub_hero.jpg", title: "REEL Tech Hub" },
                  { img: "/glorious_global_palace_hero.jpg", title: "REEL Global Palace" },
                  { img: "/reel_power_hero.png", title: "REEL Power" },
                  { img: "/real_estate_hero.png", title: "Executive Leadership" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href="https://www.instagram.com/reelholding/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square rounded-lg overflow-hidden group/tile border border-white/5"
                    title={item.title}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/tile:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/tile:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-medium">
                      View
                    </div>
                  </a>
                ))}
              </div>

              <a
                href="https://www.instagram.com/reelholding/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/90 text-[11px] font-medium py-2 rounded-xl transition-colors border border-white/10"
              >
                <span>View Instagram Posts</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 3. Our Divisions Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-white mb-4">
              Our Divisions
            </h3>
            <ul className="space-y-3 text-xs text-white/70 font-light">
              <li>
                <a
                  href="https://reeltech.reelholding.com.ng"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>REEL Tech Hub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://the-new-reel-suv.ai.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>REEL Auto Centre</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://reelproperties.reelholding.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>REEL Properties</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://reelglobal.reelholding.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>REEL Global Palace</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://reelholding.com.ng/leadership.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Meet Our Leadership</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Stay Connected & Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-white mb-4">
              Stay Connected
            </h3>
            <p className="text-white/70 text-xs font-light leading-relaxed mb-4">
              Subscribe to receive updates, news, and exclusive opportunities from REEL.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="relative mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 pr-10"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>

            {/* Contact Details from Main Website */}
            <div className="space-y-2.5 text-xs text-white/70 font-light">
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <a
                  href="mailto:admin@reelholding.com.ng"
                  className="hover:text-white transition-colors"
                >
                  admin@reelholding.com.ng
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <a href="tel:+2348067029444" className="hover:text-white transition-colors">+234 806 702 9444</a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0 text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M11.998 2C6.477 2 2 6.477 2 11.998c0 1.772.465 3.437 1.278 4.883L2 22l5.236-1.258A9.952 9.952 0 0 0 11.998 22c5.52 0 9.998-4.477 9.998-9.998C21.996 6.477 17.519 2 11.998 2z" />
                </svg>
                <a href="https://wa.me/2349118024521" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] text-[#25D366] transition-colors">+234 911 802 4521</a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-white/90 shrink-0 mt-0.5" />
                <span>Ibeju Lekki - Lagos State, Nigeria</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-white/50 text-xs font-light">
          <p>
            &copy; {new Date().getFullYear()} Royalty Executive Empire Limited (REEL). All Rights Reserved.
          </p>
          <nav aria-label="Legal links">
            <ul className="flex items-center gap-6">
              <li>
                <a
                  href="https://reelholding.com.ng/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://reelholding.com.ng/terms.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://reelholding.com.ng/cookies.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
