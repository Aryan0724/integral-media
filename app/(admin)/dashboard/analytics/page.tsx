"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AnalyticsPage() {
    const [stats, setStats] = useState({
        totalLeads: 0,
        leadsByStatus: [] as { name: string; value: number; color: string }[],
        projectsByCategory: [] as { name: string; value: number; color: string }[],
        recentLeads: [] as any[]
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Leads
                const { data: leads, error: leadsError } = await supabase
                    .from('leads')
                    .select('*')
                    .order('created_at', { ascending: false });

                // Fetch Portfolio
                const { data: projects, error: projectsError } = await supabase
                    .from('portfolio_items')
                    .select('*');

                if (leadsError || projectsError) {
                    console.error("Error fetching analytics:", leadsError, projectsError);
                    return;
                }

                // Process Leads Data
                const leadsCount = leads?.length || 0;

                const statusCounts = leads?.reduce((acc: any, lead) => {
                    const status = lead.status || 'new';
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                }, {});

                const leadsData = [
                    { name: 'New', value: statusCounts?.['new'] || 0, color: '#3b82f6' }, // blue-500
                    { name: 'Contacted', value: statusCounts?.['contacted'] || 0, color: '#eab308' }, // yellow-500
                    { name: 'Closed', value: statusCounts?.['closed'] || 0, color: '#22c55e' }, // green-500
                    { name: 'Lost', value: statusCounts?.['lost'] || 0, color: '#9ca3af' }, // gray-400
                ].filter(d => d.value > 0);

                // Process Projects Data
                const categoryCounts = projects?.reduce((acc: any, item) => {
                    const cat = item.category || 'Other';
                    acc[cat] = (acc[cat] || 0) + 1;
                    return acc;
                }, {});

                const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
                const projectsData = Object.keys(categoryCounts || {}).map((cat, index) => ({
                    name: cat,
                    value: categoryCounts[cat],
                    color: COLORS[index % COLORS.length]
                }));

                setStats({
                    totalLeads: leadsCount,
                    leadsByStatus: leadsData,
                    projectsByCategory: projectsData,
                    recentLeads: leads?.slice(0, 5) || []
                });

            } catch (error) {
                console.error("Analytics load failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analytics Dashboard</h1>
                <p className="text-sm text-gray-500">Overview of your leads and portfolio performance.</p>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="text-sm text-gray-500">Total Leads</div>
                    <div className="text-3xl font-bold text-gray-900">{stats.totalLeads}</div>
                </div>
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="text-sm text-gray-500">Pending Actions</div>
                    <div className="text-3xl font-bold text-blue-600">
                        {stats.leadsByStatus.find(s => s.name === 'New')?.value || 0}
                    </div>
                </div>
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="text-sm text-gray-500">Total Projects</div>
                    <div className="text-3xl font-bold text-indigo-600">
                        {stats.projectsByCategory.reduce((a, b) => a + b.value, 0)}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

                {/* Leads by Status Chart */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-lg font-semibold text-gray-900">Leads by Status</h3>
                    <div className="h-[300px] w-full">
                        {stats.leadsByStatus.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.leadsByStatus}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {stats.leadsByStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">No leads data available</div>
                        )}
                    </div>
                </div>

                {/* Projects by Category Chart */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-lg font-semibold text-gray-900">Projects Distribution</h3>
                    <div className="h-[300px] w-full">
                        {stats.projectsByCategory.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.projectsByCategory}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {stats.projectsByCategory.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">No projects added yet</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Leads Widget */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-semibold text-gray-900">Recent Enquiries</h3>
                {stats.recentLeads.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                        {stats.recentLeads.map((lead) => (
                            <li key={lead.id} className="flex justify-between py-3 text-sm">
                                <div>
                                    <div className="font-medium text-gray-900">{lead.name}</div>
                                    <div className="text-xs text-gray-500">{lead.email}</div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${lead.status === 'new' ? 'bg-blue-50 text-blue-700' :
                                            lead.status === 'contacted' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {lead.status}
                                    </span>
                                    <div className="mt-1 text-xs text-gray-400">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">No recent activity.</p>
                )}
            </div>
        </div>
    );
}
