import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Cpu,
  Phone,
  Tag,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const getRatioClass = (ratio?: string) => {
  if (ratio === "1:1") return "aspect-square";
  if (ratio === "4:3") return "aspect-[4/3]";
  if (ratio === "3:2") return "aspect-[3/2]";
  return "aspect-[16/9]";
};

const getFitClass = (fit?: string) => {
  return fit === "contain" ? "object-contain p-4 bg-secondary/40" : "object-cover";
};

const getPosClass = (pos?: string) => {
  if (pos === "top") return "object-top";
  if (pos === "bottom") return "object-bottom";
  return "object-center";
};

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  if (!isOpen || !product) return null;

  const handleOrderNow = () => {
    const message = `*NEW PRODUCT ORDER INQUIRY — REEL TECH HUB*
━━━━━━━━━━━━━━━━━━━━
📦 *Product:* ${product.name}
💰 *Price:* ${product.price}
🏷️ *Category:* ${product.category}
⚙️ *Specs:* ${product.specs}
━━━━━━━━━━━━━━━━━━━━
Hello REEL Tech Hub, I want to order this product. Please share current payment details and delivery schedule.`;

    const url = `https://wa.me/2348067029444?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Parse specs into individual chips if separated by • or comma
  const specItems = product.specs
    ? product.specs.split(/•|,|;/).map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-background text-foreground backdrop-blur-sm border border-border transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left Column: Image & Media */}
            <div className="md:col-span-6 bg-secondary/30 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-foreground/10 text-foreground font-semibold">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary text-primary-foreground font-semibold">
                      {product.badge}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                    ID: {product.id.slice(0, 10)}
                  </span>
                </div>

                {/* Main Product Image Container */}
                <div
                  className={`w-full ${getRatioClass(
                    product.aspectRatio
                  )} rounded-xl overflow-hidden bg-background border border-border shadow-inner relative`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full transition-transform duration-500 hover:scale-105 ${getFitClass(
                      product.imageFit
                    )} ${getPosClass(product.imagePosition)}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <span className="absolute bottom-2 right-2 bg-black/75 text-[9px] px-2 py-0.5 rounded text-white font-mono backdrop-blur-sm">
                    {product.aspectRatio || "16:9"}
                  </span>
                </div>
              </div>

              {/* Verified Hardware Badges */}
              <div className="mt-6 pt-6 border-t border-border/60 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>30-Day Comprehensive REEL Corporate Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Certified 100% Hardware & Battery Health Tested</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                  <Truck className="w-4 h-4 text-primary shrink-0" />
                  <span>Same-Day Dispatch & Nationwide Delivery in Nigeria</span>
                </div>
              </div>
            </div>

            {/* Right Column: Information, Specs & Order Button */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block mb-1">
                  REEL Tech Hub Store
                </span>
                <h2 className="text-xl sm:text-2xl font-light text-foreground tracking-tight mb-3">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-6 p-4 rounded-xl bg-secondary/40 border border-border">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="ml-auto text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Verified Stock
                  </span>
                </div>

                {/* Specifications Grid */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-foreground mb-2.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-primary" />
                    Key Hardware Specifications:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {specItems.map((spec, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-light border border-border/60"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Detailed Description */}
                {product.description && (
                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-foreground mb-1.5">
                      Description & Overview:
                    </h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Order Action Buttons */}
              <div className="pt-6 border-t border-border space-y-3">
                <Button
                  onClick={handleOrderNow}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  Order Now via WhatsApp
                </Button>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
                  <span>Questions before ordering?</span>
                  <a
                    href="tel:+2348067029444"
                    className="text-foreground hover:text-primary transition-colors flex items-center gap-1 font-medium"
                  >
                    <Phone className="w-3 h-3" />
                    Call +234 806 702 9444
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;

