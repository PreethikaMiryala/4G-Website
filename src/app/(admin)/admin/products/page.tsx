"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Package, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

import { Product } from "@/types";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    comparePrice: "",
    category: "Pain Relief",
    stock: "100",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: formData.image ? [formData.image] : [],
        }),
      });
      
      if (res.ok) {
        toast.success("Product added successfully");
        setIsAdding(false);
        setFormData({ name: "", slug: "", description: "", price: "", comparePrice: "", category: "Pain Relief", stock: "100", image: "" });
        fetchProducts();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to add product");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          {isAdding ? "Cancel" : <><Plus className="w-5 h-5" /> Add Product</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-earth-100 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} className="w-full p-2 border border-earth-200 rounded-lg" placeholder="Joint Pain Relief Oil" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug URL</label>
              <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full p-2 border border-earth-200 rounded-lg" placeholder="joint-pain-relief-oil" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border border-earth-200 rounded-lg h-24" placeholder="Natural pain relief..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-2 border border-earth-200 rounded-lg" placeholder="499" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Compare Price (₹) [Optional]</label>
              <input type="number" value={formData.comparePrice} onChange={e => setFormData({...formData, comparePrice: e.target.value})} className="w-full p-2 border border-earth-200 rounded-lg" placeholder="699" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border border-earth-200 rounded-lg">
                <option>Pain Relief</option>
                <option>Cold & Cough</option>
                <option>General Wellness</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full p-2 border border-earth-200 rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Image URL (Unsplash)</label>
              <input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-2 border border-earth-200 rounded-lg" placeholder="https://images.unsplash.com/photo-..." />
            </div>
            <div className="md:col-span-2 mt-2">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors">Save Product</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-earth-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-earth-50 border-b border-earth-100 text-sm text-earth-500">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-earth-500">Loading products...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-earth-500">No products found. Add your first product!</td></tr>
            ) : (
              products.map((product: Product) => (
                <tr key={product.id} className="border-b border-earth-50 hover:bg-earth-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-earth-100 rounded-lg relative overflow-hidden shrink-0">
                        {product.images[0] ? (
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                        ) : (
                          <Package className="w-6 h-6 text-earth-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                      <span className="font-medium line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{product.category}</td>
                  <td className="p-4 font-medium">₹{product.price}</td>
                  <td className="p-4 text-sm">{product.stock}</td>
                  <td className="p-4 text-right">
                    <button className="text-earth-400 hover:text-primary p-2 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="text-earth-400 hover:text-red-500 p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
