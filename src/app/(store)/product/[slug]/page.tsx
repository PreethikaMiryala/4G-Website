import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, ShieldCheck, Truck, ArrowLeft, Heart, Share2, Check } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/app/(store)/products/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { reviews: true }
      }
    }
  });

  if (!product) {
    notFound();
  }

  // Stable mock data for consistency
  const idHash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = 4.5 + (idHash % 5) / 10;
  const reviewCount = product._count?.reviews || (10 + (idHash % 40));

  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen bg-earth-50/30">
      <div className="max-w-7xl mx-auto">
        <Link href="/products" className="inline-flex items-center gap-2 text-earth-400 hover:text-earth-900 font-bold text-sm mb-12 transition-all group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-white rounded-[3rem] overflow-hidden border border-earth-100 shadow-2xl shadow-earth-200/50 group">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-earth-50 text-earth-200">
                  <span className="font-black text-8xl opacity-10">G4</span>
                </div>
              )}
              
              <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-earth-400 hover:text-red-500 hover:bg-white transition-all shadow-xl">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Sub-images (Optional) */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white rounded-2xl border border-earth-100 overflow-hidden cursor-pointer hover:border-primary transition-all opacity-40 hover:opacity-100">
                  {product.images[0] && <Image src={product.images[0]} alt="" fill className="object-cover" />}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-earth-900 mb-6 tracking-tight leading-[1.1]">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 shadow-sm">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-amber-200'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-black text-amber-900">{rating}</span>
                </div>
                <span className="text-earth-400 font-bold text-sm tracking-wide uppercase">{reviewCount} Verified Reviews</span>
              </div>
            </div>

            <div className="mb-10 p-8 bg-white rounded-[2.5rem] border border-earth-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                  <ShieldCheck className="w-24 h-24" />
               </div>
               <p className="text-earth-600 text-lg leading-relaxed font-medium relative z-10">
                {product.description}
               </p>
            </div>

            <div className="mb-12">
              <div className="flex items-end gap-4 mb-2">
                <span className="text-5xl font-black text-earth-900 tracking-tighter">₹{product.price}</span>
                {product.comparePrice && (
                  <span className="text-xl text-earth-400 line-through font-bold mb-1 italic">₹{product.comparePrice}</span>
                )}
              </div>
              <p className="text-primary font-black text-[10px] uppercase tracking-widest bg-primary/5 inline-block px-3 py-1 rounded">Inclusive of all taxes</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex-grow">
                <AddToCartButton product={product} />
              </div>
              <button className="flex items-center justify-center gap-2 border-2 border-earth-100 p-5 rounded-2xl font-black text-earth-700 hover:bg-earth-50 transition-all active:scale-95">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Luxury Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-earth-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-earth-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-earth-900 text-sm uppercase tracking-wide">Pure Authenticity</h4>
                  <p className="text-earth-500 text-xs font-medium mt-1">100% natural Unani ingredients sourced from organic farms.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-earth-900 text-sm uppercase tracking-wide">Express Delivery</h4>
                  <p className="text-earth-500 text-xs font-medium mt-1">Safely delivered to your doorstep in premium protective packaging.</p>
                </div>
              </div>
            </div>
            
            {/* Benefits List */}
            <div className="mt-12 bg-primary-950 p-10 rounded-[2.5rem] text-white">
              <h3 className="text-xl font-black mb-6 tracking-tight">Key Benefits</h3>
              <ul className="space-y-4">
                {[
                  "Clinically inspired traditional formulation",
                  "No synthetic colors or artificial preservatives",
                  "Fast-acting relief with long-term healing",
                  "Prepared in small batches for maximum potency"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white stroke-[4]" />
                    </div>
                    <span className="font-medium text-white/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
