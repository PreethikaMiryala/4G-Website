"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, Save, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddAddressPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulated save
    setTimeout(() => {
      toast.success("Address saved successfully!");
      router.push("/account#addresses");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen bg-earth-50/30">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-earth-400 hover:text-earth-900 shadow-sm transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-4xl font-black text-earth-900 tracking-tight">Add New Address</h1>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-earth-100 shadow-2xl shadow-earth-200/50">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-earth-900">Delivery Location</h2>
              <p className="text-earth-500 text-sm font-medium">Please provide your accurate shipping details.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Address Label</label>
              <div className="flex gap-4">
                {["Home", "Work", "Other"].map((label) => (
                  <label key={label} className="flex-1 cursor-pointer">
                    <input type="radio" name="label" value={label} className="peer hidden" defaultChecked={label === "Home"} />
                    <div className="text-center py-3 rounded-xl border border-earth-100 bg-earth-50 peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all font-bold text-sm">
                      {label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">First Name</label>
                <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Last Name</label>
                <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Street Address</label>
              <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="Flat / House No / Street Name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 lg:col-span-1">
                <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">City</label>
                <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="City" />
              </div>
              <div className="space-y-2 lg:col-span-1">
                <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">State</label>
                <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="State" />
              </div>
              <div className="space-y-2 lg:col-span-1">
                <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Pincode</label>
                <input required className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all" placeholder="000000" />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <div className="w-10 h-10 bg-earth-50 rounded-full flex items-center justify-center text-earth-400">
                <Globe className="w-5 h-5" />
              </div>
              <p className="text-xs text-earth-500 font-medium">Currently shipping across <span className="font-bold text-earth-900 uppercase">India</span> only.</p>
            </div>

            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full bg-earth-900 text-white p-5 rounded-2xl font-black text-lg hover:bg-primary transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-earth-900/20 active:scale-95 group"
            >
              {isSubmitting ? "Saving..." : (
                <>
                  <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Save Address
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
