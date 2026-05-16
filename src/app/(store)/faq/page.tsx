export default function FAQPage() {
  const faqs = [
    {
      question: "Are your products 100% natural?",
      answer: "Yes, all G4 Naturals products are crafted using 100% natural herbs and traditional Unani formulations. We do not use synthetic chemicals or artificial preservatives."
    },
    {
      question: "How long does delivery take?",
      answer: "We typically ship orders within 24-48 hours. Depending on your location in India, delivery usually takes 3-7 business days."
    },
    {
      question: "Can I use these products with other medications?",
      answer: "While our products are natural, we always recommend consulting with your healthcare provider before combining them with other prescription medications."
    },
    {
      question: "Do you offer returns or exchanges?",
      answer: "Due to the nature of wellness products, we only accept returns if the product is damaged during transit or if the wrong item was delivered."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto space-y-8">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-earth-100 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-earth-900">{faq.question}</h3>
            <p className="text-earth-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
