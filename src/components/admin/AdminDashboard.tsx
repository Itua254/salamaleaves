"use client";

import { LayoutDashboard, Package, ShoppingCart, Settings, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";

interface AdminDashboardProps {
    products: Product[];
    orders: any[]; // Define Order type properly if possible
    isConnected: boolean;
}

export default function AdminDashboard({ products, orders, isConnected }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState("overview");

    const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);

    return (
        <div className="min-h-screen bg-muted/20 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold font-serif text-primary">Salam Admin</h1>
                </div>
                <nav className="px-4 space-y-2">
                    <button onClick={() => setActiveTab("overview")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "overview" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                        <LayoutDashboard className="h-5 w-5" /> Overview
                    </button>
                    <button onClick={() => setActiveTab("products")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "products" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                        <Package className="h-5 w-5" /> Products
                    </button>
                    <button onClick={() => setActiveTab("orders")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                        <ShoppingCart className="h-5 w-5" /> Orders
                    </button>
                    <button onClick={() => setActiveTab("settings")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                        <Settings className="h-5 w-5" /> Settings
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold font-serif capitalize">{activeTab}</h2>
                </div>

                {!isConnected && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3 text-yellow-800">
                        <AlertTriangle className="h-5 w-5" />
                        <p><strong>Admin Mode Limited:</strong> Service Role Key missing. Some data (Orders) may not load.</p>
                    </div>
                )}

                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                            <h3 className="text-sm font-medium text-foreground/70 mb-2">Total Revenue</h3>
                            <p className="text-3xl font-bold">Ksh {totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                            <h3 className="text-sm font-medium text-foreground/70 mb-2">Orders</h3>
                            <p className="text-3xl font-bold">{orders.length}</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                            <h3 className="text-sm font-medium text-foreground/70 mb-2">Active Products</h3>
                            <p className="text-3xl font-bold">{products.length}</p>
                        </div>
                    </div>
                )}

                {activeTab === "products" && (
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
                            <h3 className="font-bold">Product List</h3>
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm">Add Product</button>
                        </div>
                        <div className="divide-y divide-border">
                            {products.length === 0 ? (
                                <div className="p-8 text-center text-foreground/60">
                                    <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p>No products found.</p>
                                </div>
                            ) : (
                                products.map((product) => (
                                    <div key={product.id} className="p-4 flex items-center justify-between hover:bg-muted/5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-muted rounded-md overflow-hidden">
                                                <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">{product.name}</h4>
                                                <p className="text-xs text-foreground/60">Stock: {product.stock}</p>
                                            </div>
                                        </div>
                                        <div className="font-bold">Ksh {product.price}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "orders" && (
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-border bg-muted/10">
                            <h3 className="font-bold">Recent Orders</h3>
                        </div>
                        <div className="divide-y divide-border">
                            {orders.length === 0 ? (
                                <div className="p-8 text-center text-foreground/60">
                                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p>No orders found (Check Permissions).</p>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div key={order.id} className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">Order #{order.id.slice(0, 8)}</p>
                                            <p className="text-xs text-foreground/60">{order.email}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">Ksh {order.total}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
