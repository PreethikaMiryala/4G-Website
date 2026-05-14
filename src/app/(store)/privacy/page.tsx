import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen max-w-4xl">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-earth-900 mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-earth-500 font-medium italic font-serif">Last Updated: May 14, 2026</p>
      </div>

      <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-earth-100 shadow-sm space-y-10 text-earth-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">1. Introduction</h2>
          <p>
            At G4 Naturals, we value your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">2. Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Financial Data:</strong> includes payment card details.</li>
            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li>To register you as a new customer.</li>
            <li>To process and deliver your order.</li>
            <li>To manage our relationship with you.</li>
            <li>To enable you to partake in a prize draw or competition.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at support@g4naturals.com.
          </p>
        </section>
      </div>
    </div>
  );
}
