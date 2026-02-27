"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { LucideProps } from "lucide-react";
import {
    HandHeart,
    Search,
    CheckCircle2,
    Clock,
    Truck,
    MapPin,
} from "lucide-react";
import ScrollReveal, { ScrollRevealGrid } from "@/components/ScrollReveal";

const donations = [
    { id: "DON-2847", restaurant: "Green Bowl Kitchen", food: "Dal Chawal", qty: 50, type: "Veg", status: "Pickup Pending", time: "12 min ago", location: "Koramangala, Bangalore" },
    { id: "DON-2846", restaurant: "Tandoori Nights", food: "Roti & Sabji", qty: 200, type: "Veg", status: "Volunteer Assigned", time: "28 min ago", location: "Indiranagar, Bangalore" },
    { id: "DON-2845", restaurant: "Fresh Bake Café", food: "Pastries", qty: 30, type: "Veg", status: "Delivered", time: "45 min ago", location: "HSR Layout, Bangalore" },
    { id: "DON-2844", restaurant: "Spice Route", food: "Biryani", qty: 80, type: "Non-Veg", status: "Delivered", time: "1h ago", location: "Whitefield, Bangalore" },
    { id: "DON-2843", restaurant: "Café Bloom", food: "Sandwiches", qty: 40, type: "Veg", status: "Delivered", time: "2h ago", location: "MG Road, Bangalore" },
    { id: "DON-2842", restaurant: "Royal Kitchen", food: "Paneer Tikka", qty: 60, type: "Veg", status: "Pickup Pending", time: "2.5h ago", location: "Jayanagar, Bangalore" },
    { id: "DON-2841", restaurant: "The Wok Station", food: "Noodles", qty: 45, type: "Veg", status: "Delivered", time: "3h ago", location: "Electronic City, Bangalore" },
    { id: "DON-2840", restaurant: "Biryani Blues", food: "Chicken Biryani", qty: 100, type: "Non-Veg", status: "Volunteer Assigned", time: "3.5h ago", location: "BTM Layout, Bangalore" },
];

const statusConfig: Record<string, { color: string; icon: React.ComponentType<LucideProps> }> = {
    "Pickup Pending": { color: "var(--faarz-warning)", icon: Clock },
    "Volunteer Assigned": { color: "var(--faarz-info)", icon: Truck },
    "Delivered": { color: "var(--faarz-green)", icon: CheckCircle2 },
};

export default function DonationsPage() {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const filtered = donations.filter((d) => {
        const matchSearch = d.restaurant.toLowerCase().includes(search.toLowerCase()) || d.food.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "All" || d.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <ScrollReveal direction="left" distance={60}>
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-shimmer" style={{ fontFamily: "var(--font-display)" }}>
                            Donations
                        </h1>
                        <p className="mt-1 text-sm" style={{ color: "var(--faarz-text-secondary)" }}>
                            Monitor and manage all food donations
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--faarz-green)18", color: "var(--faarz-green)" }}>
                        <HandHeart size={14} /> {donations.length} Total
                    </div>
                </div>
            </ScrollReveal>

            {/* Filters */}
            <ScrollReveal direction="up" delay={0.1}>
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="relative flex-1 min-w-[240px]">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--faarz-text-muted)" }} />
                        <input
                            type="text"
                            placeholder="Search by restaurant or food..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                            style={{ background: "var(--faarz-surface)", border: "1px solid var(--faarz-border)", color: "var(--faarz-text)" }}
                            onFocus={(e) => (e.target.style.borderColor = "var(--faarz-border-active)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--faarz-border)")}
                        />
                    </div>
                    <div className="flex gap-2">
                        {["All", "Pickup Pending", "Volunteer Assigned", "Delivered"].map((s) => (
                            <motion.button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer"
                                style={{
                                    background: filterStatus === s ? "var(--faarz-neon-glow)" : "var(--faarz-surface)",
                                    color: filterStatus === s ? "var(--faarz-neon)" : "var(--faarz-text-secondary)",
                                    border: `1px solid ${filterStatus === s ? "var(--faarz-border-active)" : "var(--faarz-border)"}`,
                                }}
                            >
                                {s}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Donation Cards */}
            <ScrollRevealGrid
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                stagger={0.08}
                direction="up"
                distance={40}
            >
                {filtered.map((d) => {
                    const sc = statusConfig[d.status] || statusConfig["Delivered"];
                    return (
                        <motion.div
                            key={d.id}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="glass-card p-5 flex flex-col gap-3 tilt-card"
                        >
                            <div className="tilt-card-inner">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono" style={{ color: "var(--faarz-text-muted)" }}>{d.id}</span>
                                    <span
                                        className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                                        style={{ color: sc.color, background: `${sc.color}15` }}
                                    >
                                        <sc.icon size={12} /> {d.status}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{d.restaurant}</h3>
                                    <p className="text-sm mt-0.5" style={{ color: "var(--faarz-text-secondary)" }}>
                                        {d.food} × {d.qty} &nbsp;·&nbsp;
                                        <span style={{ color: d.type === "Veg" ? "var(--faarz-green)" : "var(--faarz-warning)" }}>{d.type}</span>
                                    </p>
                                </div>
                                <div className="flex items-center justify-between text-xs" style={{ color: "var(--faarz-text-muted)" }}>
                                    <span className="flex items-center gap-1"><MapPin size={12} /> {d.location}</span>
                                    <span>{d.time}</span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </ScrollRevealGrid>
        </div>
    );
}
