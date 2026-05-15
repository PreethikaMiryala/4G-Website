import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, Truck, Droplet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "./products/ProductCard";
import { Product } from "@/types";

export default async function Home() {
  let featuredProducts: Product[] = [];
  try {
    featuredProducts = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { reviews: true }
        }
      }
    }) as any;
  } catch (error) {
    console.error("Database unreachable during build for Home:", error);
  }

  return (
    <div className="flex flex-col gap-20 pb-0">
      {/* Light & Airy Hero Section */}
      <section className="relative h-screen min-h-[700px] max-h-[900px] flex items-center bg-earth-50 pt-20 overflow-hidden">
        {/* Subtle Background Texture/Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Natural herbs background"
            fill
            className="object-cover opacity-[0.15] animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-50 via-earth-50/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-50 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="md:w-[55%] text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-earth-200">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold tracking-[0.2em] text-earth-600 uppercase">100% Natural & Homemade</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-earth-900 tracking-tight leading-[1.05]">
              Healing Through <br />
              <span className="text-primary font-serif italic font-light">Nature&apos;s Essence</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-earth-600 max-w-xl font-medium leading-relaxed">
              Premium Unani medicines crafted to provide instant relief for pain, cold, and cough. Experience the pure power of authentic herbal wellness.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/products"
                className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-600 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                Shop Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto bg-white text-earth-900 border border-earth-200 px-10 py-4 rounded-full font-bold text-lg hover:bg-earth-50 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm"
              >
                Our Heritage
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-8 border-t border-earth-200/60 max-w-md">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i: number) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-earth-50 bg-earth-200 flex items-center justify-center text-xs font-bold text-earth-600 overflow-hidden relative shadow-sm">
                    <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} fill className="object-cover" alt="User" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-earth-50 bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shadow-sm z-10">
                  +2k
                </div>
              </div>
              <p className="text-sm font-medium text-earth-600 leading-tight">
                Trusted by thousands <br/><span className="font-bold text-earth-900">across India</span>
              </p>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="md:w-[45%] hidden md:flex justify-end relative">
            <div className="relative w-[450px] h-[600px] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl animate-fade-in-up delay-200 rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1611077544760-496bcbd11612?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Herbal Ingredients"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Element 1 */}
            <div className="absolute top-20 -left-12 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Droplet className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-earth-900 leading-tight">Pure Oil</p>
                <p className="text-earth-500 font-medium text-xs">Cold Pressed</p>
              </div>
            </div>
            {/* Floating Element 2 */}
            <div className="absolute -bottom-8 left-10 bg-white p-6 rounded-3xl shadow-2xl border border-earth-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-earth-900 text-lg leading-tight">Guaranteed</p>
                <p className="text-earth-500 font-medium text-sm">Authentic Unani</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 mt-[-4rem] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
          ].map((feature: { icon: any; title: string; desc: string }, i: number) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-8 sm:p-10 rounded-[2rem] bg-white shadow-xl shadow-earth-100/50 border border-earth-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-earth-200/50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-earth-50 group-hover:bg-primary text-primary group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transform rotate-3 group-hover:rotate-6 transition-all duration-300">
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-earth-900 mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-earth-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 pt-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Premium Selection</span>
            <h2 className="text-3xl sm:text-5xl font-black text-earth-900 mb-2 tracking-tight">Our Bestsellers</h2>
            <p className="text-earth-500 font-medium text-lg">Discover our most loved natural remedies</p>
          </div>
          <Link href="/products" className="text-earth-900 hover:text-primary font-black flex items-center gap-2 group bg-earth-100 hover:bg-primary/10 px-6 py-3 rounded-full transition-colors">
            View All Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-earth-100/50 py-24 mt-10">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-black text-earth-900 mb-4 tracking-tight">Trusted by Thousands</h2>
          <p className="text-earth-500 font-medium mb-16 max-w-2xl mx-auto text-lg">Real stories from real people who found relief through our authentic remedies.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i: number) => (
              <div key={i} className="bg-white border border-earth-200 p-10 rounded-3xl text-left shadow-xl shadow-earth-200/30 hover:-translate-y-2 transition-transform duration-300">
                <div className="flex text-yellow-400 mb-6 gap-1">{"★".repeat(5)}</div>
                <p className="text-earth-600 mb-8 font-medium leading-relaxed italic text-lg">
                  &quot;The pain relief oil from G4 Naturals works like magic. It provided immediate relief for my chronic joint pain. Highly recommended!&quot;
                </p>
                <div className="flex items-center gap-4 border-t border-earth-100 pt-6">
                  <div className="w-12 h-12 bg-earth-100 rounded-full flex items-center justify-center font-black text-earth-400 overflow-hidden relative">
                    <Image src={`https://i.pravatar.cc/100?img=${i + 20}`} fill className="object-cover" alt="Customer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-earth-900">Customer {i}</h4>
                    <p className="text-xs font-black text-primary uppercase tracking-widest">Verified Buyer</p>
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
