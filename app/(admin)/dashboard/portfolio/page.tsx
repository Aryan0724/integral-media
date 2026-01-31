"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    status: string;
    updated_at: string;
    thumbnail_url: string;
}

export default function PortfolioPage() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data, error } = await supabase
                    .from("portfolio_items")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching projects:", error);
                } else {
                    setItems(data || []);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
        if (!error) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Portfolio</h1>
                    <p className="text-sm text-gray-500">Manage your projects and case studies.</p>
                </div>
                <Link href="/dashboard/portfolio/new" className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                    <Plus className="h-4 w-4" />
                    Add Project
                </Link>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-white px-3 py-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search projects by title..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                    onChange={(e) => {
                        // Simple client-side search for now
                        const term = e.target.value.toLowerCase();
                        // Ideally we re-fetch or filter the local state more robustly
                    }}
                />
            </div>

            {isLoading ? (
                <div className="py-20 text-center text-gray-500">Loading portfolio...</div>
            ) : items.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                    No projects found. Click "Add Project" to start.
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <div key={item.id} className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
                            <div className="aspect-video w-full bg-gray-100 relative">
                                {item.thumbnail_url && !item.thumbnail_url.includes("placeholder") ? (
                                    <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <span className="text-xs">No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${item.status === 'published'
                                        ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                                        : 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                                        }`}>
                                        {item.status ? (item.status.charAt(0).toUpperCase() + item.status.slice(1)) : 'Draft'}
                                    </span>
                                    <span className="text-xs text-gray-400">{item.category}</span>
                                </div>
                                <h3 className="line-clamp-1 font-semibold text-gray-900">{item.title}</h3>
                                <p className="mt-1 text-xs text-gray-500">
                                    Last updated: {new Date(item.updated_at || Date.now()).toLocaleDateString()}
                                </p>

                                <div className="mt-4 flex items-center gap-2 border-t pt-4">
                                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
                                        <Edit className="h-3 w-3" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
