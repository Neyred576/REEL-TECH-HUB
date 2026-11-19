import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Cpu,
  Sparkles,
  Tag,
  X,
  ShoppingCart,
} from "lucide-react";
import { TechProduct, resolveImageFitCss } from "@/services/techProductsService";
import { useCart } from "@/context/CartContext";

export const formatPrice = (price?: string | number): string => {
  if (price === undefined || price === null || price === "") return "";
  const str = String(price).trim();
  if (str.startsWith("₦") || str.startsWith("$") || str.startsWith("£")) {
    return str;
  }
  const num = Number(str.replace(/,/g, ""));
  if (!isNaN(num) && num > 0) {
    return `₦${num.toLocaleString()}`;
  }
  return `₦${str}`;
};

interface ProductDetailModalProps {
  product: TechProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image || (product.images && product.images[0]) || "");
      setIsAdded(false);
    }
  }, [product]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !product) return null;

  const isSold = (product.status || "").toUpperCase() === "SOLD";
  const isPreorder = (product.status || "").toUpperCase().includes("PRE");

  // Collect all unique images
  const allImages = Array.from(
    new Set([product.image, ...(product.images || [])].filter(Boolean))
  );

  const formattedPrice = formatPrice(product.price);
  const formattedOriginalPrice = formatPrice(product.originalPrice);

  // Resolve the correct CSS class from admin's imageFit value
  const fitCss = resolveImageFitCss(product.imageFit);
  const imgClass = fitCss === "object-contain" ? "object-contain p-4" : "object-cover";

  const waMessage = encodeURIComponent(
    isSold
      ? `Hello REEL Tech Hub, I saw ${product.name} (${formattedPrice || "N/A"}) is marked as SOLD. I would like to inquire about restock or backorder availability.`
      : `Hello REEL Tech Hub, I want to inquire about: ${product.name} (Price: ${formattedPrice || "N/A"}). Please provide availability and delivery details.`
  );

  const waUrl = `https://wa.me/2348067029444?text=${waMessage}`;

  return (
    /* Overlay — z-[200] to sit above the navbar's z-[100] */
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto"
      style={{ padding: "5rem 1rem 2rem" }} /* top padding clears the fixed navbar */
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-2xl sm:max-w-3xl bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-background/70 hover:bg-background text-foreground border border-border transition-colors shadow-sm"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-border/70 text-left pr-14">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {product.category && (
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {product.category}
              </span>
            )}
            <span
              className={`text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase border ${
                isSold
                  ? "bg-red-500/15 text-red-400 border-red-500/30"
                  : isPreorder
                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              }`}
            >
              {product.status || "IN STOCK"}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-light text-foreground tracking-tight">
            {product.name}
          </h2>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-xl sm:text-2xl text-foreground font-semibold">
              {formattedPrice || "Price on Request"}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Product Image */}
          <div className="space-y-3">
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden flex items-center justify-center border border-border">
              {selectedImage ? (
                <>
                  {/* Blurred image backdrop — blends with the picture */}
                  <img
                    src={selectedImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-60 dark:opacity-40"
                  />
                  <div className="absolute inset-0 bg-background/20 backdrop-blur-md" />
                  {/* Main product image */}
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className={`relative z-10 w-full h-full ${imgClass}`}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground bg-muted/20 w-full h-full">
                  <Sparkles className="w-10 h-10 opacity-30 mb-2" />
                  <span className="text-xs">REEL Tech Hub Hardware</span>
                </div>
              )}
            </div>

            {/* Thumbnails if multi-photo */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImage === img
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border/70 hover:border-foreground/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} preview ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specifications */}
          {product.specs && (
            <div className="bg-secondary/40 p-4 rounded-xl border border-border space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Cpu className="w-4 h-4 text-primary" />
                <span>Hardware Specifications</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground font-mono whitespace-pre-line leading-relaxed">
                {product.specs}
              </p>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span>Description & Overview</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30 border border-border/60 text-[11px] text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>REEL Corporate Hardware Warranty</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30 border border-border/60 text-[11px] text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Tested & Verified Hardware</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30 border border-border/60 text-[11px] text-muted-foreground">
              <Truck className="w-4 h-4 text-primary shrink-0" />
              <span>Express Delivery Available</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-border/70 bg-card/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
            <span>Direct Desk:</span>
            <a
              href="tel:+2348067029444"
              className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              +234 806 702 9444
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {isSold ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Inquire for Restock</span>
              </a>
            ) : (
              <>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-400 transition-colors mr-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire via WhatsApp</span>
                </a>
                {isAdded ? (
                  <span className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-black px-7 py-2.5 rounded-full text-xs font-bold transition-all shadow-md w-full sm:w-auto">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-black" />
                    <span>ADDED TO CART! ✓</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (product) {
                        addToCart(product, 1);
                        setIsAdded(true);
                        setTimeout(() => {
                          setIsAdded(false);
                          onClose();
                        }, 800);
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black px-7 py-2.5 rounded-full text-xs font-bold transition-all shadow-md hover:shadow-primary/30 w-full sm:w-auto cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 shrink-0" />
                    <span>ADD TO CART</span>
                  </button>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
