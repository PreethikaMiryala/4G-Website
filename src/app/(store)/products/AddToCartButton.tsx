"use client";

import { useCartStore } from "@/store/useCartStore";
import { Product } from "@prisma/client";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full bg-earth-900 text-white hover:bg-primary transition-all duration-300 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-earth-900/10 hover:shadow-primary/30 active:scale-[0.98]"
    >
      <ShoppingCart className="w-4 h-4" />
      Add to Collection
    </button>
  );
}
