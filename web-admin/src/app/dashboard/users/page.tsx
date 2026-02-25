"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    Building2,
    Utensils,
    UserCheck,
    ShieldCheck,
    Ban,
} from "lucide-react";

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

const roleConfig: Record<string, { color: string; icon: React.ElementType }> = {
    Restaurant: { color: "var(--faarz-warning)", icon: Utensils },
    NGO: { color: "var(--faarz-info)", icon: Building2 },
    Volunteer: { color: "#a78bfa", icon: UserCheck },
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

export default function UsersPage() {
    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item}>
                <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Users</h1>
                <p className="mt-1 text-sm" style={{ color: "var(--faarz-text-secondary)" }}>All registered platform users</p>
            </motion.div>

            {/* Stat chips */}
            <motion.div variants={item} className="flex gap-3 text-xs">
                <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(251,191,36,0.1)", color: "var(--faarz-warning)" }}>
                    {users.filter((u) => u.role === "Restaurant").length} Restaurants
                </span>
                <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(56,189,248,0.1)", color: "var(--faarz-info)" }}>
                    {users.filter((u) => u.role === "NGO").length} NGOs
                </span>
                <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}>
                    {users.filter((u) => u.role === "Volunteer").length} Volunteers
                </span>
            </motion.div>

            {/* Table */}
            <motion.div variants={item} className="glass-card overflow-hidden">
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
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.04 }}
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
                                        <button
                                            className="p-1.5 rounded-lg transition-colors cursor-pointer"
                                            title={u.status === "Active" ? "Suspend" : "Activate"}
                                            style={{ color: u.status === "Active" ? "var(--faarz-danger)" : "var(--faarz-green)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--faarz-surface-hover)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                        >
                                            {u.status === "Active" ? <Ban size={15} /> : <ShieldCheck size={15} />}
                                        </button>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    );
}
