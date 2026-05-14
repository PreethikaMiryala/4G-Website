"use client";

import Link from "next/link";
import { ShoppingBag, User, Search, Menu, LogOut } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHome
          ? "bg-white/80 backdrop-blur-md border-b border-earth-200 shadow-sm text-foreground py-4"
          : "bg-transparent text-white py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Mobile Menu */}
        <button className="md:hidden p-2 -ml-2">
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo/g4-logo.png"
              alt="G4 Naturals"
              width={60}
              height={60}
              priority
              className="h-10 w-auto object-contain rounded-lg shadow-sm"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className={cn(
              "font-bold text-xl tracking-tight transition-colors",
              isScrolled || !isHome ? "text-earth-900" : "text-white"
            )}>
              G4<span className="text-primary ml-0.5">Naturals</span>
            </span>
            <span className={cn(
              "text-[10px] uppercase tracking-[0.2em] font-medium transition-colors",
              isScrolled || !isHome ? "text-earth-500" : "text-white/80"
            )}>
              Premium Herbal
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/products" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/categories" className="hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-earth-200 animate-pulse hidden sm:block"></div>
          ) : session ? (
            <div className="relative group hidden sm:block py-2">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                {session.user?.image ? (
                  <img src={session.user.image} alt={session.user.name || "User"} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                    {session.user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </button>
              <div className="absolute right-0 top-full w-56 bg-white rounded-xl shadow-lg border border-earth-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="p-3 border-b border-earth-100">
                  <p className="text-sm font-medium text-earth-900 truncate">{session.user?.name}</p>
                  <p className="text-xs text-earth-500 truncate">{session.user?.email}</p>
                </div>
                <div className="p-2 flex flex-col gap-1">
                  <Link href="/account" className="px-3 py-2 text-sm text-earth-700 hover:bg-earth-50 hover:text-primary rounded-lg transition-colors">
                    My Account
                  </Link>
                  <Link href="/orders" className="px-3 py-2 text-sm text-earth-700 hover:bg-earth-50 hover:text-primary rounded-lg transition-colors">
                    Orders
                  </Link>
                  {session.user?.role === "ADMIN" && (
                    <Link href="/admin" className="px-3 py-2 text-sm text-earth-700 hover:bg-earth-50 hover:text-primary rounded-lg transition-colors">
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="h-px bg-earth-100 my-1"></div>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
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
            <ShoppingBag className="w-5 h-5" />
            {isClient && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
