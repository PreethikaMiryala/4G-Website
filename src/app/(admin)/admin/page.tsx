import { IndianRupee, Package, ShoppingBag, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch stats from DB (Safe defaults if DB not yet migrated)
  let stats = {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  };

  try {
    const [ordersCount, productsCount, usersCount, revenue] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: "COMPLETED" },
      }),
    ]);

    stats = {
      totalRevenue: revenue._sum.totalAmount || 0,
      totalOrders: ordersCount,
      totalProducts: productsCount,
      totalUsers: usersCount,
    };
  } catch (error) {
    console.error("DB not connected or migrated yet", error);
  }

  const statCards = [
    { name: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "text-green-600", bg: "bg-green-100" },
    { name: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Total Products", value: stats.totalProducts.toString(), icon: Package, color: "text-orange-600", bg: "bg-orange-100" },
    { name: "Total Customers", value: stats.totalUsers.toString(), icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-earth-900">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat: { name: string; value: string; icon: any; color: string; bg: string }) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-earth-500">{stat.name}</p>
              <h3 className="text-2xl font-bold text-earth-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="text-center py-10 text-earth-500">
            No recent orders.
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-6">
          <h3 className="text-lg font-semibold mb-4">System Settings Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-earth-50 rounded-xl">
              <div>
                <p className="font-medium text-earth-900">Cash on Delivery (COD)</p>
                <p className="text-sm text-earth-500">Currently Enabled</p>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full bg-primary transition-colors cursor-pointer">
                <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform translate-x-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
