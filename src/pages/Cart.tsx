import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  Phone,
  User,
  MapPin,
  FileText,
} from "lucide-react";
import { useCart, formatNaira } from "@/context/CartContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "2348067029444";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let message = `*REEL TECH HUB — HARDWARE ORDER*\n`;
    message += `════════════════════════════════\n\n`;

    if (customerName.trim()) {
      message += `👤 *Customer:* ${customerName.trim()}\n`;
    }
    if (customerPhone.trim()) {
      message += `📞 *Phone:* ${customerPhone.trim()}\n`;
    }
    if (deliveryAddress.trim()) {
      message += `📍 *Delivery Location:* ${deliveryAddress.trim()}\n`;
    }
    if (customerName.trim() || customerPhone.trim() || deliveryAddress.trim()) {
      message += `\n`;
    }

    message += `📋 *ORDER ITEMS (${cartCount} items):*\n`;
    cart.forEach((item, idx) => {
      const lineTotal = item.priceNumber > 0 ? formatNaira(item.priceNumber * item.quantity) : "Quote Requested";
      const unitStr = item.priceNumber > 0 ? formatNaira(item.priceNumber) : item.price || "Contact for price";
      message += `${idx + 1}. *${item.name}*\n`;
      if (item.category) message += `   • Category: ${item.category}\n`;
      if (item.specs) message += `   • Specs: ${item.specs}\n`;
      message += `   • Quantity: ${item.quantity} × ${unitStr} = *${lineTotal}*\n\n`;
    });

    message += `════════════════════════════════\n`;
    message += `💰 *TOTAL ESTIMATED AMOUNT:* *${cartTotal > 0 ? formatNaira(cartTotal) : "Pending Final Quote"}*\n`;
    message += `════════════════════════════════\n\n`;

    if (notes.trim()) {
      message += `📝 *Order Note:* ${notes.trim()}\n\n`;
    }

    message += `Please confirm product availability, payment details, and dispatch timeframe. Thank you!`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Cart</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground">
                  Your <span className="font-semibold text-primary">Cart</span>
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {cartCount === 0
                    ? "Your shopping bag is currently empty."
                    : `${cartCount} ${cartCount === 1 ? "hardware item" : "hardware items"} ready for executive dispatch.`}
                </p>
              </div>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-muted-foreground hover:text-red-400 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Entire Cart</span>
                </button>
              )}
            </div>
          </div>

          {/* Empty State */}
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-24 text-center max-w-md mx-auto"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-secondary/40 border border-border flex items-center justify-center text-muted-foreground mb-6 shadow-inner">
                <ShoppingBag className="w-10 h-10 opacity-60 text-primary" />
              </div>
              <h2 className="text-2xl font-light text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light mb-8 leading-relaxed">
                You haven't added any enterprise laptops, workstations, or tech accessories yet. Browse our verified hardware inventory to get started.
              </p>
              <Button
                asChild
                className="rounded-full px-8 py-3 bg-primary text-black font-semibold hover:bg-primary/90 text-xs shadow-lg"
              >
                <Link to="/shop" className="flex items-center gap-2">
                  <span>Browse Tech Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            /* Cart Grid: Items List + Order Summary */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Items List */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                <AnimatePresence>
                  {cart.map((item) => {
                    const itemTotal = item.priceNumber * item.quantity;
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-card border border-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:border-primary/40"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-black/40 border border-border/80 shrink-0 flex items-center justify-center relative">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = "none";
                              }}
                            />
                          ) : (
                            <Sparkles className="w-6 h-6 text-primary/40" />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                {item.category}
                              </span>
                              <h3 className="text-sm sm:text-base font-medium text-foreground tracking-tight mt-1 line-clamp-1">
                                {item.name}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-red-400 p-1 rounded-md transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {item.specs && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-1 font-light">
                              {item.specs}
                            </p>
                          )}

                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-border rounded-lg bg-secondary/30 p-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background/80 rounded transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-9 text-center text-xs font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background/80 rounded transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price / Subtotal */}
                            <div className="text-right">
                              <div className="text-xs text-muted-foreground">
                                {item.quantity > 1 && (
                                  <span>{item.priceNumber > 0 ? formatNaira(item.priceNumber) : item.price} × {item.quantity} = </span>
                                )}
                              </div>
                              <div className="text-base font-semibold text-primary">
                                {item.priceNumber > 0 ? formatNaira(itemTotal) : item.price || "Price on request"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Return to shop */}
                <div className="pt-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Continue Browsing Products</span>
                  </Link>
                </div>
              </div>

              {/* Order Summary & WhatsApp Checkout */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xl space-y-6 sticky top-28">
                  <h2 className="text-lg font-medium text-foreground pb-3 border-b border-border/60 flex items-center justify-between">
                    <span>Order Summary</span>
                    <span className="text-xs text-primary font-bold tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded">
                      {cartCount} {cartCount === 1 ? "Item" : "Items"}
                    </span>
                  </h2>

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Items Subtotal</span>
                      <span className="text-foreground font-semibold">
                        {cartTotal > 0 ? formatNaira(cartTotal) : "Pending"}
                      </span>
                    </div>

                    <div className="flex justify-between text-muted-foreground">
                      <span>Logistics & Handling</span>
                      <span className="text-emerald-400 font-medium">Coordinated on WhatsApp</span>
                    </div>

                    <div className="pt-3 border-t border-border flex justify-between items-baseline">
                      <span className="text-sm font-medium text-foreground">Estimated Total</span>
                      <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
                        {cartTotal > 0 ? formatNaira(cartTotal) : "Quote on confirmation"}
                      </span>
                    </div>
                  </div>

                  {/* Customer Information (Optional details for the generated WhatsApp text) */}
                  <form onSubmit={handleCheckout} className="space-y-3 pt-3 border-t border-border/60">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Your Details (Optional)
                    </p>

                    <div className="space-y-2">
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
                        <Input
                          type="text"
                          placeholder="Your Name / Company"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="pl-9 text-xs bg-secondary/30 border-border"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
                        <Input
                          type="tel"
                          placeholder="Phone / WhatsApp Number"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="pl-9 text-xs bg-secondary/30 border-border"
                        />
                      </div>

                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
                        <Input
                          type="text"
                          placeholder="Delivery City / Address"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="pl-9 text-xs bg-secondary/30 border-border"
                        />
                      </div>

                      <Textarea
                        placeholder="Additional specs or delivery instructions (optional)..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="text-xs bg-secondary/30 border-border min-h-[60px]"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full mt-4 rounded-full py-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Proceed to WhatsApp Checkout</span>
                    </Button>
                  </form>

                  {/* Trust Features */}
                  <div className="space-y-2 pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      <span>100% Genuine, tested enterprise hardware</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-primary shrink-0" />
                      <span>Secure nationwide courier dispatch across Nigeria</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Direct invoice &amp; receipt issued with every order</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
