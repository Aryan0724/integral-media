import { Sidebar } from "@/components/admin/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard | Integral Media",
    description: "Management portal",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
