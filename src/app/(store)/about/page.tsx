export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About G4 Naturals</h1>
        <div className="prose prose-earth max-w-none text-lg text-earth-700 space-y-6">
          <p>
            G4 Naturals was founded with a singular vision: to bring the ancient wisdom of Unani medicine into the modern world. For generations, our ancestors have relied on the healing power of nature to cure ailments, restore balance, and promote overall wellness.
          </p>
          <p>
            Today, we combine that inherited knowledge with modern quality standards to craft premium natural remedies that provide instant relief without harmful side effects. Every bottle of G4 Naturals is a testament to purity, authenticity, and care.
          </p>
          <div className="bg-earth-50 p-8 rounded-2xl border border-earth-100 my-10">
            <h2 className="text-2xl font-bold mb-4 text-primary-800">Our Promise</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-primary"></span> 100% Natural Ingredients</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-primary"></span> Authentic Unani Formulation</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-primary"></span> Cruelty-Free & Sustainable</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-primary"></span> Instant Relief Guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
