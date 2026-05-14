import Link from "next/link";
import { Share2, MessageCircle, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-earth-50 border-t border-earth-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Image
                src="/logo/g4-logo.png"
                alt="G4 Naturals"
                width={80}
                height={80}
                className="h-12 w-auto object-contain rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-2xl tracking-tight text-earth-900">
                  G4<span className="text-primary ml-0.5">Naturals</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-earth-500">
                  Premium Herbal
                </span>
              </div>
            </Link>
            <p className="text-earth-600 mb-6 leading-relaxed">
              Premium Unani and natural medicines crafted with generations of wisdom for your modern wellness.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-earth-200 flex items-center justify-center text-earth-700 hover:bg-primary hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-earth-200 flex items-center justify-center text-earth-700 hover:bg-primary hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-earth-200 flex items-center justify-center text-earth-700 hover:bg-primary hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-earth-600 hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="text-earth-600 hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/faq" className="text-earth-600 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-earth-600 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Categories</h4>
            <ul className="space-y-4">
              <li><Link href="/categories/pain-relief" className="text-earth-600 hover:text-primary transition-colors">Pain Relief</Link></li>
              <li><Link href="/categories/cold-cough" className="text-earth-600 hover:text-primary transition-colors">Cold & Cough</Link></li>
              <li><Link href="/categories/immunity" className="text-earth-600 hover:text-primary transition-colors">Immunity Boosters</Link></li>
              <li><Link href="/categories/wellness" className="text-earth-600 hover:text-primary transition-colors">Daily Wellness</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-earth-600">
              <li>123 Herbal Street, Natural Park</li>
              <li>New Delhi, 110001, India</li>
              <li>support@g4naturals.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-earth-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-earth-500">
          <p>© {new Date().getFullYear()} G4 Naturals. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-primary">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
