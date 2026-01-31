"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Edit, Eye, Loader2, Plus, Search } from "lucide-react";
import Link from "next/link";

interface Page {
    id: string;
    title: string;
    slug: string;
    updated_at: string;
    is_indexed: boolean;
}

export default function ContentPage() {
    const [pages, setPages] = useState<Page[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('pages')
            .select('*')
            .order('title', { ascending: true });

        if (error) {
            console.error("Error fetching pages:", error);
        } else {
            setPages(data || []);
        }
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Content Management</h1>
                    <p className="text-sm text-gray-500">Manage website pages and dynamic content.</p>
                </div>
                <Link href="/dashboard/content/new" className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                    <Plus className="h-4 w-4" />
                    New Page
                </Link>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center p-12 text-gray-500">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading pages...
                    </div>
                ) : pages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
                        <p className="mb-2">No pages found.</p>
                        <p className="text-sm">Click "Create Page" to start adding content content.</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Page Title</th>
                                <th className="px-6 py-3 font-medium">Slug</th>
                                <th className="px-6 py-3 font-medium">SEO Status</th>
                                <th className="px-6 py-3 font-medium">Last Updated</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pages.map((page) => (
                                <tr key={page.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {page.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        /{page.slug}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${page.is_indexed
                                            ? "bg-green-50 text-green-700 ring-green-600/20"
                                            : "bg-gray-50 text-gray-600 ring-gray-500/10"
                                            }`}>
                                            {page.is_indexed ? 'Indexed' : 'No-Index'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(page.updated_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/content/${page.id}`}
                                                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                                                title="Edit Page"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
