// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { User, MapPin, ShoppingBag, Bell, Plus } from "lucide-react";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import Link from "next/link";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string | null;
    images: string[];
  } | null;
}

interface Order {
  id: string;
  createdAt: Date;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  items: OrderItem[];
}

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default async function AccountPage() {
  // const session = await getServerSession(authOptions);
  const session = { user: { email: "mock@example.com", name: "Mock User" } };

  // if (!session || !session.user) {
  //   redirect("/login");
  // }

  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      include: {
        addresses: true,
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            items: {
              include: {
                product: {
                  select: { name: true, images: true }
                }
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error("Database unreachable during build for Account:", error);
  }

  if (!user) {
    // redirect("/login");
    user = {
      name: "Mock User",
      email: "mock@example.com",
      phone: "0000000000",
      createdAt: new Date(),
      orders: [],
      addresses: []
    };
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen bg-earth-50/30">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-6 sticky top-24">
            <div className="flex flex-col items-center justify-center mb-8 pb-8 border-b border-earth-100 gap-3">
              <Image
                src="/logo/g4-logo.png"
                alt="G4 Naturals"
                width={60}
                height={60}
                className="h-14 w-auto object-contain rounded-xl shadow-sm"
              />
              <div className="flex flex-col items-center leading-none text-center">
                <span className="font-bold text-lg tracking-tight text-earth-900">
                  G4<span className="text-primary ml-0.5">Naturals</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.1em] font-medium text-earth-500">
                  Premium Herbal
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center text-2xl font-bold">
                {user.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-earth-500 text-sm">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { name: "My Profile", icon: User, href: "#profile" },
                { name: "My Orders", icon: ShoppingBag, href: "#orders" },
                { name: "Saved Addresses", icon: MapPin, href: "#addresses" },
                { name: "Notifications", icon: Bell, href: "#notifications" },
              ].map((item: { name: string; icon: any; href: string }) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-earth-700 hover:bg-earth-100"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-earth-100">
                <LogoutButton />
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 space-y-6">
          <div id="profile" className="bg-white rounded-2xl shadow-sm border border-earth-100 p-8 scroll-mt-28">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <button className="text-primary hover:underline font-medium">Edit</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-earth-500 mb-1">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-earth-500 mb-1">Email Address</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-earth-500 mb-1">Phone Number</p>
                <p className="font-medium">{user.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-earth-500 mb-1">Account Created</p>
                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div id="orders" className="bg-white rounded-2xl shadow-sm border border-earth-100 p-8 scroll-mt-28">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Orders</h2>
            </div>
            
            {user.orders.length > 0 ? (
              <div className="space-y-6">
                {user.orders.map((order: Order) => (
                  <div key={order.id} className="border border-earth-100 rounded-2xl p-6 bg-earth-50/30">
                    <div className="flex justify-between items-start border-b border-earth-100 pb-4 mb-4">
                      <div>
                        <p className="font-bold text-lg text-earth-900">Order #{order.id.substring(0, 8).toUpperCase()}</p>
                        <p className="text-sm text-earth-500 font-medium">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary-800 rounded-full text-xs font-bold mt-2 tracking-wide uppercase">
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-xl text-earth-900">₹{order.totalAmount}</p>
                        <p className="text-xs text-earth-500 font-medium uppercase tracking-wider">{order.paymentMethod}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {order.items && order.items.map((item: OrderItem) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-12 h-12 relative bg-white rounded-lg overflow-hidden shrink-0 border border-earth-100">
                            {item.product?.images?.[0] ? (
                              <Image src={item.product.images[0]} alt={item.product.name || "Product"} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-earth-100 flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-earth-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-bold text-sm text-earth-900">{item.product?.name || "Deleted Product"}</p>
                            <p className="text-xs text-earth-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-sm text-earth-900">₹{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-earth-50 rounded-xl">
                <ShoppingBag className="w-12 h-12 text-earth-300 mx-auto mb-3" />
                <p className="text-earth-600 font-medium">No orders placed yet</p>
                <button className="mt-4 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                  Start Shopping
                </button>
              </div>
            )}
          </div>
          <div id="addresses" className="bg-white rounded-2xl shadow-sm border border-earth-100 p-8 scroll-mt-28">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-earth-900 tracking-tight">Saved Addresses</h2>
              <Link href="/account/addresses/add" className="text-primary hover:text-primary-700 font-bold text-sm flex items-center gap-1 transition-colors">
                <Plus className="w-4 h-4" />
                Add New
              </Link>
            </div>
            
            {user.addresses && user.addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses.map((addr: Address) => (
                  <div key={addr.id} className="border border-earth-200 p-4 rounded-xl">
                    <p className="font-medium mb-1">{addr.street}</p>
                    <p className="text-earth-600 text-sm">{addr.city}, {addr.state} {addr.postalCode}</p>
                    <p className="text-earth-600 text-sm">{addr.country}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-earth-500 text-center py-4">No addresses saved yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
