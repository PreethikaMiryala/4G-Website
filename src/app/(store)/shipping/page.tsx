import { Truck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen max-w-4xl">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-earth-900 mb-6 tracking-tight">Shipping Policy</h1>
        <p className="text-earth-500 font-medium italic font-serif">Ensuring safe delivery of nature&apos;s essence.</p>
      </div>

      <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-earth-100 shadow-sm space-y-10 text-earth-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">1. Shipping Coverage</h2>
          <p>
            We currently offer nationwide shipping across India. We partner with reliable courier services to ensure your natural remedies reach you safely and on time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">2. Processing Times</h2>
          <p>
            All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or public holidays.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-earth-50 p-6 rounded-2xl border border-earth-100">
            <h3 className="font-bold text-earth-900 mb-2">Standard Shipping</h3>
            <p className="text-sm">5-7 Business Days</p>
            <p className="text-primary font-bold mt-2">Free for orders over ₹999</p>
          </div>
          <div className="bg-earth-50 p-6 rounded-2xl border border-earth-100">
            <h3 className="font-bold text-earth-900 mb-2">Express Shipping</h3>
            <p className="text-sm">2-3 Business Days</p>
            <p className="text-primary font-bold mt-2">Available at checkout</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">3. Shipping Rates</h2>
          <p>
            Shipping charges for your order will be calculated and displayed at checkout. We strive to keep shipping costs as low as possible for our customers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">4. Shipment Confirmation & Order Tracking</h2>
          <p>
            You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-earth-900 mb-4">5. Damages</h2>
          <p>
            G4 Naturals is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
          </p>
        </section>
      </div>
    </div>
  );
}
