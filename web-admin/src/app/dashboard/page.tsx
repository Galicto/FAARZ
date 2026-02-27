"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    HandHeart,
    Building2,
    Users,
    TrendingUp,
    Leaf,
    Flame,
    ArrowUpRight,
    ArrowDownRight,
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
    PieChart,
    Pie,
    Cell,
} from "recharts";
import ScrollReveal, { ScrollRevealGrid } from "@/components/ScrollReveal";
import GlowingCounter from "@/components/GlowingCounter";

/* ── Mock data ─────────────────────────────────────── */
const stats = [
    {
        label: "Total Donations",
        value: "2,847",
        change: "+12.5%",
        up: true,
        icon: HandHeart,
        color: "#34d399",
    },
    {
        label: "Active NGOs",
        value: "184",
        change: "+8.2%",
        up: true,
        icon: Building2,
        color: "#38bdf8",
    },
    {
        label: "Volunteers",
        value: "612",
        change: "+22.1%",
        up: true,
        icon: Users,
        color: "#a78bfa",
    },
    {
        label: "Meals Saved",
        value: "18,420",
        change: "+15.7%",
        up: true,
        icon: Leaf,
        color: "#10ffb0",
    },
];

const weeklyData = [
    { day: "Mon", donations: 42, pickups: 38 },
    { day: "Tue", donations: 56, pickups: 49 },
    { day: "Wed", donations: 38, pickups: 35 },
    { day: "Thu", donations: 72, pickups: 64 },
    { day: "Fri", donations: 85, pickups: 78 },
    { day: "Sat", donations: 64, pickups: 58 },
    { day: "Sun", donations: 48, pickups: 44 },
];

const impactData = [
    { month: "Jul", co2: 120 },
    { month: "Aug", co2: 180 },
    { month: "Sep", co2: 240 },
    { month: "Oct", co2: 310 },
    { month: "Nov", co2: 380 },
    { month: "Dec", co2: 420 },
    { month: "Jan", co2: 490 },
];

const foodTypeData = [
    { name: "Cooked Meals", value: 45 },
    { name: "Packaged", value: 25 },
    { name: "Bakery", value: 18 },
    { name: "Beverages", value: 12 },
];
const PIE_COLORS = ["#34d399", "#38bdf8", "#a78bfa", "#fbbf24"];

const recentDonations = [
    { restaurant: "Green Bowl Kitchen", food: "Dal Chawal × 50", time: "12 min ago", status: "Pickup Pending" },
    { restaurant: "Tandoori Nights", food: "Roti × 200", time: "28 min ago", status: "Volunteer Assigned" },
    { restaurant: "Fresh Bake Café", food: "Pastries × 30", time: "45 min ago", status: "Delivered" },
    { restaurant: "Spice Route", food: "Biryani × 80", time: "1h ago", status: "Delivered" },
    { restaurant: "Café Bloom", food: "Sandwiches × 40", time: "2h ago", status: "Delivered" },
];

function statusColor(s: string) {
    if (s === "Delivered") return "var(--faarz-green)";
    if (s === "Volunteer Assigned") return "var(--faarz-info)";
    return "var(--faarz-warning)";
}

/* ── Page ──────────────────────────────────────────── */
export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header — dramatic slide-in */}
            <ScrollReveal direction="left" distance={60}>
                <div className="flex items-end justify-between">
                    <div>
                        <h1
                            className="text-3xl font-bold tracking-tight text-shimmer"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Dashboard
                        </h1>
                        <p className="mt-1 text-sm" style={{ color: "var(--faarz-text-secondary)" }}>
                            Real-time overview of the FAARZ platform
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--faarz-text-muted)" }}>
                        <Flame size={14} className="animate-pulse-neon" style={{ color: "var(--faarz-neon)" }} />
                        <span>Live</span>
                    </div>
                </div>
            </ScrollReveal>

            {/* Stat Cards — staggered scroll reveal with counters */}
            <ScrollRevealGrid
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                stagger={0.12}
                direction="up"
                distance={50}
            >
                {stats.map((s) => (
                    <motion.div
                        key={s.label}
                        whileHover={{ y: -6, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="glass-card p-5 flex flex-col gap-3 tilt-card"
                    >
                        <div className="tilt-card-inner">
                            <div className="flex items-center justify-between">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center stat-icon-wrap"
                                    style={{ background: `${s.color}18` }}
                                >
                                    <motion.div className="animate-icon-3d">
                                        <s.icon size={20} style={{ color: s.color }} />
                                    </motion.div>
                                </div>
                                <span
                                    className="flex items-center gap-1 text-xs font-semibold"
                                    style={{ color: s.up ? "var(--faarz-green)" : "var(--faarz-danger)" }}
                                >
                                    {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {s.change}
                                </span>
                            </div>
                            <div className="mt-3">
                                <p className="text-2xl font-bold relative" style={{ fontFamily: "var(--font-display)" }}>
                                    <GlowingCounter value={s.value} color={s.color} duration={1.8} />
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: "var(--faarz-text-muted)" }}>
                                    {s.label}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </ScrollRevealGrid>

            {/* Charts Row — parallax slide-in */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Weekly Chart — slide from left */}
                <ScrollReveal direction="left" delay={0.1} className="lg:col-span-2">
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--faarz-text-secondary)" }}>
                            Weekly Donations & Pickups
                        </h3>
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPickups" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(52,211,153,0.06)" />
                                <XAxis dataKey="day" tick={{ fill: "#5a7a6a", fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "#5a7a6a", fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        background: "rgba(16,28,22,0.9)",
                                        border: "1px solid rgba(52,211,153,0.2)",
                                        borderRadius: "12px",
                                        color: "#e8f5f0",
                                        fontSize: 12,
                                    }}
                                />
                                <Area type="monotone" dataKey="donations" stroke="#34d399" strokeWidth={2} fill="url(#colorDonations)" />
                                <Area type="monotone" dataKey="pickups" stroke="#38bdf8" strokeWidth={2} fill="url(#colorPickups)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ScrollReveal>

                {/* Pie Chart — slide from right */}
                <ScrollReveal direction="right" delay={0.2}>
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--faarz-text-secondary)" }}>
                            Food Type Breakdown
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={foodTypeData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                    strokeWidth={0}
                                >
                                    {foodTypeData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: "rgba(16,28,22,0.9)",
                                        border: "1px solid rgba(52,211,153,0.2)",
                                        borderRadius: "12px",
                                        color: "#e8f5f0",
                                        fontSize: 12,
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {foodTypeData.map((d, i) => (
                                <div key={d.name} className="flex items-center gap-2 text-xs">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                                    <span style={{ color: "var(--faarz-text-secondary)" }}>{d.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Impact + Recent Donations Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* CO₂ Impact Chart — slide from left */}
                <ScrollReveal direction="left" delay={0.1}>
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--faarz-text-secondary)" }}>
                            CO₂ Emissions Saved (kg)
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={impactData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(52,211,153,0.06)" />
                                <XAxis dataKey="month" tick={{ fill: "#5a7a6a", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "#5a7a6a", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        background: "rgba(16,28,22,0.9)",
                                        border: "1px solid rgba(52,211,153,0.2)",
                                        borderRadius: "12px",
                                        color: "#e8f5f0",
                                        fontSize: 12,
                                    }}
                                />
                                <Bar dataKey="co2" fill="#10ffb0" radius={[6, 6, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ScrollReveal>

                {/* Recent Donations Table — slide from right with staggered rows */}
                <ScrollReveal direction="right" delay={0.15} className="lg:col-span-2">
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--faarz-text-secondary)" }}>
                            Recent Donations
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ color: "var(--faarz-text-muted)" }}>
                                        <th className="text-left py-2.5 px-3 font-medium text-xs">Restaurant</th>
                                        <th className="text-left py-2.5 px-3 font-medium text-xs">Food</th>
                                        <th className="text-left py-2.5 px-3 font-medium text-xs">Time</th>
                                        <th className="text-left py-2.5 px-3 font-medium text-xs">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentDonations.map((d, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + i * 0.08 }}
                                            className="transition-colors"
                                            style={{ borderTop: "1px solid var(--faarz-border)" }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.background = "var(--faarz-surface-hover)")
                                            }
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                        >
                                            <td className="py-3 px-3 font-medium">{d.restaurant}</td>
                                            <td className="py-3 px-3" style={{ color: "var(--faarz-text-secondary)" }}>
                                                {d.food}
                                            </td>
                                            <td className="py-3 px-3" style={{ color: "var(--faarz-text-muted)" }}>
                                                {d.time}
                                            </td>
                                            <td className="py-3 px-3">
                                                <span
                                                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                                                    style={{
                                                        color: statusColor(d.status),
                                                        background: `${statusColor(d.status)}15`,
                                                    }}
                                                >
                                                    {d.status}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
