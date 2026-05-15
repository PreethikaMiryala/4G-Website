"use client";

import Link from "next/link";
import { ShoppingBag, User, Search, Menu, LogOut, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const cartCount = useCartStore((state) => state.getCartCount());
  const { data: session, status } = useSession();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks: { name: string; href: string }[] = [
    { name: "Shop", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHome
            ? "bg-white/80 backdrop-blur-md border-b border-earth-200 shadow-sm text-foreground py-3 sm:py-4"
            : "bg-transparent text-white py-4 sm:py-6"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-2 text-current hover:opacity-70 transition-opacity"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group absolute left-1/2 md:static transform -translate-x-1/2 md:translate-x-0">
            <div className="relative hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo/g4-logo.png"
                alt="G4 Naturals"
                width={50}
                height={50}
                priority
                className="h-8 md:h-10 w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className={cn(
                "font-bold text-lg md:text-xl tracking-tight transition-colors",
                isScrolled || !isHome ? "text-earth-900" : "text-white"
              )}>
                G4<span className="text-primary ml-0.5">Naturals</span>
              </span>
              <span className={cn(
                "text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium transition-colors",
                isScrolled || !isHome ? "text-earth-500" : "text-white/80"
              )}>
                Premium Herbal
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            {navLinks.map((link: { name: string; href: string }) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors text-sm uppercase tracking-wider font-semibold">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hover:text-primary transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-earth-200 animate-pulse hidden sm:block"></div>
            ) : session ? (
              <div className="relative group hidden sm:block py-2">
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name || "User"} className="w-8 h-8 rounded-full object-cover shadow-sm border border-white/20" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold shadow-sm">
                      {session.user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </button>
                <div className="absolute right-0 top-full w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-earth-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right translate-y-2 group-hover:translate-y-0">
                  <div className="p-4 border-b border-earth-100/50 bg-earth-50/50 rounded-t-2xl">
                    <p className="text-sm font-semibold text-earth-900 truncate">{session.user?.name}</p>
                    <p className="text-xs text-earth-500 truncate mt-0.5">{session.user?.email}</p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/account" className="px-4 py-2.5 text-sm font-medium text-earth-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors">
                      My Account
                    </Link>
                    <Link href="/orders" className="px-4 py-2.5 text-sm font-medium text-earth-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors">
                      Orders
                    </Link>
                    {session.user?.role === "ADMIN" && (
                      <Link href="/admin" className="px-4 py-2.5 text-sm font-medium text-earth-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors">
                        Admin Dashboard
                      </Link>
                    )}
                    <div className="h-px bg-earth-100/50 my-1"></div>
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="px-4 py-2.5 text-sm font-medium text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hover:text-primary transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </Link>
            )}

            <Link href="/cart" className="hover:text-primary transition-colors relative block">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {isClient && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-primary-600 text-white text-[9px] sm:text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[60] bg-earth-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={cn(
          "fixed top-0 left-0 bottom-0 w-[85vw] max-w-[320px] bg-white z-[70] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] md:hidden shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-earth-100">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo/g4-logo.png"
              alt="G4 Naturals"
              width={40}
              height={40}
              className="h-8 w-auto object-contain rounded-lg shadow-sm"
            />
            <span className="font-bold text-xl tracking-tight text-earth-900">
              G4<span className="text-primary-600 ml-0.5">Naturals</span>
            </span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 text-earth-500 hover:text-earth-900 bg-earth-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="flex items-center justify-between px-4 py-4 text-earth-800 font-semibold hover:bg-primary-50 hover:text-primary-700 rounded-2xl transition-all group"
              >
                {link.name}
                <ChevronRight className="w-4 h-4 text-earth-300 group-hover:text-primary-500 transition-colors" />
              </Link>
            ))}
          </nav>
          
          <div className="mt-8 px-4">
            <div className="h-px bg-earth-100 mb-8" />
            
            {status === "loading" ? (
              <div className="h-12 bg-earth-100 rounded-2xl animate-pulse" />
            ) : session ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-4">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="User" className="w-12 h-12 rounded-full object-cover border border-earth-200" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-lg font-bold">
                      {session.user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-earth-900">{session.user?.name}</p>
                    <p className="text-sm text-earth-500 truncate w-40">{session.user?.email}</p>
                  </div>
                </div>
                <Link href="/account" className="flex justify-between items-center px-4 py-3 bg-earth-50 rounded-xl font-medium text-earth-700 hover:bg-earth-100 transition-colors">
                  My Account
                </Link>
                <Link href="/orders" className="flex justify-between items-center px-4 py-3 bg-earth-50 rounded-xl font-medium text-earth-700 hover:bg-earth-100 transition-colors">
                  Orders
                </Link>
                {session.user?.role === "ADMIN" && (
                  <Link href="/admin" className="flex justify-between items-center px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium hover:bg-primary-100 transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-2 justify-center w-full px-4 py-3 mt-4 text-red-600 bg-red-50 hover:bg-red-100 font-semibold rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-earth-900 text-white font-semibold rounded-2xl hover:bg-earth-800 transition-colors shadow-lg shadow-earth-900/20"
              >
                <User className="w-5 h-5" />
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
