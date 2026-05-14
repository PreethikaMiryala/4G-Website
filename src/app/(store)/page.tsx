import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-primary-950">
          <Image
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Natural herbs background"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium tracking-wider mb-6">
            100% NATURAL & HOMEMADE
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Healing Through <br />
            <span className="text-primary-400">Nature&apos;s Essence</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-50 max-w-2xl mx-auto mb-10 font-light">
            Premium Unani medicines crafted to provide instant relief for pain, cold, and cough. Experience the pure power of herbal wellness.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary-600 transition-all flex items-center gap-2"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
          {[
            {
              icon: Leaf,
              title: "100% Natural",
              desc: "Pure, potent herbal ingredients with zero synthetic chemicals.",
            },
            {
              icon: ShieldCheck,
              title: "Trusted Quality",
              desc: "Authentic Unani formulations crafted with generations of wisdom.",
            },
            {
              icon: Truck,
              title: "Fast Delivery",
              desc: "Safe & quick delivery straight to your doorstep across India.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border border-earth-100 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-earth-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder for Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Bestsellers</h2>
            <p className="text-earth-500">Discover our most loved natural remedies</p>
          </div>
          <Link href="/products" className="text-primary hover:underline font-medium hidden sm:block">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Dummy placeholders - will be replaced with real product cards */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-earth-100 aspect-[3/4] rounded-2xl" />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary-950 py-20 text-white mt-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Trusted by Thousands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-left">
                <div className="flex text-yellow-400 mb-4">{"★".repeat(5)}</div>
                <p className="text-white/80 mb-6 font-light leading-relaxed">
                  &quot;The pain relief oil from G4 Naturals works like magic. It provided immediate relief for my chronic joint pain. Highly recommended!&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full" />
                  <div>
                    <h4 className="font-medium">Customer {i}</h4>
                    <p className="text-sm text-white/50">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
