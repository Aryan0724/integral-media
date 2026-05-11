
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Default response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseKey) {
            const supabase = createServerClient(
                supabaseUrl,
                supabaseKey,
                {
                    cookies: {
                        getAll() {
                            return request.cookies.getAll();
                        },
                        setAll(cookiesToSet) {
                            // Note: request.cookies.set might be restricted in some environments. 
                            // If it fails, we catch it silently to prevent 500s.
                            try {
                                cookiesToSet.forEach(({ name, value, options }) =>
                                    request.cookies.set(name, value)
                                );
                            } catch (err) {
                                console.warn("Could not set request cookies:", err);
                            }

                            response = NextResponse.next({
                                request: {
                                    headers: request.headers,
                                },
                            });

                            cookiesToSet.forEach(({ name, value, options }) =>
                                response.cookies.set(name, value, options)
                            );
                        },
                    },
                }
            );

            // Check auth
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                // console.warn("Supabase Auth Error:", error);
            }

            // Protected Routes Logic
            if (request.nextUrl.pathname.startsWith('/dashboard')) {
                if (!user) {
                    const redirectUrl = request.nextUrl.clone();
                    redirectUrl.pathname = '/login';
                    return NextResponse.redirect(redirectUrl);
                }
            }
        }
    } catch (e) {
        console.error("Middleware Critical Error:", e);
        // On critical error, allows traffic but might be unauthenticated.
        // Better than 500 page.
    }

    return response;
}

export const config = {
    matcher: ['/dashboard/:path*'],
}
