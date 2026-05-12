"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            // Successful login
            // Force hard navigation to ensure middleware sees the cookie
            window.location.href = "/dashboard";

        } catch (err: any) {
            setError(err.message || "Failed to login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black">
                        <KeyRound className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Admin Login</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your credentials to access the dashboard</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                                placeholder="admin@integral.media"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : "Sign in"}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    <a href="/" className="hover:underline flex items-center justify-center gap-1"><ArrowLeft className="w-3 h-3" /> Back to Website</a>
                </div>
            </div>
        </div>
    );
}
