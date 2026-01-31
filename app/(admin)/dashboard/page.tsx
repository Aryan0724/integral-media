import {
    Briefcase,
    Users,
    Eye,
    ArrowUpRight
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Welcome back to your control center.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Visitors"
                    value="12,345"
                    change="+12% from last month"
                    icon={Eye}
                />
                <StatsCard
                    title="Active Leads"
                    value="24"
                    change="+4 new this week"
                    icon={Users}
                />
                <StatsCard
                    title="Portfolio Items"
                    value="12"
                    change="3 Drafts pending"
                    icon={Briefcase}
                />
                <StatsCard
                    title="Conversion Rate"
                    value="3.2%"
                    change="+0.4% increase"
                    icon={ArrowUpRight}
                />
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">No recent activity logged.</p>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, change, icon: Icon }: any) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <Icon className="h-4 w-4 text-gray-400" />
            </div>
            <div className="mt-2">
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <p className="text-xs text-green-600 mt-1">{change}</p>
            </div>
        </div>
    );
}
