import React, { createContext, useContext, useState, useEffect } from "react";
import { TechProduct } from "@/services/techProductsService";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: string;
  priceNumber: number;
  originalPrice?: string;
  image: string;
  specs?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: TechProduct, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  formatPrice: (num: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "reel_tech_hub_cart";

export const parseProductPrice = (price?: string | number): number => {
  if (!price) return 0;
  const cleaned = String(price).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

export const formatNaira = (num: number): string => {
  return `₦${Math.round(num).toLocaleString()}`;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Failed to read cart from localStorage:", e);
    }
    return [];
  });

  const [toast, setToast] = useState<{ message: string; show: boolean } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to persist cart:", e);
    }
  }, [cart]);

  const addToCart = (product: TechProduct, quantity = 1) => {
    if (!product || !product.id) return;
    const priceNum = parseProductPrice(product.price);
    const primaryImg = product.image || (product.images && product.images[0]) || "";

    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === product.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category || "Hardware",
          price: product.price,
          priceNumber: priceNum,
          originalPrice: product.originalPrice,
          image: primaryImg,
          specs: product.specs || product.description || "",
          quantity: Math.max(1, quantity),
        },
      ];
    });

    // Show non-blocking feedback toast
    setToast({
      message: product.name,
      show: true,
    });
    setTimeout(() => {
      setToast((t) => (t ? { ...t, show: false } : null));
    }, 2800);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.priceNumber * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        formatPrice: formatNaira,
      }}
    >
      {children}

      {/* Floating Add to Cart Toast Feedback */}
      {toast?.show && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 sm:right-8 z-[250] pointer-events-auto transition-all duration-300 transform translate-y-0 opacity-100"
        >
          <div className="bg-card/95 border border-[#D4AF37]/40 backdrop-blur-xl text-foreground px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-xs font-semibold text-foreground truncate">{toast.message}</p>
              <p className="text-[10px] text-[#D4AF37] font-medium">Added to Cart &bull; {cartCount} total</p>
            </div>
            <a
              href="/cart"
              className="px-3 py-1 bg-primary text-black rounded-full text-[11px] font-bold hover:bg-primary/90 shrink-0 transition-colors shadow-sm"
            >
              View Cart
            </a>
          </div>
        </aside>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
