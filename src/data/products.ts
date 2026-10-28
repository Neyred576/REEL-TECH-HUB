export interface Product {
  id: string;
  name: string;
  category: "Laptops" | "Workstations" | "Servers & Network" | "Monitors & Smart Office" | "Accessories";
  price: string;
  originalPrice?: string;
  specs: string;
  description: string;
  image: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "3:2";
  imageFit?: "cover" | "contain";
  imagePosition?: "center" | "top" | "bottom";
  badge?: string;
  status: "published" | "draft";
  createdAt: string;
}

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod-dell-latitude-5420",
    name: "Dell Latitude 5420 Enterprise Laptop",
    category: "Laptops",
    price: "₦480,000",
    originalPrice: "₦540,000",
    specs: "Intel Core i7 11th Gen • 16GB RAM • 512GB NVMe SSD • 14\" FHD Anti-Glare",
    description: "Enterprise fleet-grade laptop engineered for durability, all-day battery life, Wi-Fi 6, and Dell SafeID security hardware.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "16:9",
    imageFit: "cover",
    imagePosition: "center",
    badge: "In Stock",
    status: "published",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-hp-elitebook-840-g8",
    name: "HP EliteBook 840 G8 Executive Laptop",
    category: "Laptops",
    price: "₦560,000",
    originalPrice: "₦620,000",
    specs: "Intel Core i7 11th Gen • 32GB RAM • 512GB SSD • Bang & Olufsen Audio",
    description: "Premium ultralight aluminum corporate laptop designed for executives and managers demanding seamless multi-tasking.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "16:9",
    imageFit: "cover",
    imagePosition: "center",
    badge: "Best Seller",
    status: "published",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-lenovo-thinkpad-t14",
    name: "Lenovo ThinkPad T14 Gen 2",
    category: "Laptops",
    price: "₦520,000",
    specs: "AMD Ryzen 7 PRO / Core i7 • 16GB RAM • 512GB SSD • Legendary Keyboard",
    description: "MIL-SPEC tested corporate workhorse built for software developers, financial analysts, and corporate travel.",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "16:9",
    imageFit: "cover",
    imagePosition: "center",
    badge: "Enterprise Fleet",
    status: "published",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-dell-precision-3650",
    name: "Dell Precision 3650 Tower Workstation",
    category: "Workstations",
    price: "₦980,000",
    originalPrice: "₦1,150,000",
    specs: "Intel Core i9 11th Gen • 64GB RAM • 1TB NVMe SSD + 2TB HDD • NVIDIA RTX Graphics",
    description: "ISV-certified desktop powerhouse built for heavy architectural CAD, 3D modeling, deep learning, and continuous 24/7 compute.",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "16:9",
    imageFit: "cover",
    imagePosition: "center",
    badge: "High Performance",
    status: "published",
    createdAt: new Date().toISOString(),
  },
];

const STORAGE_KEY = "reel_tech_hub_products";

/**
 * Automatically compress uploaded user photos via HTML5 Canvas
 * Reduces a 3-5MB photo down to ~40KB-70KB so browser localStorage never fills up!
 */
export const compressImage = (file: File, maxWidth = 800, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.onerror = () => reject(new Error("Failed to load image file."));
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const getStoredProducts = (): Product[] => {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return DEFAULT_PRODUCTS;
  } catch (err) {
    console.error("Failed to load products from localStorage", err);
    return DEFAULT_PRODUCTS;
  }
};

export const saveProductsToStorage = (products: Product[]): boolean => {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event("reel_products_updated"));
    return true;
  } catch (err) {
    console.error("Failed to save products to localStorage", err);
    return false;
  }
};

export const addProduct = (product: Omit<Product, "id" | "createdAt">): Product | null => {
  const current = getStoredProducts();
  const newProduct: Product = {
    ...product,
    aspectRatio: product.aspectRatio || "16:9",
    imageFit: product.imageFit || "cover",
    imagePosition: product.imagePosition || "center",
    status: product.status || "published",
    id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newProduct, ...current];
  const success = saveProductsToStorage(updated);
  if (!success) {
    console.error("Could not save new product to storage");
    return null;
  }
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): boolean => {
  const current = getStoredProducts();
  const index = current.findIndex((p) => p.id === id);
  if (index === -1) return false;
  current[index] = { ...current[index], ...updates };
  return saveProductsToStorage(current);
};

export const deleteProduct = (id: string): boolean => {
  const current = getStoredProducts();
  const filtered = current.filter((p) => p.id !== id);
  return saveProductsToStorage(filtered);
};

export const resetProducts = () => {
  saveProductsToStorage(DEFAULT_PRODUCTS);
};
