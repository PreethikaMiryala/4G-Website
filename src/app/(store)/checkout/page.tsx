"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CreditCard, Truck, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Require authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Login is mandatory to place an order.");
      router.push("/login?redirect=/checkout");
    }
  }, [status, router]);

  // Pre-fill form data when session loads
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || session.user.name || "",
        email: prev.email || session.user.email || ""
      }));
    }
  }, [session]);

  if (!isClient || status === "loading" || status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-earth-500 font-medium tracking-widest uppercase text-sm">Securing your checkout...</p>
      </div>
    );
  }

  if (items.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black text-earth-900 mb-4 tracking-tight">Your bag is empty</h1>
        <p className="text-earth-500 mb-8 max-w-md mx-auto">Looks like you haven't added any natural remedies to your cart yet.</p>
        <Link href="/products" className="bg-earth-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition-all shadow-xl shadow-earth-900/20">
          Return to Shop
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.05);
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const payload = {
        totalAmount: total,
        paymentMethod: "COD",
        shippingAddress: formData,
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        }))
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Please log in to place an order.");
          router.push("/login?redirect=/checkout");
          return;
        }
        throw new Error(data.error || "Failed to place order");
      }

      setStep(3);
      clearCart();
      toast.success("Order placed successfully via Cash on Delivery!");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen bg-earth-50/30">
      <div className="max-w-6xl mx-auto">
        {step !== 3 && (
          <div className="flex items-center gap-4 mb-12">
            <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-earth-400 hover:text-earth-900 shadow-sm transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-4xl font-black text-earth-900 tracking-tight">Checkout</h1>
          </div>
        )}

        {step === 3 ? (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-[3rem] border border-earth-100 shadow-2xl shadow-earth-200/50">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-earth-900 mb-4">Order Confirmed!</h2>
            <p className="text-earth-500 mb-10 max-w-md mx-auto font-medium">
              Thank you for choosing G4 Naturals. Your traditional remedies will be prepared with care and shipped shortly.
            </p>
            <div className="space-y-4">
              <Link href="/account" className="block bg-earth-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl shadow-earth-900/20 active:scale-95">
                View My Orders
              </Link>
              <Link href="/" className="block text-earth-400 font-bold hover:text-primary transition-colors">
                Return Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-3 space-y-8">
              {/* Shipping Address */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-earth-100 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black text-earth-900 tracking-tight">Shipping Address</h2>
                </div>

                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Full Name</label>
                      <input 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" 
                        placeholder="Enter your full name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Phone Number</label>
                      <input 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" 
                        placeholder="+91 00000 00000" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Email Address</label>
                    <input 
                      required 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" 
                      placeholder="you@example.com" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Street Address</label>
                    <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="Building, Street, Area" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">City</label>
                      <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="Mumbai" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">State</label>
                      <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="Maharashtra" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Pincode</label>
                      <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="400001" />
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-earth-100 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black text-earth-900 tracking-tight">Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-earth-900">Cash on Delivery</span>
                      <div className="w-5 h-5 rounded-full border-4 border-primary bg-white" />
                    </div>
                    <p className="text-xs text-earth-500 font-medium tracking-wide">PAY AT YOUR DOORSTEP</p>
                  </div>

                  <div className="p-6 rounded-2xl border border-earth-100 opacity-50 grayscale cursor-not-allowed">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-earth-900">Online Payment</span>
                      <div className="w-5 h-5 rounded-full border border-earth-300 bg-white" />
                    </div>
                    <p className="text-xs text-earth-400 font-medium tracking-wide">TEMPORARILY UNAVAILABLE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2.5rem] border border-earth-100 shadow-2xl shadow-earth-200/50 p-10 sticky top-32">
                <h3 className="text-2xl font-black text-earth-900 mb-8 tracking-tight">Review Order</h3>
                
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 bg-earth-50 rounded-xl overflow-hidden shrink-0">
                        {item.product.images[0] && (
                          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-earth-900 text-sm line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-earth-400 font-medium">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-black text-earth-900">₹{item.product.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-earth-50 mb-8">
                  <div className="flex justify-between text-sm font-medium text-earth-500">
                    <span>Subtotal</span>
                    <span className="text-earth-900 font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-earth-500">
                    <span>Shipping</span>
                    <span className={cn("font-bold uppercase text-[10px] tracking-wider", shipping === 0 ? "text-primary" : "text-earth-900")}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-earth-500">
                    <span>GST (5%)</span>
                    <span className="text-earth-900 font-bold">₹{tax}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-earth-50 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-lg text-earth-400">Grand Total</span>
                    <span className="font-black text-4xl text-earth-900 tracking-tighter">₹{total}</span>
                  </div>
                </div>

                <button 
                  form="checkout-form"
                  type="submit"
                  disabled={isProcessing}
                  className={cn(
                    "w-full bg-earth-900 text-white py-5 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl group",
                    isProcessing ? "opacity-70 cursor-not-allowed" : "hover:bg-primary shadow-earth-900/20 active:scale-95"
                  )}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                  {!isProcessing && <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                </button>

                <div className="mt-8 flex items-center justify-center gap-3 text-earth-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Guaranteed Herbal Authenticity
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
