"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function NewPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        meta_title: "",
        meta_description: "",
        is_indexed: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, is_indexed: e.target.checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('pages')
                .insert([formData]);

            if (error) throw error;

            router.push('/dashboard/content');
            router.refresh();
        } catch (error) {
            console.error('Error creating page:', error);
            alert('Failed to create page. Check console for details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Auto-generate slug from title if empty
    const handleTitleBlur = () => {
        if (!formData.slug && formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/content" className="rounded-full p-2 hover:bg-gray-100">
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create New Page</h1>
                    <p className="text-sm text-gray-500">Define page structure and SEO settings.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
                    {/* Basic Info */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Page Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                onBlur={handleTitleBlur}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-1 focus:ring-black outline-none"
                                placeholder="e.g. Services"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">URL Slug</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black mt-1">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">integral.media/</span>
                                <input
                                    type="text"
                                    name="slug"
                                    required
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="block flex-1 border-0 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                                    placeholder="services"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                            <input
                                type="text"
                                name="meta_title"
                                value={formData.meta_title}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-1 focus:ring-black outline-none"
                                placeholder="Title shown in Google search results"
                            />
                            <p className="mt-1 text-xs text-gray-500">Recommended: 50-60 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                            <textarea
                                name="meta_description"
                                rows={3}
                                value={formData.meta_description}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-1 focus:ring-black outline-none"
                                placeholder="Brief summary of the page content..."
                            />
                            <p className="mt-1 text-xs text-gray-500">Recommended: 150-160 characters</p>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <input
                                id="is_indexed"
                                name="is_indexed"
                                type="checkbox"
                                checked={formData.is_indexed}
                                onChange={handleToggle}
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <label htmlFor="is_indexed" className="text-sm font-medium text-gray-700">index this page (allow search engines to crawl)</label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Link
                        href="/dashboard/content"
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Create Page
                    </button>
                </div>
            </form>
        </div>
    );
}
