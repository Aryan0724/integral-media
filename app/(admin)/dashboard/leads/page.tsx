"use client";

import { useEffect, useState } from "react";
import { Mail, MoreHorizontal, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Lead {
    id: string;
    name: string;
    email: string;
    company?: string;
    services_interested?: string[];
    status: string;
    created_at: string;
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const { data, error } = await supabase
                    .from("leads")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching leads:", error);
                } else {
                    setLeads(data || []);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeads();
    }, []);

    const markAsContacted = async (id: string) => {
        // Optimistic update
        setLeads(leads.map(l => l.id === id ? { ...l, status: 'contacted' } : l));
        await supabase.from("leads").update({ status: 'contacted' }).eq("id", id);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Leads & Enquiries</h1>
                    <p className="text-sm text-gray-500">Track and manage your potential clients.</p>
                </div>
                <div className="flex gap-2">
                    <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none">
                        <option>All Status</option>
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Closed</option>
                    </select>
                </div>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center p-12 text-gray-500">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading leads...
                    </div>
                ) : leads.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No leads found yet.
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Name / Company</th>
                                <th className="px-6 py-3 font-medium">Contact</th>
                                <th className="px-6 py-3 font-medium">Services</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{lead.name}</div>
                                        <div className="text-gray-500 text-xs">{lead.company || '—'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <Mail className="h-3 w-3" />
                                                {lead.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {Array.isArray(lead.services_interested) ? lead.services_interested.map((service, i) => (
                                                <span key={i} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    {service}
                                                </span>
                                            )) : (
                                                <span className="text-xs text-gray-400">None</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={lead.status}
                                            onChange={async (e) => {
                                                const newStatus = e.target.value;
                                                setLeads(leads.map(l => l.id === lead.id ? { ...l, status: newStatus } : l));
                                                await supabase.from("leads").update({ status: newStatus }).eq("id", lead.id);
                                            }}
                                            className={`rounded-full px-2 py-1 text-xs font-medium border-0 ring-1 ring-inset outline-none cursor-pointer focus:ring-2 ${lead.status === 'new' ? 'bg-blue-50 text-blue-700 ring-blue-700/10 focus:ring-blue-700' :
                                                lead.status === 'contacted' ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 focus:ring-yellow-600' :
                                                    lead.status === 'closed' ? 'bg-green-50 text-green-700 ring-green-600/20 focus:ring-green-600' :
                                                        'bg-gray-50 text-gray-600 ring-gray-500/10 focus:ring-gray-500'
                                                }`}
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="closed">Closed</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {new Date(lead.created_at).toLocaleDateString()} <br />
                                        <span className="text-xs">{new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        new: "bg-blue-50 text-blue-700 ring-blue-700/10",
        contacted: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
        closed: "bg-green-50 text-green-700 ring-green-600/20",
        lost: "bg-gray-50 text-gray-600 ring-gray-500/10"
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status as keyof typeof styles] || styles.new}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}
