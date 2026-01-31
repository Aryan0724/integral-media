"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus, Save, Trash2, GripVertical } from "lucide-react";
import Link from "next/link";

interface PageData {
    id: string;
    title: string;
    slug: string;
    meta_title: string;
    meta_description: string;
    is_indexed: boolean;
}

interface PageSection {
    id: string;
    section_key: string;
    content: any;
}

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
    // Unapack params
    const { id } = use(params);
    const router = useRouter();

    const [page, setPage] = useState<PageData | null>(null);
    const [sections, setSections] = useState<PageSection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // New Section State
    const [newSectionKey, setNewSectionKey] = useState("");
    const [isAddingSection, setIsAddingSection] = useState(false);

    useEffect(() => {
        fetchPageData();
    }, [id]);

    const fetchPageData = async () => {
        setIsLoading(true);
        try {
            // Fetch Page Info
            const { data: pageData, error: pageError } = await supabase
                .from('pages')
                .select('*')
                .eq('id', id)
                .single();

            if (pageError) throw pageError;
            setPage(pageData);

            // Fetch Sections
            const { data: sectionData, error: sectionError } = await supabase
                .from('page_sections')
                .select('*')
                .eq('page_id', id)
                .order('section_key', { ascending: true }); // Simple ordering for now

            if (sectionError) throw sectionError;
            setSections(sectionData || []);

        } catch (error) {
            console.error("Error loading page:", error);
            alert("Failed to load page data.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!page) return;
        setPage({ ...page, [e.target.name]: e.target.value });
    };

    const handleSectionContentChange = (sectionId: string, key: string, value: string) => {
        setSections(sections.map(s => {
            if (s.id === sectionId) {
                return { ...s, content: { ...s.content, [key]: value } };
            }
            return s;
        }));
    };

    const handleAddSection = async () => {
        if (!newSectionKey) return;
        try {
            const { data, error } = await supabase
                .from('page_sections')
                .insert({
                    page_id: id,
                    section_key: newSectionKey.toLowerCase().replace(/\s+/g, '_'),
                    content: { text: "New content here..." } // Default content
                })
                .select()
                .single();

            if (error) throw error;
            setSections([...sections, data]);
            setNewSectionKey("");
            setIsAddingSection(false);

        } catch (error) {
            console.error("Error adding section:", error);
            alert("Failed to add section.");
        }
    };

    const handleDeleteSection = async (sectionId: string) => {
        if (!confirm("Are you sure you want to delete this section?")) return;
        try {
            const { error } = await supabase
                .from('page_sections')
                .delete()
                .eq('id', sectionId);

            if (error) throw error;
            setSections(sections.filter(s => s.id !== sectionId));

        } catch (error) {
            console.error("Error deleting section:", error);
            alert("Failed to delete section.");
        }
    };

    const handleSave = async () => {
        if (!page) return;
        setIsSaving(true);
        try {
            // 1. Update Page Info
            const { error: pageError } = await supabase
                .from('pages')
                .update({
                    title: page.title,
                    slug: page.slug,
                    meta_title: page.meta_title,
                    meta_description: page.meta_description,
                    is_indexed: page.is_indexed,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (pageError) throw pageError;

            // 2. Update Sections
            // We update them one by one for now (could be optimized)
            for (const section of sections) {
                const { error: secError } = await supabase
                    .from('page_sections')
                    .update({
                        content: section.content,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', section.id);

                if (secError) throw secError;
            }

            alert("Saved successfully!");
            router.refresh();

        } catch (error) {
            console.error("Error saving:", error);
            alert("Failed to save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !page) {
        return <div className="p-12 text-center text-gray-500">Loading editor...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between sticky top-0 bg-gray-50/95 backdrop-blur py-4 z-10 border-b border-gray-200/50">
                <div className="flex items-center gap-4">
                    <Link href="/admin/content" className="rounded-full p-2 hover:bg-gray-100">
                        <ArrowLeft className="h-5 w-5 text-gray-500" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{page.title}</h1>
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                            Full URL: <span className="font-mono bg-gray-100 px-1 rounded">/{page.slug}</span>
                            {page.is_indexed ? <span className="text-green-600 font-medium">Indexed</span> : <span className="text-orange-500 font-medium">No-Index</span>}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:opacity-50 transition-all"
                >
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                </button>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Section Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Page Sections</h2>
                        <button
                            onClick={() => setIsAddingSection(true)}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                            <Plus className="h-4 w-4" /> Add Section
                        </button>
                    </div>

                    {isAddingSection && (
                        <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Section Key (e.g. 'hero_title', 'about_text')</label>
                            <div className="flex gap-2">
                                <input
                                    autoFocus
                                    type="text"
                                    value={newSectionKey}
                                    onChange={e => setNewSectionKey(e.target.value)}
                                    className="flex-1 text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                                    placeholder="Enter unique key..."
                                />
                                <button onClick={handleAddSection} className="bg-black text-white px-3 py-1 rounded-md text-sm">Add</button>
                                <button onClick={() => setIsAddingSection(false)} className="text-gray-500 px-3 text-sm">Cancel</button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {sections.length === 0 && !isAddingSection && (
                            <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
                                No content sections yet. Add one to start.
                            </div>
                        )}

                        {sections.map((section) => (
                            <div key={section.id} className="group bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 bg-gray-50/50 rounded-t-xl">
                                    <div className="flex items-center gap-2">
                                        <GripVertical className="h-4 w-4 text-gray-300 cursor-move" />
                                        <span className="text-sm font-mono font-medium text-gray-600">{section.section_key}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteSection(section.id)}
                                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Delete Section"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    {/* Detect content type simply for now */}
                                    {typeof section.content === 'object' && section.content !== null ? (
                                        Object.keys(section.content).map((key) => (
                                            <div key={key} className="mb-3 last:mb-0">
                                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                                                    {key}
                                                </label>
                                                <textarea
                                                    rows={Math.max(2, section.content[key].length / 60)}
                                                    className="block w-full rounded-md border-gray-200 shadow-sm text-sm focus:border-black focus:ring-black min-h-[80px]"
                                                    value={section.content[key]}
                                                    onChange={(e) => handleSectionContentChange(section.id, key, e.target.value)}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-red-500 text-sm">Invalid content format</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Page Settings */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sticky top-24">
                        <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Page Metadata</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Display Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={page.title}
                                    onChange={handlePageChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700">Meta Title (SEO)</label>
                                <input
                                    type="text"
                                    name="meta_title"
                                    value={page.meta_title || ''}
                                    onChange={handlePageChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700">Meta Description</label>
                                <textarea
                                    name="meta_description"
                                    rows={4}
                                    value={page.meta_description || ''}
                                    onChange={handlePageChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    id="idx"
                                    type="checkbox"
                                    checked={page.is_indexed}
                                    onChange={(e) => setPage({ ...page, is_indexed: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                />
                                <label htmlFor="idx" className="text-sm text-gray-700">Indexable</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
