"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message received. Our herbal expert will contact you soon.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen bg-earth-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-earth-900 mb-6 tracking-tight">
            We&apos;re Here to <span className="text-primary italic font-serif">Assist</span>
          </h1>
          <p className="text-earth-500 max-w-2xl mx-auto font-medium text-lg">
            Have questions about our traditional remedies or need help with your wellness journey? Our experts are ready to guide you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white p-10 rounded-[2.5rem] border border-earth-100 shadow-2xl shadow-earth-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MessageSquare className="w-32 h-32" />
            </div>
            
            <h2 className="text-3xl font-black text-earth-900 mb-8 tracking-tight">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Full Name</label>
                  <input 
                    required 
                    className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all placeholder:text-earth-300" 
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all placeholder:text-earth-300" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-earth-400 uppercase tracking-wider ml-1">How can we help?</label>
                <textarea 
                  required 
                  className="w-full bg-earth-50/50 p-4 border border-earth-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white focus:outline-none transition-all h-40 resize-none placeholder:text-earth-300" 
                  placeholder="Share your thoughts or questions..."
                ></textarea>
              </div>

              <button 
                disabled={isSubmitting} 
                type="submit" 
                className="w-full bg-earth-900 text-white p-5 rounded-2xl font-black text-lg hover:bg-primary transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-earth-900/20 active:scale-[0.98] disabled:opacity-70 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Deliver Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-primary-950 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-primary-950/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/40 transition-colors duration-700" />
              
              <h2 className="text-3xl font-black mb-10 tracking-tight relative z-10">Direct Support</h2>
              <div className="space-y-10 relative z-10">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-xl group-hover:bg-primary transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Support</h3>
                    <p className="text-white/60 font-medium">support@g4naturals.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-xl group-hover:bg-primary transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone Helpline</h3>
                    <p className="text-white/60 font-medium">+91 98765 43210</p>
                    <p className="text-[10px] uppercase font-black text-primary-400 mt-2 tracking-widest bg-white/5 inline-block px-2 py-1 rounded">Available 9AM - 6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-xl group-hover:bg-primary transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Main Headquarters</h3>
                    <p className="text-white/60 font-medium leading-relaxed">
                      123 Herbal Valley, Natural Street<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-earth-100 shadow-sm">
              <h3 className="font-bold text-xl text-earth-900 mb-6 tracking-tight">Our Schedule</h3>
              <div className="space-y-4">
                {[
                  { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                  { days: "Saturday", hours: "10:00 AM - 2:00 PM" },
                  { days: "Sunday", hours: "Closed" }
                ].map((item: { days: string; hours: string }, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-earth-50 last:border-0">
                    <span className="text-earth-500 font-medium">{item.days}</span>
                    <span className="text-earth-900 font-bold text-sm">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

