import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { ShoppingBag, Filter, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import SearchInput from "./SearchInput";
import SortDropdown from "./SortDropdown";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category as string | undefined;
  const q = resolvedParams.q as string | undefined;
  const sort = (resolvedParams.sort as string) || "newest";

  const where: any = {};
  if (category && category !== "All") {
    where.category = category;
  }
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  // Sorting logic
  let orderBy: any = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  if (sort === "price_desc") orderBy = { price: "desc" };
  if (sort === "popular") orderBy = { reviews: { _count: "desc" } };

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: { reviews: true }
        }
      }
    }),
    prisma.product.groupBy({
      by: ["category"],
      _count: true,
    })
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-earth-50/30 pt-24">
      {/* Luxury Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <Image
          src="/herbal-hero.png"
          alt="Premium Herbal Wellness"
          fill
          priority
          className="object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-950/80 via-earth-950/40 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-300 text-xs font-bold uppercase tracking-[0.2em] mb-6 animate-fade-in-up">
              Generations of Wisdom
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] animate-fade-in-up delay-100">
              The Art of <br />
              <span className="text-primary italic font-serif">Natural</span> Healing
            </h1>
            <p className="text-lg md:text-xl text-earth-100/90 max-w-xl mb-10 leading-relaxed animate-fade-in-up delay-200">
              Discover our curated collection of premium Unani and herbal remedies, crafted with the purest ingredients for modern wellness.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-600 transition-all flex items-center gap-2 group shadow-xl shadow-primary/20">
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-earth-100 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Link
              href="/products"
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                !category || category === "All"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-earth-100 text-earth-600 hover:bg-earth-200"
              )}
            >
              All Remedies
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.category}
                href={`/products?category=${cat.category}`}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                  category === cat.category
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-earth-100 text-earth-600 hover:bg-earth-200"
                )}
              >
                {cat.category}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <SearchInput />
            <div className="hidden lg:block">
              <SortDropdown />
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-earth-900 tracking-tight">
              {category ? `${category} Collection` : "Our Master Collection"}
            </h2>
            <p className="text-earth-500 font-medium mt-1">
              Showing {products.length} {products.length === 1 ? "remedy" : "remedies"} found
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-earth-100 shadow-sm overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-primary-200)_0,transparent_70%)]" />
            </div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-earth-300" />
              </div>
              <h2 className="text-3xl font-black text-earth-900 mb-4 tracking-tight">No Remedies Found</h2>
              <p className="text-earth-500 max-w-md mx-auto mb-10 font-medium">
                We couldn&apos;t find any products matching your current filters. Try adjusting your search or category.
              </p>
              <Link 
                href="/products" 
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-600 transition-all shadow-xl shadow-primary/20"
              >
                Clear All Filters
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Premium CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="bg-primary-950 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute inset-0 opacity-10">
            <Image src="/herbal-hero.png" alt="Overlay" fill className="object-cover" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              Cant find what you need? <br />
              <span className="text-primary-300 italic font-serif">Consult our expert.</span>
            </h3>
            <p className="text-white/70 text-lg mb-0 font-medium leading-relaxed">
              Our traditional practitioners are available for personalized guidance on choosing the right natural remedies for your specific needs.
            </p>
          </div>
          <Link href="/contact" className="relative z-10 bg-white text-primary-950 px-10 py-5 rounded-full font-black text-lg hover:bg-primary-100 transition-all shadow-2xl shrink-0">
            Get Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

