"use client";

import React from "react";
import type { LucideProps } from "lucide-react";
import { motion } from "framer-motion";
import {
    Users,
    Building2,
    Utensils,
    UserCheck,
    ShieldCheck,
    Ban,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const users = [
    { name: "Aarav Sharma", role: "Restaurant", email: "aarav@greenbowl.com", status: "Active", joined: "Jan 2025" },
    { name: "Priya Nair", role: "NGO", email: "priya@robinhoodarmy.com", status: "Active", joined: "Mar 2025" },
    { name: "Rahul Verma", role: "Volunteer", email: "rahul.v@gmail.com", status: "Active", joined: "Apr 2025" },
    { name: "Sneha Gupta", role: "Restaurant", email: "sneha@cafbloom.com", status: "Active", joined: "May 2025" },
    { name: "Vikram Reddy", role: "NGO", email: "vikram@feedingindia.org", status: "Suspended", joined: "Jun 2025" },
    { name: "Ananya Das", role: "Volunteer", email: "ananya.d@gmail.com", status: "Active", joined: "Jul 2025" },
    { name: "Karthik Iyer", role: "Restaurant", email: "karthik@spiceroute.com", status: "Active", joined: "Aug 2025" },
    { name: "Meera Jain", role: "Volunteer", email: "meera.j@gmail.com", status: "Active", joined: "Sep 2025" },
];

const roleConfig: Record<string, { color: string; icon: React.ComponentType<LucideProps> }> = {
    Restaurant: { color: "var(--faarz-warning)", icon: Utensils },
    NGO: { color: "var(--faarz-info)", icon: Building2 },
    Volunteer: { color: "#a78bfa", icon: UserCheck },
};

export default function UsersPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <ScrollReveal direction="left" distance={60}>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-shimmer" style={{ fontFamily: "var(--font-display)" }}>Users</h1>
                    <p className="mt-1 text-sm" style={{ color: "var(--faarz-text-secondary)" }}>All registered platform users</p>
                </div>
            </ScrollReveal>

            {/* Stat chips */}
            <ScrollReveal direction="up" delay={0.1}>
                <div className="flex gap-3 text-xs">
                    <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(251,191,36,0.1)", color: "var(--faarz-warning)" }}>
                        {users.filter((u) => u.role === "Restaurant").length} Restaurants
                    </span>
                    <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(56,189,248,0.1)", color: "var(--faarz-info)" }}>
                        {users.filter((u) => u.role === "NGO").length} NGOs
                    </span>
                    <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}>
                        {users.filter((u) => u.role === "Volunteer").length} Volunteers
                    </span>
                </div>
            </ScrollReveal>

            {/* Table */}
            <ScrollReveal direction="up" delay={0.2}>
                <div className="glass-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ color: "var(--faarz-text-muted)", borderBottom: "1px solid var(--faarz-border)" }}>
                                <th className="text-left py-3 px-5 font-medium text-xs">Name</th>
                                <th className="text-left py-3 px-5 font-medium text-xs">Role</th>
                                <th className="text-left py-3 px-5 font-medium text-xs">Email</th>
                                <th className="text-left py-3 px-5 font-medium text-xs">Status</th>
                                <th className="text-left py-3 px-5 font-medium text-xs">Joined</th>
                                <th className="text-left py-3 px-5 font-medium text-xs">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => {
                                const rc = roleConfig[u.role];
                                return (
                                    <motion.tr
                                        key={u.email}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.06 }}
                                        className="transition-colors"
                                        style={{ borderBottom: "1px solid var(--faarz-border)" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--faarz-surface-hover)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                    >
                                        <td className="py-3.5 px-5 font-medium">{u.name}</td>
                                        <td className="py-3.5 px-5">
                                            <span className="flex items-center gap-1.5 text-xs" style={{ color: rc.color }}>
                                                <rc.icon size={13} /> {u.role}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-5" style={{ color: "var(--faarz-text-secondary)" }}>{u.email}</td>
                                        <td className="py-3.5 px-5">
                                            <span
                                                className="text-xs font-medium px-2 py-0.5 rounded-full"
                                                style={{
                                                    color: u.status === "Active" ? "var(--faarz-green)" : "var(--faarz-danger)",
                                                    background: u.status === "Active" ? "rgba(52,211,153,0.1)" : "rgba(255,107,107,0.1)",
                                                }}
                                            >
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-5 text-xs" style={{ color: "var(--faarz-text-muted)" }}>{u.joined}</td>
                                        <td className="py-3.5 px-5">
                                            <motion.button
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1.5 rounded-lg transition-colors cursor-pointer"
                                                title={u.status === "Active" ? "Suspend" : "Activate"}
                                                style={{ color: u.status === "Active" ? "var(--faarz-danger)" : "var(--faarz-green)" }}
                                                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--faarz-surface-hover)")}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                            >
                                                {u.status === "Active" ? <Ban size={15} /> : <ShieldCheck size={15} />}
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </ScrollReveal>
        </div>
    );
}
