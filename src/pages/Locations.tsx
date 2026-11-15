import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MessageSquare, Clock, Sparkles, CheckCircle2, RefreshCw, Eye } from "lucide-react";
import bannerImage from "@/assets/shop-hero-banner.png";
import { fetchTechProducts, TechProduct } from "@/services/techProductsService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const formatPrice = (price?: string) => {
  if (!price) return "";
  const cleaned = price.trim();
  if (cleaned.startsWith("₦") || cleaned.startsWith("$") || cleaned.startsWith("£")) {
    return cleaned;
  }
  return `₦${cleaned}`;
};

const Locations = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const [products, setProducts] = useState<TechProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<TechProduct | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchTechProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // Also re-fetch on window focus so admin uploads reflect immediately
    const onFocus = () => loadData();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // Compute categories
  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero Header */}
      <div className="relative w-full h-[45vh] md:h-[50vh] overflow-hidden bg-black">
        <motion.img
          src={bannerImage}
          alt="REEL Tech Hub Shop"
          style={{ y }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 w-full h-[120%] object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
          <span className="text-[11px] uppercase tracking-widest text-white/80 font-semibold mb-2">
            A Royalty Executive Empire Limited Division
          </span>
          <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Executive Tech Catalog
          </h1>
          <div className="mt-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Inventory Synchronization</span>
          </div>
        </div>
      </div>

      <main className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3 block font-semibold">
              Hardware Procurement & Catalog
            </span>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
              Commercial-Grade Hardware for African & Global Enterprises
            </h2>
            <p className="text-sm text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
              Browse our verified stock of business laptops, workstations, mobile devices, and server infrastructure.
              Contact our hardware procurement desk directly for quick ordering.
            </p>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-foreground text-background border-foreground shadow-sm"
                      : "bg-card/60 text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {cat === "all" ? "All Equipment" : cat}
                </button>
              ))}
              <button
                onClick={loadData}
                title="Refresh Catalog"
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          )}

          {/* Products Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-4 animate-pulse space-y-4"
                >
                  <div className="w-full h-52 bg-muted/60 rounded-xl" />
                  <div className="h-4 bg-muted/60 rounded w-1/3" />
                  <div className="h-5 bg-muted/80 rounded w-3/4" />
                  <div className="h-4 bg-muted/40 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {!loading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              {filteredProducts.map((p, idx) => {
                const isSold = p.status.toUpperCase() === "SOLD";
                const isPreorder = p.status.toUpperCase().includes("PRE");
                const waMessage = encodeURIComponent(
                  `Hello REEL Tech Hub, I want to inquire about purchasing: ${p.name} (Price: ${formatPrice(p.price) || "N/A"})`
                );

                return (
                  <motion.div
                    key={p.id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative w-full h-56 bg-black/40 overflow-hidden flex items-center justify-center">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                            p.imageFit === "contain"
                              ? "object-contain p-4"
                              : "object-cover"
                          }`}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Sparkles className="w-8 h-8 opacity-40 mb-1" />
                          <span className="text-xs">REEL Tech Hub</span>
                        </div>
                      )}

                      {/* Status Badge */}
                      <span
                        className={`absolute top-3 left-3 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase backdrop-blur-md shadow-sm border ${
                          isSold
                            ? "bg-red-500/20 text-red-400 border-red-500/40"
                            : isPreorder
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        }`}
                      >
                        {p.status || "IN STOCK"}
                      </span>

                      {/* Category Pill */}
                      {p.category && (
                        <span className="absolute top-3 right-3 text-[10px] bg-black/60 text-white/80 backdrop-blur-md px-2 py-0.5 rounded-md font-medium border border-white/10">
                          {p.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-foreground tracking-tight line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
                          {p.name}
                        </h3>

                        {p.specs && (
                          <p className="text-xs text-muted-foreground font-light line-clamp-2 leading-relaxed">
                            {p.specs}
                          </p>
                        )}
                        {!p.specs && p.description && (
                          <p className="text-xs text-muted-foreground font-light line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>
                        )}
                      </div>

                      {/* Price & Action */}
                      <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-base font-semibold text-foreground">
                            {formatPrice(p.price)}
                          </div>
                          {p.originalPrice && (
                            <div className="text-[11px] text-muted-foreground line-through">
                              {formatPrice(p.originalPrice)}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedProduct(p)}
                            title="View Specs & Details"
                            className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {!isSold ? (
                            <a
                              href={`https://wa.me/2348067029444?text=${waMessage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3.5 py-1.5 rounded-full text-xs font-medium hover:bg-[#20ba59] transition-colors shadow-sm"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Inquire</span>
                            </a>
                          ) : (
                            <span className="text-xs font-semibold text-red-400">
                              SOLD
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Empty State / Coming Soon Placeholder (Only if 0 products exist) */}
          {!loading && products.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card mb-16 max-w-5xl mx-auto"
            >
              <div className="absolute inset-0 opacity-10">
                <img
                  src={bannerImage}
                  alt=""
                  className="w-full h-full object-cover"
                  aria-hidden="true"
                />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center py-28 px-8">
                <Clock className="w-12 h-12 text-muted-foreground mb-5" />
                <h3 className="text-xl font-light text-foreground mb-2 tracking-tight">
                  Catalog Inventory Staging
                </h3>
                <p className="text-sm text-muted-foreground font-light max-w-md leading-relaxed mb-8">
                  Hardware inventory is being synced. In the meantime, contact our procurement desk directly
                  for immediate quotes and supply.
                </p>
                <a
                  href="https://wa.me/2348067029444?text=Hello%20REEL%20Tech%20Hub,%20I%20am%20inquiring%20about%20hardware%20procurement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#20ba59] transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Inquire via WhatsApp
                </a>
              </div>
            </motion.div>
          )}

          {/* Direct CTA */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-card to-secondary/40 border border-border rounded-2xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h4 className="text-base font-normal text-foreground mb-1">
                Looking for specific laptop or desktop configurations?
              </h4>
              <p className="text-xs text-muted-foreground font-light">
                Message our hardware procurement desk directly with your team's specifications and timeline.
              </p>
            </div>
            <a
              href="https://wa.me/2348067029444?text=Hello%20REEL%20Tech%20Hub,%20I%20am%20interested%20in%20enterprise%20hardware%20procurement"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#20ba59] transition-colors shrink-0 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </main>

      {/* Product Details Modal */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        {selectedProduct && (
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary uppercase">
                  {selectedProduct.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                  {selectedProduct.status}
                </span>
              </div>
              <DialogTitle className="text-xl font-medium text-foreground">
                {selectedProduct.name}
              </DialogTitle>
              <DialogDescription className="text-sm font-semibold text-foreground pt-1">
                Price: {formatPrice(selectedProduct.price)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {selectedProduct.image && (
                <div className="w-full h-64 bg-black/40 rounded-xl overflow-hidden flex items-center justify-center border border-border">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}

              {selectedProduct.specs && (
                <div className="bg-secondary/40 p-4 rounded-xl border border-border space-y-1">
                  <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                    Specifications
                  </span>
                  <p className="text-xs text-foreground font-mono whitespace-pre-line leading-relaxed">
                    {selectedProduct.specs}
                  </p>
                </div>
              )}

              {selectedProduct.description && (
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
                    Description
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                    {selectedProduct.description}
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-3">
                <a
                  href={`https://wa.me/2348067029444?text=${encodeURIComponent(
                    `Hello REEL Tech Hub, I want to order/inquire about: ${selectedProduct.name} (${formatPrice(selectedProduct.price)})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#20ba59] transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </div>
  );
};

export default Locations;
