"use client";

import React from "react";
import type { LucideProps } from "lucide-react";
import { motion } from "framer-motion";
import {
    Building2,
    CheckCircle2,
    Clock,
    XCircle,
    MapPin,
    Phone,
    Mail,
    ShieldCheck,
} from "lucide-react";
import ScrollReveal, { ScrollRevealGrid } from "@/components/ScrollReveal";

const ngos = [
    { name: "Akshaya Patra Foundation", status: "Verified", location: "Koramangala, Bangalore", contact: "+91 98XXXXX01", email: "contact@akshayapatra.org", meals: 4200, joined: "Jan 2025" },
    { name: "Robin Hood Army", status: "Verified", location: "Indiranagar, Bangalore", contact: "+91 98XXXXX02", email: "info@robinhoodarmy.com", meals: 3100, joined: "Mar 2025" },
    { name: "Feeding India", status: "Pending", location: "HSR Layout, Bangalore", contact: "+91 98XXXXX03", email: "hello@feedingindia.org", meals: 0, joined: "Feb 2026" },
    { name: "No Food Waste", status: "Verified", location: "Whitefield, Bangalore", contact: "+91 98XXXXX04", email: "team@nfw.org", meals: 1800, joined: "Jun 2025" },
    { name: "Annakshetra Trust", status: "Rejected", location: "JP Nagar, Bangalore", contact: "+91 98XXXXX05", email: "annak@trust.org", meals: 0, joined: "Dec 2025" },
    { name: "Hope Foundation", status: "Pending", location: "Electronic City, Bangalore", contact: "+91 98XXXXX06", email: "info@hope.org", meals: 0, joined: "Feb 2026" },
];

const statusConfig: Record<string, { color: string; icon: React.ComponentType<LucideProps>; bg: string }> = {
    Verified: { color: "var(--faarz-green)", icon: CheckCircle2, bg: "rgba(52,211,153,0.1)" },
    Pending: { color: "var(--faarz-warning)", icon: Clock, bg: "rgba(251,191,36,0.1)" },
    Rejected: { color: "var(--faarz-danger)", icon: XCircle, bg: "rgba(255,107,107,0.1)" },
};

export default function NGOsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <ScrollReveal direction="left" distance={60}>
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-shimmer" style={{ fontFamily: "var(--font-display)" }}>NGOs & Shelters</h1>
                        <p className="mt-1 text-sm" style={{ color: "var(--faarz-text-secondary)" }}>Approve, manage, and monitor NGO partners</p>
                    </div>
                    <div className="flex gap-3 text-xs">
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(52,211,153,0.1)", color: "var(--faarz-green)" }}>
                            {ngos.filter((n) => n.status === "Verified").length} Verified
                        </span>
                        <span className="px-3 py-1.5 rounded-full" style={{ background: "rgba(251,191,36,0.1)", color: "var(--faarz-warning)" }}>
                            {ngos.filter((n) => n.status === "Pending").length} Pending
                        </span>
                    </div>
                </div>
            </ScrollReveal>

            {/* NGO Cards */}
            <ScrollRevealGrid
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                stagger={0.1}
                direction="up"
                distance={45}
            >
                {ngos.map((ngo) => {
                    const sc = statusConfig[ngo.status];
                    return (
                        <motion.div
                            key={ngo.name}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="glass-card p-5 flex flex-col gap-4 tilt-card"
                        >
                            <div className="tilt-card-inner">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className="w-11 h-11 rounded-xl flex items-center justify-center stat-icon-wrap"
                                            style={{ background: sc.bg }}
                                            whileHover={{ rotate: 10 }}
                                        >
                                            <Building2 size={20} style={{ color: sc.color }} />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold text-sm">{ngo.name}</h3>
                                            <p className="text-xs mt-0.5" style={{ color: "var(--faarz-text-muted)" }}>Joined {ngo.joined}</p>
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full" style={{ color: sc.color, background: sc.bg }}>
                                        <sc.icon size={12} /> {ngo.status}
                                    </span>
                                </div>

                                <div className="space-y-2 text-xs" style={{ color: "var(--faarz-text-secondary)" }}>
                                    <div className="flex items-center gap-2"><MapPin size={13} /> {ngo.location}</div>
                                    <div className="flex items-center gap-2"><Phone size={13} /> {ngo.contact}</div>
                                    <div className="flex items-center gap-2"><Mail size={13} /> {ngo.email}</div>
                                </div>

                                {ngo.status === "Verified" && (
                                    <div className="flex items-center gap-2 text-xs pt-2" style={{ borderTop: "1px solid var(--faarz-border)" }}>
                                        <ShieldCheck size={14} style={{ color: "var(--faarz-green)" }} />
                                        <span style={{ color: "var(--faarz-text-muted)" }}>{ngo.meals.toLocaleString()} meals facilitated</span>
                                    </div>
                                )}

                                {ngo.status === "Pending" && (
                                    <div className="flex gap-2 pt-2" style={{ borderTop: "1px solid var(--faarz-border)" }}>
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(52,211,153,0.2)" }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                                            style={{ background: "var(--faarz-green)", color: "#0a0f0d" }}
                                        >
                                            Approve
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                                            style={{ background: "rgba(255,107,107,0.12)", color: "var(--faarz-danger)" }}
                                        >
                                            Reject
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </ScrollRevealGrid>
        </div>
    );
}
