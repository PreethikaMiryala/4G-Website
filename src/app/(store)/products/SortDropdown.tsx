"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Popular", value: "popular" },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSort = searchParams?.get("sort") || "newest";
  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || "Sort";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("sort", value);
    router.push(`/products?${params.toString()}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-earth-100 text-earth-700 px-6 py-3 rounded-full text-sm font-bold hover:bg-earth-50 transition-all shadow-sm"
      >
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        <span className="min-w-[120px] text-left">{currentLabel}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-earth-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className={cn(
                "w-full text-left px-5 py-3 text-sm transition-colors hover:bg-earth-50",
                currentSort === option.value ? "text-primary font-bold bg-primary/5" : "text-earth-600 font-medium"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
