import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MessageSquare, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import bannerImage from "@/assets/detail-forest-1.jpg";
import { Product, getStoredProducts } from "@/data/products";
import ProductDetailModal from "@/components/ProductDetailModal";

const getRatioClass = (ratio?: string) => {
  if (ratio === "1:1") return "aspect-square";
  if (ratio === "4:3") return "aspect-[4/3]";
  if (ratio === "3:2") return "aspect-[3/2]";
  return "aspect-[16/9]";
};

const getFitClass = (fit?: string) => {
  return fit === "contain" ? "object-contain p-3 bg-secondary/40" : "object-cover";
};

const getPosClass = (pos?: string) => {
  if (pos === "top") return "object-top";
  if (pos === "bottom") return "object-bottom";
  return "object-center";
};

const Locations = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = () => {
    const list = getStoredProducts();
    setProducts(list.filter((p) => p.status === "published"));
  };

  useEffect(() => {
    loadProducts();

    const handleUpdate = () => loadProducts();
    window.addEventListener("reel_products_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("reel_products_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const categories = [
    "all",
    "Laptops",
    "Workstations",
    "Servers & Network",
    "Monitors & Smart Office",
    "Accessories",
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleOrderWhatsApp = (product: Product) => {
    const message = `Hello REEL Tech Hub, I want to purchase / inquire about *${product.name}* (Price: ${product.price}). Please provide current stock availability and delivery timeline.`;
    const url = `https://wa.me/2348067029444?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero Header with Parallax */}
      <div className="relative w-full h-[45vh] overflow-hidden bg-black">
        <motion.img
          src={bannerImage}
          alt="REEL Tech Hub Shop"
          style={{ y }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-[120%] object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
          <span className="text-[11px] uppercase tracking-widest text-white/80 font-semibold mb-2">
            A Royalty Executive Empire Division
          </span>
          <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Enterprise Computing Shop
          </h1>
        </div>
      </div>

      <main className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3 block font-semibold">
              Hardware Procurement & Catalog
            </span>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
              Commercial-Grade Hardware for African & Global Enterprises
            </h2>
            <p className="text-sm text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
              Browse our verified stock of business laptops, workstations, and server infrastructure.
              Contact our hardware procurement desk directly for bulk fleet deployment.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat
                    ? "bg-foreground text-background font-medium shadow-sm"
                    : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All Products" : cat}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-2xl max-w-md mx-auto">
              <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <h4 className="text-base font-normal text-foreground mb-1">
                Catalog Currently Updating
              </h4>
              <p className="text-xs text-muted-foreground font-light mb-4">
                Products for this category are being staged. Contact our team for immediate procurement.
              </p>
              <a
                href="https://wa.me/2348067029444?text=Hello%20REEL%20Tech%20Hub,%20I%20am%20inquiring%20about%20hardware%20procurement"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2 rounded-full text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                Inquire via WhatsApp
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-card border border-border/80 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className={`relative w-full ${getRatioClass(product.aspectRatio)} bg-secondary/30 overflow-hidden`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${getFitClass(product.imageFit)} ${getPosClass(product.imagePosition)}`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80";
                        }}
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white font-medium">
                          {product.category}
                        </span>
                        {product.badge && (
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-primary-foreground font-semibold">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-lg font-semibold text-foreground tracking-tight">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-medium text-foreground tracking-tight mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2 mb-4">
                        {product.specs}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/20 border-t border-border/40">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all hover:gap-2.5"
                    >
                      <span>View More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product Detail Popup Modal */}
          <ProductDetailModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />

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

      <Footer />
    </div>
  );
};

export default Locations;
