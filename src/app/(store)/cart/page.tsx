"use client";

import { useState, useEffect } from "react";
import { useCartStore, CartItem } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, ShieldCheck, Truck } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen bg-earth-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Your Selection
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-earth-900 tracking-tight">Shopping Bag</h1>
          </div>
          <p className="text-earth-500 font-medium">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-earth-100 shadow-2xl shadow-earth-200/50">
            <div className="w-24 h-24 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-earth-300" />
            </div>
            <h2 className="text-3xl font-black text-earth-900 mb-4">Your bag is empty</h2>
            <p className="text-earth-500 mb-10 max-w-md mx-auto font-medium">
              Discover our curated collection of traditional remedies and start your wellness journey today.
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-earth-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl shadow-earth-900/20 active:scale-95">
              Explore Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item: CartItem) => (
                <div key={item.product.id} className="group bg-white p-6 rounded-[2rem] border border-earth-100 shadow-sm hover:shadow-xl hover:shadow-earth-200/50 transition-all duration-500 flex gap-6">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-earth-50 rounded-2xl overflow-hidden shrink-0">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-earth-200">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-grow justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded">
                          {item.product.category}
                        </span>
                        <Link href={`/product/${item.product.slug}`} className="block mt-2">
                          <h3 className="font-black text-xl text-earth-900 hover:text-primary transition-colors line-clamp-1">{item.product.name}</h3>
                        </Link>
                        <p className="text-earth-400 text-sm mt-1 font-medium">In Stock: {item.product.stock}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="w-10 h-10 rounded-full bg-earth-50 text-earth-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <div className="flex items-center gap-4 bg-earth-50 p-1.5 rounded-xl border border-earth-100">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-earth-600 active:scale-90"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-black text-earth-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.min(item.product.stock || 99, item.quantity + 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-earth-600 active:scale-90"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-earth-900 tracking-tight">₹{item.product.price * item.quantity}</p>
                        <p className="text-[10px] text-earth-400 font-bold uppercase tracking-wider">₹{item.product.price} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-earth-100/50 p-6 rounded-2xl border border-dashed border-earth-200 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <p className="text-sm text-earth-600 font-medium">
                  Add <span className="font-bold text-earth-900">₹{Math.max(0, 1000 - getCartTotal())}</span> more to your bag for <span className="text-primary font-bold">Free Express Shipping</span>.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2.5rem] border border-earth-100 shadow-2xl shadow-earth-200/50 p-10 sticky top-32">
                <h3 className="text-2xl font-black text-earth-900 mb-8 tracking-tight">Order Summary</h3>

                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-center text-earth-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-earth-900 font-bold">₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between items-center text-earth-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-primary font-bold uppercase text-xs tracking-wider">Calculated at Checkout</span>
                  </div>
                  <div className="flex justify-between items-center text-earth-500 font-medium">
                    <span>Estimated GST (5%)</span>
                    <span className="text-earth-900 font-bold">₹{Math.round(getCartTotal() * 0.05)}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-earth-50 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-lg text-earth-400">Total</span>
                    <span className="font-black text-4xl text-earth-900 tracking-tighter">₹{getCartTotal() + Math.round(getCartTotal() * 0.05)}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout" 
                  className="w-full bg-earth-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-primary transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-earth-900/20 active:scale-95 group"
                >
                  Secure Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="mt-8 flex items-center justify-center gap-3 text-earth-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">100% Secure Transaction</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

