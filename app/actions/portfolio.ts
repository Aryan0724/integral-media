"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPortfolioItem(formData: FormData) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    );

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const tier = formData.get("tier") as string;
    const description = formData.get("description") as string;
    const techStackRaw = formData.get("tech_stack") as string;
    const liveUrl = formData.get("live_url") as string;
    const status = formData.get("status") as string;
    const isFeatured = formData.get("is_featured") === "on";

    // JSON Fields
    const caseStudyJson = formData.get("case_study") as string;
    const imagesJson = formData.get("images") as string;
    const thumbnailUrl = formData.get("thumbnail_url") as string || "/api/placeholder/400/320";

    let caseStudy = {};
    let images = [];

    try {
        if (caseStudyJson) caseStudy = JSON.parse(caseStudyJson);
        if (imagesJson) images = JSON.parse(imagesJson);
    } catch (e) {
        console.error("JSON Parse Error", e);
    }

    // Basic validation
    if (!title || !category) {
        return { error: "Title and Category are required." };
    }

    // Generate Slug
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const techStack = techStackRaw ? techStackRaw.split(",").map((t) => t.trim()) : [];

    // Insert into DB
    const { error } = await supabase.from("portfolio_items").insert({
        title,
        slug,
        category,
        tier,
        description,
        tech_stack: techStack,
        live_url: liveUrl,
        status,
        is_featured: isFeatured,
        thumbnail_url: thumbnailUrl,
        images: images,
        case_study: caseStudy
    });

    if (error) {
        console.error("Supabase Error:", error);
        return { error: error.message };
    }

    revalidatePath("/dashboard/portfolio");
    redirect("/dashboard/portfolio");
}
