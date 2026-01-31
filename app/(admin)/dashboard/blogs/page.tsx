"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, BookOpen, Loader2, Edit } from "lucide-react";
import Link from "next/link";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
            setBlogs(data || []);
            setIsLoading(false);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Blog Posts</h1>
                    <p className="text-sm text-gray-500">Manage your articles and insights.</p>
                </div>
                <Link href="/dashboard/blogs/new" className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                    <Plus className="h-4 w-4" />
                    New Post
                </Link>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-gray-500 flex justify-center"><Loader2 className="animate-spin" /></div>
                ) : blogs.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No posts found. Write one!</div>
                ) : (
                    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="group flex flex-col rounded-lg border bg-gray-50 overflow-hidden h-full">
                                <div className="aspect-[16/9] w-full bg-gray-200 relative">
                                    <img src={blog.thumbnail_url} alt={blog.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4 flex flex-1 flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                            {blog.status}
                                        </span>
                                        <span className="text-xs text-gray-400">{new Date(blog.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{blog.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{blog.excerpt}</p>

                                    <button className="text-sm font-medium text-black hover:underline flex items-center gap-1 mt-auto">
                                        <Edit className="h-3 w-3" /> Edit Post
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
