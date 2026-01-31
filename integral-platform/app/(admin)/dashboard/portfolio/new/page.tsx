"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, X, Loader2, Link as LinkIcon } from "lucide-react";
import { createPortfolioItem } from "@/app/actions/portfolio";

export default function NewProjectPage() {
    const [images, setImages] = useState<string[]>([]);
    const [newImageUrl, setNewImageUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Case Study State
    const [caseStudy, setCaseStudy] = useState({
        problem: "",
        solution: "",
        result: ""
    });

    const handleAddImage = () => {
        if (!newImageUrl) return;
        setImages([...images, newImageUrl]);
        setNewImageUrl("");
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setErrorMsg("");

        // Append complex data as JSON strings
        formData.set("case_study", JSON.stringify(caseStudy));
        formData.set("images", JSON.stringify(images));

        // Use first image as thumbnail if available and not explicitly providing one (or update logic on server)
        if (images.length > 0) {
            formData.set("thumbnail_url", images[0]);
        }

        const result = await createPortfolioItem(formData);
        if (result?.error) {
            setErrorMsg(result.error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl space-y-6 pb-20">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/portfolio"
                    className="rounded-full bg-white p-2 text-gray-500 hover:bg-gray-100"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Project</h1>
                    <p className="text-sm text-gray-500">Showcase a new case study.</p>
                </div>
            </div>

            <form action={handleSubmit} className="grid gap-6 lg:grid-cols-3">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
                        {errorMsg && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                                Error: {errorMsg}
                            </div>
                        )}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Project Title</label>
                            <input
                                name="title"
                                required
                                type="text"
                                placeholder="e.g. University Max"
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                                <select name="category" className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none bg-white">
                                    <option value="Business">Business</option>
                                    <option value="Education">Education</option>
                                    <option value="Food & Restaurant">Food & Restaurant</option>
                                    <option value="Miscellaneous">Miscellaneous</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Tier</label>
                                <select name="tier" className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none bg-white">
                                    <option value="Easy">Start / Easy</option>
                                    <option value="Medium">Pro / Medium</option>
                                    <option value="Ultra">Ultra / Enterprise</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Short Description</label>
                            <textarea
                                name="description"
                                rows={3}
                                placeholder="Brief overview for the card..."
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Tech Stack</label>
                            <input
                                name="tech_stack"
                                type="text"
                                placeholder="e.g. React, Next.js, Stripe"
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Live URL</label>
                            <input
                                name="live_url"
                                type="url"
                                placeholder="https://..."
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Case Study Section */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Case Study Details</h3>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">The Problem</label>
                            <textarea
                                rows={3}
                                value={caseStudy.problem}
                                onChange={e => setCaseStudy({ ...caseStudy, problem: e.target.value })}
                                placeholder="What challenge was the client facing?"
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">The Solution</label>
                            <textarea
                                rows={3}
                                value={caseStudy.solution}
                                onChange={e => setCaseStudy({ ...caseStudy, solution: e.target.value })}
                                placeholder="How did we solve it?"
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">The Result</label>
                            <textarea
                                rows={2}
                                value={caseStudy.result}
                                onChange={e => setCaseStudy({ ...caseStudy, result: e.target.value })}
                                placeholder="What was the outcome (stats, feedback)?"
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Options */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-sm font-medium text-gray-900">Publishing</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-xs font-medium text-gray-500">Status</label>
                                <select name="status" className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none bg-white">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="is_featured" id="featured" className="rounded border-gray-300" />
                                <label htmlFor="featured" className="text-sm text-gray-700">Feature on Homepage</label>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Project"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-sm font-medium text-gray-900">Project Images</h3>
                        <p className="text-xs text-gray-500 mb-3">Add image URLs (thumbnails, screenshots).</p>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newImageUrl}
                                onChange={e => setNewImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 rounded-md border border-gray-300 p-2 text-xs outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleAddImage}
                                className="bg-gray-100 p-2 rounded-md hover:bg-gray-200"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {images.map((img, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md group">
                                    <img src={img} className="h-8 w-8 object-cover rounded bg-gray-200" alt="" />
                                    <span className="flex-1 text-xs truncate text-gray-600">{img}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
