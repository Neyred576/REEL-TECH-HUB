import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  X,
  Upload,
  Image as ImageIcon,
  Laptop,
  ArrowLeft,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Search,
  Tag,
  DollarSign,
  Sparkles,
  Crop,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import reelLogo from "@/assets/reel-logo.png";
import {
  Product,
  getStoredProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProducts,
  compressImage,
} from "@/data/products";

const ADMIN_PASSWORD = "REEL TECH HUB@090021";
const AUTH_STORAGE_KEY = "reel_admin_authenticated";

const PRESET_IMAGES = [
  {
    name: "Enterprise Laptop",
    url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Executive Laptop (Silver)",
    url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "ThinkPad Workhorse",
    url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Precision Tower PC",
    url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Dual Display Setup",
    url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Server & Rackmount",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
  },
];

const getRatioClass = (ratio?: string) => {
  if (ratio === "1:1") return "aspect-square";
  if (ratio === "4:3") return "aspect-[4/3]";
  if (ratio === "3:2") return "aspect-[3/2]";
  return "aspect-[16/9]";
};

const getFitClass = (fit?: string) => {
  return fit === "contain" ? "object-contain p-3 bg-zinc-950" : "object-cover";
};

const getPosClass = (pos?: string) => {
  if (pos === "top") return "object-top";
  if (pos === "bottom") return "object-bottom";
  return "object-center";
};

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Product management state
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    category: Product["category"];
    price: string;
    originalPrice: string;
    specs: string;
    description: string;
    image: string;
    aspectRatio: "16:9" | "4:3" | "1:1" | "3:2";
    imageFit: "cover" | "contain";
    imagePosition: "center" | "top" | "bottom";
    badge: string;
    status: "published" | "draft";
  }>({
    name: "",
    category: "Laptops",
    price: "",
    originalPrice: "",
    specs: "",
    description: "",
    image: PRESET_IMAGES[0].url,
    aspectRatio: "16:9",
    imageFit: "cover",
    imagePosition: "center",
    badge: "In Stock",
    status: "published",
  });

  // Check auth session on load
  useEffect(() => {
    const authStatus = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setProducts(getStoredProducts());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setAuthError("");
      setProducts(getStoredProducts());
      toast.success("Welcome, Administrator! Publishing console unlocked.");
    } else {
      setAuthError("Incorrect password. Access restricted to REEL Tech Hub Administrators.");
      toast.error("Access Denied: Incorrect Password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
    toast.info("Logged out of Admin Console.");
  };

  const reloadProducts = () => {
    setProducts(getStoredProducts());
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Laptops",
      price: "",
      originalPrice: "",
      specs: "",
      description: "",
      image: PRESET_IMAGES[0].url,
      aspectRatio: "16:9",
      imageFit: "cover",
      imagePosition: "center",
      badge: "In Stock",
      status: "published",
    });
    setIsFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || "",
      specs: product.specs,
      description: product.description,
      image: product.image,
      aspectRatio: product.aspectRatio || "16:9",
      imageFit: product.imageFit || "cover",
      imagePosition: product.imagePosition || "center",
      badge: product.badge || "In Stock",
      status: product.status,
    });
    setIsFormOpen(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        toast.info("Optimizing image for fast loading...");
        const compressed = await compressImage(file, 800, 0.8);
        setFormData((prev) => ({ ...prev, image: compressed }));
        toast.success("Product photo optimized and loaded!");
      } catch (err) {
        console.error("Image processing error", err);
        // Fallback to direct read if canvas fails
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setFormData((prev) => ({ ...prev, image: event.target!.result as string }));
            toast.success("Photo loaded.");
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price.trim()) {
      toast.error("Product name and price are required.");
      return;
    }

    if (editingId) {
      const ok = updateProduct(editingId, formData);
      if (!ok) {
        toast.error("Failed to save changes. Browser storage may be full.");
        return;
      }
      toast.success("Product updated successfully!");
    } else {
      const created = addProduct(formData);
      if (!created) {
        toast.error("Storage error: Failed to save product. Try using a preset or smaller photo.");
        return;
      }
      toast.success(`"${formData.name}" published live to store!`);
    }

    // Reset filters so the new product is visible immediately
    setSelectedCategoryFilter("all");
    setSearchQuery("");
    setIsFormOpen(false);
    reloadProducts();
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the store?`)) {
      deleteProduct(id);
      toast.success("Product removed from catalog.");
      reloadProducts();
    }
  };

  const handleToggleStatus = (product: Product) => {
    const newStatus = product.status === "published" ? "draft" : "published";
    updateProduct(product.id, { status: newStatus });
    toast.info(`Product status set to: ${newStatus}`);
    reloadProducts();
  };

  const handleResetCatalog = () => {
    if (window.confirm("Reset catalog back to initial default products?")) {
      resetProducts();
      toast.success("Catalog reset to default.");
      reloadProducts();
    }
  };

  // Filtered list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specs.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === "all" || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // ==================== 1. LOGIN GATE ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <img
              src={reelLogo}
              alt="REEL Tech Hub Logo"
              className="h-16 w-auto mx-auto mb-4 object-contain"
            />
            <h1 className="text-2xl font-light tracking-wider uppercase text-white mb-1">
              REEL TECH HUB
            </h1>
            <p className="text-xs uppercase tracking-widest text-white/60">
              Admin & Publishing Console
            </p>
          </div>

          <Card className="p-8 bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl shadow-2xl rounded-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="admin-password"
                  className="text-xs uppercase tracking-wider text-zinc-300 font-medium flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-primary" />
                    Administrator Key
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] text-zinc-400 hover:text-white transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </Label>
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError("");
                  }}
                  required
                  className="bg-black/60 border-zinc-700 text-white placeholder:text-zinc-600 text-sm py-5"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-zinc-200 font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Unlock Admin Console
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to REEL Tech Hub
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ==================== 2. MAIN ADMIN DASHBOARD ====================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 py-4 px-6 lg:px-12">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={reelLogo} alt="REEL Logo" className="h-8 w-auto object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-wider text-white">
                  REEL TECH HUB
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Admin Active
                </span>
              </div>
              <p className="text-[10px] text-zinc-400">Product Publishing & Catalog Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/#shop"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3.5 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Store
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Lock / Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 lg:px-12 pt-8">
        {/* Metric Cards & Action Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-zinc-900 border-zinc-800 p-5 rounded-xl">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
              Published Products
            </span>
            <div className="text-3xl font-light text-white">
              {products.filter((p) => p.status === "published").length}
              <span className="text-xs text-zinc-500 font-normal ml-2">
                / {products.length} total
              </span>
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-5 rounded-xl">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
              Active Categories
            </span>
            <div className="text-3xl font-light text-white">
              {new Set(products.map((p) => p.category)).size}
            </div>
          </Card>

          <div className="flex flex-col justify-center">
            <Button
              onClick={openAddModal}
              className="w-full h-full min-h-[56px] bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Publish New Product
            </Button>
          </div>
        </div>

        {/* Search, Filter & Quick Options */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <Input
                placeholder="Search products or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-950 border-zinc-800 pl-9 text-xs py-2 text-white placeholder:text-zinc-500"
              />
            </div>

            <Select
              value={selectedCategoryFilter}
              onValueChange={setSelectedCategoryFilter}
            >
              <SelectTrigger className="w-[180px] bg-zinc-950 border-zinc-800 text-xs text-zinc-300">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white text-xs">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Laptops">Laptops</SelectItem>
                <SelectItem value="Workstations">Workstations</SelectItem>
                <SelectItem value="Servers & Network">Servers & Network</SelectItem>
                <SelectItem value="Monitors & Smart Office">Monitors & Smart Office</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetCatalog}
              className="text-[11px] border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>

        {/* Product List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl">
            <Laptop className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-normal text-zinc-300 mb-1">No products found</h3>
            <p className="text-xs text-zinc-500 mb-6">
              Start publishing laptops, workstations, or IT hardware to your store.
            </p>
            <Button onClick={openAddModal} size="sm" className="bg-white text-black text-xs font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Add Product Now
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-zinc-900 border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all"
              >
                <div>
                  {/* Image container with chosen Aspect Ratio & Crop */}
                  <div className={`relative w-full ${getRatioClass(product.aspectRatio)} bg-zinc-950 overflow-hidden`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full transition-transform duration-500 hover:scale-105 ${getFitClass(product.imageFit)} ${getPosClass(product.imagePosition)}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                      }}
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap max-w-[80%]">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-medium">
                        {product.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800/80 backdrop-blur-md text-zinc-300 font-mono">
                        {product.aspectRatio || "16:9"}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary text-white font-semibold">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleStatus(product)}
                      className={`absolute top-3 right-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full transition-colors ${
                        product.status === "published"
                          ? "bg-emerald-500/90 text-black hover:bg-emerald-400"
                          : "bg-zinc-800/90 text-zinc-400 hover:bg-zinc-700"
                      }`}
                    >
                      {product.status === "published" ? "Live" : "Draft"}
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-lg font-semibold text-white tracking-tight">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-medium text-zinc-100 mb-2 leading-snug line-clamp-1">
                      {product.name}
                    </h4>

                    <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-3">
                      {product.specs}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-zinc-950/60 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500">
                    ID: {product.id.slice(0, 10)}...
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditModal(product)}
                      className="h-8 px-2.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      className="h-8 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* ==================== 3. PRODUCT PUBLISH / EDIT MODAL ==================== */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {editingId ? "Edit Product Details" : "Publish New Store Product"}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Product appears instantly in the REEL Tech Hub store upon saving.
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-300">Product Title / Model *</Label>
                    <Input
                      placeholder="e.g. Dell Latitude 7420 Laptop"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-zinc-950 border-zinc-800 text-xs py-2 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-300">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(val: Product["category"]) =>
                        setFormData({ ...formData, category: val })
                      }
                    >
                      <SelectTrigger className="bg-zinc-950 border-zinc-800 text-xs text-white">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white text-xs">
                        <SelectItem value="Laptops">Laptops</SelectItem>
                        <SelectItem value="Workstations">Workstations</SelectItem>
                        <SelectItem value="Servers & Network">Servers & Network</SelectItem>
                        <SelectItem value="Monitors & Smart Office">Monitors & Smart Office</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-300">Selling Price *</Label>
                    <Input
                      placeholder="e.g. ₦480,000 or $650"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="bg-zinc-950 border-zinc-800 text-xs py-2 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-300">Original Price (Discount)</Label>
                    <Input
                      placeholder="e.g. ₦540,000 (Optional)"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, originalPrice: e.target.value })
                      }
                      className="bg-zinc-950 border-zinc-800 text-xs py-2 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-300">Stock Badge</Label>
                    <Input
                      placeholder="e.g. In Stock / Best Seller"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="bg-zinc-950 border-zinc-800 text-xs py-2 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-300">Key Hardware Specifications *</Label>
                  <Input
                    placeholder="e.g. Core i7 11th Gen • 16GB RAM • 512GB SSD • 14-inch FHD"
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    required
                    className="bg-zinc-950 border-zinc-800 text-xs py-2 text-white"
                  />
                </div>

                {/* Product Image Section */}
                <div className="space-y-2">
                  <Label className="text-xs text-zinc-300">Product Image URL or Upload</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Paste image link or upload below..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="bg-zinc-950 border-zinc-800 text-xs py-2 text-white flex-1"
                    />
                    <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-3 py-2 rounded-md flex items-center gap-1.5 shrink-0 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileUpload}
                      />
                    </label>
                  </div>

                  {/* Preset Quick Select */}
                  <div className="pt-2">
                    <span className="text-[10px] text-zinc-500 block mb-1.5">
                      Or pick from high-res presets:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: preset.url })}
                          className={`text-[10px] px-2.5 py-1 rounded-md border transition-all ${
                            formData.image === preset.url
                              ? "bg-white text-black border-white font-medium"
                              : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600"
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aspect Ratio & Cropping Controls */}
                  <div className="mt-4 p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Crop className="w-4 h-4 text-white" />
                        <span className="text-xs font-semibold text-white uppercase tracking-wider">
                          Aspect Ratio & Cropping Controls
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400">
                        Controls how image appears on website
                      </span>
                    </div>

                    {/* Step 1: Aspect Ratio Selection */}
                    <div>
                      <Label className="text-[11px] text-zinc-300 font-medium block mb-1.5">
                        1. Choose Aspect Ratio:
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(["16:9", "4:3", "1:1", "3:2"] as const).map((ratio) => (
                          <button
                            key={ratio}
                            type="button"
                            onClick={() => setFormData({ ...formData, aspectRatio: ratio })}
                            className={`py-2 px-3 rounded-lg border text-xs flex flex-col items-center gap-0.5 transition-all ${
                              formData.aspectRatio === ratio
                                ? "bg-white text-black border-white font-semibold shadow-md"
                                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                            }`}
                          >
                            <span className="font-mono text-xs">{ratio}</span>
                            <span className="text-[9px] opacity-75">
                              {ratio === "16:9"
                                ? "Widescreen"
                                : ratio === "4:3"
                                ? "Standard"
                                : ratio === "1:1"
                                ? "Square"
                                : "Classic"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Crop Mode & Anchor */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[11px] text-zinc-300 font-medium block mb-1.5">
                          2. Crop / Fit Mode:
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, imageFit: "cover" })}
                            className={`py-2 px-2.5 rounded-lg border text-xs transition-all ${
                              formData.imageFit === "cover"
                                ? "bg-white text-black border-white font-medium shadow-sm"
                                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                            }`}
                          >
                            Crop to Fill
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, imageFit: "contain" })}
                            className={`py-2 px-2.5 rounded-lg border text-xs transition-all ${
                              formData.imageFit === "contain"
                                ? "bg-white text-black border-white font-medium shadow-sm"
                                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                            }`}
                          >
                            Fit Whole Photo
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-[11px] text-zinc-300 font-medium block mb-1.5">
                          3. Crop Focus / Anchor:
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["top", "center", "bottom"] as const).map((pos) => (
                            <button
                              key={pos}
                              type="button"
                              onClick={() => setFormData({ ...formData, imagePosition: pos })}
                              className={`py-2 px-2 rounded-lg border text-xs uppercase tracking-wider transition-all ${
                                formData.imagePosition === pos
                                  ? "bg-white text-black border-white font-medium shadow-sm"
                                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                              }`}
                            >
                              {pos}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Live Crop Preview Box */}
                    {formData.image && (
                      <div className="pt-2 border-t border-zinc-800/80">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] text-zinc-400">
                            Live Aspect Ratio & Crop Result:
                          </span>
                          <span className="text-[10px] text-zinc-300 font-mono bg-zinc-800 px-2 py-0.5 rounded">
                            {formData.aspectRatio} • {formData.imageFit === "cover" ? "CROP FILL" : "FIT WHOLE"} • {formData.imagePosition.toUpperCase()}
                          </span>
                        </div>

                        <div className="w-full flex items-center justify-center p-3 bg-black/60 rounded-xl border border-zinc-800/80">
                          <div
                            className={`max-w-md w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 relative shadow-inner transition-all duration-300 ${
                              formData.aspectRatio === "16:9"
                                ? "aspect-[16/9]"
                                : formData.aspectRatio === "4:3"
                                ? "aspect-[4/3] max-w-[340px]"
                                : formData.aspectRatio === "1:1"
                                ? "aspect-square max-w-[260px]"
                                : "aspect-[3/2] max-w-[360px]"
                            }`}
                          >
                            <img
                              src={formData.image}
                              alt="Crop Preview"
                              className={`w-full h-full transition-all duration-300 ${
                                formData.imageFit === "contain"
                                  ? "object-contain p-3 bg-zinc-950"
                                  : "object-cover"
                              } ${
                                formData.imagePosition === "top"
                                  ? "object-top"
                                  : formData.imagePosition === "bottom"
                                  ? "object-bottom"
                                  : "object-center"
                              }`}
                            />
                            <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-sm text-[9px] px-2 py-0.5 rounded text-white font-mono">
                              {formData.aspectRatio}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-300">Detailed Description</Label>
                  <Textarea
                    placeholder="Enter corporate warranty details, condition, battery health, or accessories included..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-zinc-950 border-zinc-800 text-xs text-white resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="status-publish"
                      checked={formData.status === "published"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.checked ? "published" : "draft",
                        })
                      }
                      className="rounded bg-zinc-950 border-zinc-700"
                    />
                    <label htmlFor="status-publish" className="text-xs text-zinc-300 cursor-pointer">
                      Publish live on website immediately
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFormOpen(false)}
                      className="text-xs text-zinc-400"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-white text-black hover:bg-zinc-200 text-xs font-semibold px-6 py-2"
                    >
                      {editingId ? "Save Changes" : "Publish Product"}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
