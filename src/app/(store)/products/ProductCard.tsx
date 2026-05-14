"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@prisma/client";
import AddToCartButton from "./AddToCartButton";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product & {
    _count?: {
      reviews: number;
    };
    avgRating?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Use a stable seed based on product ID for mock data to avoid hydration mismatch
  const idHash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Stable mock rating if not available
  const rating = product.avgRating || (4.5 + (idHash % 5) / 10);
  // Stable mock review count if not available
  const reviewCount = product._count?.reviews || (10 + (idHash % 40));
  
  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) 
    : 0;

  return (
    <div className="group bg-white rounded-3xl border border-earth-100/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 flex flex-col h-full relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-20 bg-earth-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
          {discount}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={cn(
          "absolute top-4 right-4 z-20 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-sm",
          isWishlisted 
            ? "bg-red-50 text-red-500" 
            : "bg-white/80 text-earth-400 hover:text-red-500 hover:bg-white"
        )}
      >
        <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
      </button>

      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-earth-50">
        {product.images[0] ? (
          <Image 
            src={product.images[0]} 
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-earth-100 text-earth-300">
            <ShoppingCart className="w-16 h-16 opacity-20" />
          </div>
        )}
        
        {/* Quick View Overlay (Visual only) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="bg-white text-earth-900 px-6 py-2.5 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
            Quick View
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-1 rounded">
            {product.category}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-amber-900">{rating}</span>
            <span className="text-[9px] text-amber-700/60 font-medium">({reviewCount})</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="font-bold text-xl text-earth-900 mb-2 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-earth-500 line-clamp-2 mb-6 leading-relaxed font-medium min-h-[40px]">
          {product.description}
        </p>

        <div className="mt-auto flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-earth-900 tracking-tighter">₹{product.price}</span>
            {product.comparePrice && (
              <span className="text-sm text-earth-400 line-through font-medium">₹{product.comparePrice}</span>
            )}
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

