export interface Product {
  id: string;
  name: string;
  category: "Laptops" | "Workstations" | "Servers & Network" | "Monitors & Smart Office" | "Accessories" | "Mobile Phones";
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

// Products list cleared - ready for user inventory
export const DEFAULT_PRODUCTS: Product[] = [];

const STORAGE_KEY = "reel_tech_hub_catalog";

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
    // Clear legacy demo keys if present in browser storage
    localStorage.removeItem("reel_tech_hub_products");
    localStorage.removeItem("reel_products");

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
