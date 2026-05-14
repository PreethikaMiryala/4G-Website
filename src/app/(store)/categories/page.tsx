import Link from "next/link";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Shop By Category</h1>
      <p className="text-earth-500 mb-8 max-w-lg mx-auto">Explore our curated collections of premium natural remedies tailored to your specific wellness needs.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {[
          { name: "Pain Relief", desc: "Natural solutions for joint and muscle comfort." },
          { name: "Vitality", desc: "Traditional boosters for strength and energy." },
          { name: "Wellness", desc: "Daily tonics for heart, brain, and immunity." },
          { name: "Skin Care", desc: "Pure herbal extracts for radiant skin." },
          { name: "Hair Care", desc: "Organic oils and serums for hair vitality." },
          { name: "Digestion", desc: "Digestive aids and traditional stomach remedies." },
          { name: "Supplements", desc: "High-grade herbal supplements for health." },
          { name: "Lifestyle", desc: "Traditional mouth fresheners and lifestyle products." }
        ].map((cat) => (
          <Link 
            key={cat.name} 
            href={`/products?category=${cat.name}`}
            className="group bg-white p-8 rounded-[2rem] border border-earth-100 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-primary-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <span className="text-2xl font-bold">{cat.name.charAt(0)}</span>
            </div>
            <h2 className="text-xl font-bold mb-3 text-earth-900 group-hover:text-primary transition-colors">{cat.name}</h2>
            <p className="text-earth-500 text-sm leading-relaxed">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
