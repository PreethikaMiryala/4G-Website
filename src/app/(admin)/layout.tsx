import Link from "next/link";
import { LayoutDashboard, Package, Users, ShoppingCart, Settings, LogOut } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-earth-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-950 text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo/g4-logo.png"
              alt="G4 Naturals"
              width={40}
              height={40}
              className="h-10 w-auto object-contain brightness-0 invert rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight text-white">
                G4<span className="text-primary-400 ml-0.5">Naturals</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-white/50">
                Admin Portal
              </span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
            { name: "Products", href: "/admin/products", icon: Package },
            { name: "Customers", href: "/admin/users", icon: Users },
            { name: "Settings", href: "/admin/settings", icon: Settings },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-earth-200 flex items-center px-8 justify-between shrink-0 shadow-sm z-10">
          <h1 className="text-xl font-semibold text-earth-800">Admin Portal</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-earth-200 rounded-full flex items-center justify-center text-sm font-medium">
              AD
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
