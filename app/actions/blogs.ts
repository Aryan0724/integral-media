"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData) {
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
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const status = formData.get("status") as string;
    const thumbnail_url = formData.get("thumbnail_url") as string || "/api/placeholder/400/250";

    if (!title || !content) {
        return { error: "Title and Content are required." };
    }

    // Generate Slug
    const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);

    const { error } = await supabase.from("blogs").insert({
        title,
        slug,
        content,
        excerpt,
        status,
        thumbnail_url
    });

    if (error) return { error: error.message };

    revalidatePath("/dashboard/blogs");
    redirect("/dashboard/blogs");
}
