import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Clock, Sparkles, ArrowRight, Eye, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import shopBanner from "@/assets/shop-hero-banner.webp";
import { fetchTechProducts, TechProduct, resolveImageFitCss } from "@/services/techProductsService";
import ProductDetailModal, { formatPrice } from "@/components/ProductDetailModal";
import { useCart } from "@/context/CartContext";

const Locations = () => {
  const { addToCart } = useCart();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [products, setProducts] = useState<TechProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<TechProduct | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    fetchTechProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="shop" className="py-24 lg:py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3 block font-semibold">
            REEL Tech Hub Hardware Store
          </span>
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-foreground tracking-tight">
            Executive Tech Catalog
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            Direct commercial procurement of enterprise-grade laptops, workstation PCs,
            smart office equipment, and mobile devices across Africa.
          </p>
        </motion.div>

        {/* Live Products Grid */}
        {products.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {products.slice(0, 6).map((p, idx) => {
                const isSold = p.status.toUpperCase() === "SOLD";
                const isComingSoon = p.status.toUpperCase() === "COMING SOON";
                const waMessage = encodeURIComponent(
                  `Hello REEL Tech Hub, I want to inquire about: ${p.name} (${formatPrice(p.price) || "N/A"})`
                );

                return (
                  <motion.div
                    key={p.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    onClick={() => setSelectedProduct(p)}
                    className="group rounded-2xl border border-border bg-card hover:border-primary/60 transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col cursor-pointer"
                  >
                    <div className="relative w-full h-52 overflow-hidden flex items-center justify-center">
                      {p.image ? (
                        <>
                          {/* Blurred image backdrop — blends with the picture */}
                          <img
                            src={p.image}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover scale-125 blur-xl opacity-60 dark:opacity-40"
                          />
                          <div className="absolute inset-0 bg-background/30 backdrop-blur-md" />
                          {/* Main product image */}
                          <img
                            src={p.image}
                            alt={p.name}
                            loading="lazy"
                            className={`relative z-10 w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                              resolveImageFitCss(p.imageFit) === "object-contain"
                                ? "object-contain p-3"
                                : "object-cover"
                            }`}
                          />
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground bg-muted/20 w-full h-full">
                          <Sparkles className="w-8 h-8 opacity-40 mb-1" />
                          <span className="text-xs">REEL Tech Hub</span>
                        </div>
                      )}

                      <span
                        className={`absolute top-3 left-3 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase backdrop-blur-md border ${
                          isSold
                            ? "bg-red-500/20 text-red-400 border-red-500/40"
                            : isComingSoon
                            ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        }`}
                      >
                        {p.status || "IN STOCK"}
                      </span>

                      {p.category && (
                        <span className="absolute top-3 right-3 text-[10px] bg-black/60 text-white/80 backdrop-blur-md px-2 py-0.5 rounded-md font-medium border border-white/10">
                          {p.category}
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="text-base font-medium text-foreground tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                        {p.specs && (
                          <p className="text-xs text-muted-foreground font-light line-clamp-2 mt-1 leading-relaxed">
                            {p.specs}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-3">
                        <div className="text-base font-semibold text-foreground">
                          {formatPrice(p.price)}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(p);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-foreground/10 hover:bg-foreground hover:text-background text-foreground transition-all duration-200 border border-border/80 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                          {!isSold && (
                            addedId === p.id ? (
                              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500 text-black transition-all shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Added! ✓</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(p, 1);
                                  setAddedId(p.id);
                                  setTimeout(() => setAddedId(null), 1500);
                                }}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary hover:bg-primary/90 text-black transition-all shadow-sm cursor-pointer"
                                title="Add to Cart"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Cart</span>
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-sm"
              >
                <span>View Full Tech Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Fallback Placeholder only if 0 products found */}
        {!loading && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card mb-16 max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 opacity-10">
              <img
                src={shopBanner}
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-8">
              <Clock className="w-12 h-12 text-muted-foreground mb-5" />
              <h3 className="text-xl font-light text-foreground mb-2 tracking-tight">
                Catalog Launching Soon
              </h3>
              <p className="text-sm text-muted-foreground font-light max-w-md leading-relaxed mb-8">
                We're staging our full product inventory. In the meantime, contact our
                procurement desk directly — we're ready to source enterprise hardware for your team.
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

        {/* Direct Procurement Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-card to-secondary/40 border border-border rounded-2xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-left">
            <h4 className="text-base font-normal text-foreground mb-1">
              Procuring for your company, school, or corporate team?
            </h4>
            <p className="text-xs text-muted-foreground font-light">
              Speak directly with our hardware procurement lead for custom specs, bulk pricing,
              and rapid delivery across Nigeria & Africa.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/2348067029444?text=Hello%20REEL%20Tech%20Hub,%20I%20am%20interested%20in%20bulk%20enterprise%20hardware%20procurement"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#20ba59] transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Procurement
            </a>
          </div>
        </motion.div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default Locations;
