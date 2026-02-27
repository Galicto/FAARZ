"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Leaf,
    Utensils,
    Droplets,
    Flame,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
} from "recharts";
import ScrollReveal, { ScrollRevealGrid } from "@/components/ScrollReveal";
import GlowingCounter from "@/components/GlowingCounter";

const monthlyDonations = [
    { month: "Jul", count: 320 },
    { month: "Aug", count: 480 },
    { month: "Sep", count: 410 },
    { month: "Oct", count: 590 },
    { month: "Nov", count: 680 },
    { month: "Dec", count: 540 },
    { month: "Jan", count: 720 },
];

const impactOverTime = [
    { month: "Jul", meals: 1800, co2: 120, waste: 900 },
    { month: "Aug", meals: 2800, co2: 180, waste: 1400 },
    { month: "Sep", meals: 3200, co2: 240, waste: 1600 },
    { month: "Oct", meals: 5100, co2: 310, waste: 2500 },
    { month: "Nov", meals: 6400, co2: 380, waste: 3200 },
    { month: "Dec", meals: 7800, co2: 420, waste: 3900 },
    { month: "Jan", meals: 9200, co2: 490, waste: 4600 },
];

const zoneData = [
    { zone: "Koramangala", donations: 340 },
    { zone: "Indiranagar", donations: 280 },
    { zone: "HSR Layout", donations: 220 },
    { zone: "Whitefield", donations: 400 },
    { zone: "MG Road", donations: 190 },
    { zone: "BTM Layout", donations: 260 },
    { zone: "JP Nagar", donations: 150 },
    { zone: "Elec. City", donations: 310 },
];

const impactStats = [
    { label: "Total Meals Saved", value: "18,420", icon: Utensils, color: "#10ffb0" },
    { label: "CO₂ Saved (kg)", value: "2,140", icon: Leaf, color: "#34d399" },
    { label: "Waste Diverted (kg)", value: "4,610", icon: Droplets, color: "#38bdf8" },
    { label: "Donation Streak Record", value: "45", icon: Flame, color: "#fbbf24" },
];

const tooltipStyle = {
    background: "rgba(16,28,22,0.9)",
    border: "1px solid rgba(52,211,153,0.2)",
    borderRadius: "12px",
    color: "#e8f5f0",
    fontSize: 12,
};

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <ScrollReveal direction="left" distance={60}>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-shimmer" style={{ fontFamily: "var(--font-display)" }}>Analytics</h1>
                    <p className="mt-1 text-sm" style={{ color: "var(--faarz-text-secondary)" }}>Platform performance & environmental impact</p>
                </div>
            </ScrollReveal>

            {/* Impact Stats — staggered with counters */}
            <ScrollRevealGrid
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                stagger={0.12}
                direction="up"
                distance={50}
            >
                {impactStats.map((s) => (
                    <motion.div
                        key={s.label}
                        whileHover={{ y: -6, scale: 1.03 }}
                        className="glass-card p-5 text-center tilt-card"
                    >
                        <div className="tilt-card-inner">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 stat-icon-wrap" style={{ background: `${s.color}18` }}>
                                <motion.div className="animate-icon-3d">
                                    <s.icon size={24} style={{ color: s.color }} />
                                </motion.div>
                            </div>
                            <p className="text-2xl font-bold relative" style={{ fontFamily: "var(--font-display)" }}>
                                <GlowingCounter value={s.value} color={s.color} duration={2} />
                            </p>
                            <p className="text-xs mt-1" style={{ color: "var(--faarz-text-muted)" }}>{s.label}</p>
                        </div>
                    </motion.div>
                ))}
            </ScrollRevealGrid>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Monthly Donations — slide from left */}
                <ScrollReveal direction="left" delay={0.1}>
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--faarz-text-secondary)" }}>Monthly Donations Trend</h3>
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={monthlyDonations}>
                                <defs>
                                    <linearGradient id="gradDon" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10ffb0" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10ffb0" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(52,211,153,0.06)" />
                                <XAxis dataKey="month" tick={{ fill: "#5a7a6a", fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "#5a7a6a", fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Area type="monotone" dataKey="count" stroke="#10ffb0" strokeWidth={2.5} fill="url(#gradDon)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ScrollReveal>

                {/* Donation Zones — slide from right */}
                <ScrollReveal direction="right" delay={0.15}>
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--faarz-text-secondary)" }}>Donation Hotspots by Zone</h3>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={zoneData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(52,211,153,0.06)" />
                                <XAxis type="number" tick={{ fill: "#5a7a6a", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis dataKey="zone" type="category" width={85} tick={{ fill: "#5a7a6a", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Bar dataKey="donations" fill="#34d399" radius={[0, 6, 6, 0]} barSize={16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ScrollReveal>
            </div>

            {/* Impact Over Time — slide from bottom */}
            <ScrollReveal direction="up" delay={0.15}>
                <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--faarz-text-secondary)" }}>Cumulative Environmental Impact</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={impactOverTime}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(52,211,153,0.06)" />
                            <XAxis dataKey="month" tick={{ fill: "#5a7a6a", fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "#5a7a6a", fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Line type="monotone" dataKey="meals" stroke="#10ffb0" strokeWidth={2.5} dot={{ fill: "#10ffb0", r: 4 }} name="Meals Saved" />
                            <Line type="monotone" dataKey="co2" stroke="#34d399" strokeWidth={2} dot={{ fill: "#34d399", r: 3 }} name="CO₂ Saved (kg)" />
                            <Line type="monotone" dataKey="waste" stroke="#38bdf8" strokeWidth={2} dot={{ fill: "#38bdf8", r: 3 }} name="Waste Diverted (kg)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </ScrollReveal>
        </div>
    );
}
