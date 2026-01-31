"use client";

import { useState } from "react";
import { createBlog } from "@/app/actions/blogs";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/blogs" className="rounded-full p-2 hover:bg-gray-100">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Write New Article</h1>
            </div>

            <form action={async (formData) => {
                setIsSubmitting(true);
                const result = await createBlog(formData);
                if (result?.error) {
                    alert("Error: " + result.error);
                }
                setIsSubmitting(false);
            }} className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Article Title</label>
                            <input name="title" required type="text" placeholder="e.g. The Future of Web Design" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-lg font-medium outline-none focus:ring-1 focus:ring-black" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Main Content</label>
                            <textarea name="content" required rows={15} placeholder="Write your story here... (Markdown supported)" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-black font-mono text-sm" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                            <textarea name="excerpt" rows={3} placeholder="Short summary for preview cards..." className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                            <input name="thumbnail_url" type="url" placeholder="https://..." className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select name="status" className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none bg-white">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
                                Publish Article
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
