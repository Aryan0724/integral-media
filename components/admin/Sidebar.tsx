"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    BarChart3,
    Settings,
    LogOut,
    BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Portfolio",
        href: "/dashboard/portfolio",
        icon: Briefcase,
    },
    {
        title: "Leads",
        href: "/dashboard/leads",
        icon: Users,
    },
    {
        title: "Content Pages",
        href: "/dashboard/content",
        icon: FileText,
    },
    {
        title: "Blogs",
        href: "/dashboard/blogs",
        icon: BookOpen,
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },

    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
    {
        title: "View Live Blog",
        href: "/blog",
        icon: BookOpen, // Or Eye icon
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col justify-between border-r bg-gray-900 text-white">
            <div className="px-4 py-6">
                <div className="mb-8 flex items-center gap-2 px-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-600"></div>
                    <span className="text-lg font-bold tracking-tight">Integral Admin</span>
                </div>

                <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-800",
                                pathname === item.href ? "bg-gray-800 text-blue-400" : "text-gray-400"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="border-t border-gray-800 p-4">
                <button
                    onClick={async () => {
                        await import("@/lib/supabase").then(m => m.supabase.auth.signOut());
                        window.location.href = "/login";
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
