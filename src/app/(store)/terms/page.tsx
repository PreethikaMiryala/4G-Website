import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen max-w-4xl">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-earth-900 mb-6 tracking-tight">Terms of Service</h1>
        <p className="text-earth-500 font-medium italic font-serif">Last Updated: May 14, 2026</p>
      </div>

      <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-earth-100 shadow-sm space-y-10 text-earth-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using the G4 Naturals website, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use any services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">2. Product Information</h2>
          <p>
            We attempt to be as accurate as possible with product descriptions. However, we do not warrant that product descriptions or other content are accurate, complete, reliable, current, or error-free. Herbal products are natural and variations may occur.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">3. Medical Disclaimer</h2>
          <p className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary text-earth-900 font-medium">
            The information provided on this website is for educational purposes only and is not intended as medical advice. Our products are traditional remedies and have not been evaluated for modern clinical diagnosis. Always consult a healthcare professional before starting any new herbal treatment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">4. Limitation of Liability</h2>
          <p>
            G4 Naturals shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </section>
      </div>
    </div>
  );
}
