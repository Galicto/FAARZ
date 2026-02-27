"use client";

import React from "react";
import type { LucideProps } from "lucide-react";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Clock,
    MapPin,
    Star,
    Utensils,
} from "lucide-react";
import ScrollReveal, { ScrollRevealGrid } from "@/components/ScrollReveal";

const restaurants = [
    { name: "Green Bowl Kitchen", status: "Verified", location: "Koramangala", rating: 4.8, totalDonations: 142, streak: 28, type: "Pure Veg" },
    { name: "Tandoori Nights", status: "Verified", location: "Indiranagar", rating: 4.6, totalDonations: 98, streak: 15, type: "Multi-Cuisine" },
    { name: "Fresh Bake Café", status: "Verified", location: "HSR Layout", rating: 4.9, totalDonations: 76, streak: 32, type: "Bakery" },
    { name: "Spice Route Fine Dining", status: "Pending", location: "Whitefield", rating: 0, totalDonations: 0, streak: 0, type: "Non-Veg" },
    { name: "Café Bloom", status: "Verified", location: "MG Road", rating: 4.5, totalDonations: 54, streak: 8, type: "Continental" },
    { name: "Delhi Darbar", status: "Pending", location: "BTM Layout", rating: 0, totalDonations: 0, streak: 0, type: "North Indian" },
];

const statusConfig: Record<string, { color: string; icon: React.ComponentType<LucideProps> }> = {
    Verified: { color: "var(--faarz-green)", icon: CheckCircle2 },
    Pending: { color: "var(--faarz-warning)", icon: Clock },
};

export default function RestaurantsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <ScrollReveal direction="left" distance={60}>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-shimmer" style={{ fontFamily: "var(--font-display)" }}>Restaurants</h1>
                    <p className="mt-1 text-sm" style={{ color: "var(--faarz-text-secondary)" }}>Verify and manage food donor partners</p>
                </div>
            </ScrollReveal>

            {/* Restaurant Cards */}
            <ScrollRevealGrid
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                stagger={0.1}
                direction="up"
                distance={45}
            >
                {restaurants.map((r) => {
                    const sc = statusConfig[r.status];
                    return (
                        <motion.div
                            key={r.name}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="glass-card p-5 flex flex-col gap-4 tilt-card"
                        >
                            <div className="tilt-card-inner">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold">{r.name}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: "var(--faarz-text-muted)" }}>
                                            <MapPin size={12} /> {r.location}
                                            &nbsp;·&nbsp;
                                            <Utensils size={12} /> {r.type}
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full" style={{ color: sc.color, background: `${sc.color}15` }}>
                                        <sc.icon size={12} /> {r.status}
                                    </span>
                                </div>

                                {r.status === "Verified" && (
                                    <div className="grid grid-cols-3 gap-3 text-center">
                                        <div>
                                            <p className="text-lg font-bold" style={{ color: "var(--faarz-neon)" }}>{r.totalDonations}</p>
                                            <p className="text-[10px]" style={{ color: "var(--faarz-text-muted)" }}>Donations</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold" style={{ color: "var(--faarz-warning)" }}>🔥 {r.streak}</p>
                                            <p className="text-[10px]" style={{ color: "var(--faarz-text-muted)" }}>Day Streak</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold flex items-center justify-center gap-1">
                                                <Star size={14} style={{ color: "var(--faarz-warning)", fill: "var(--faarz-warning)" }} /> {r.rating}
                                            </p>
                                            <p className="text-[10px]" style={{ color: "var(--faarz-text-muted)" }}>Rating</p>
                                        </div>
                                    </div>
                                )}

                                {r.status === "Pending" && (
                                    <div className="flex gap-2 pt-2" style={{ borderTop: "1px solid var(--faarz-border)" }}>
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(52,211,153,0.2)" }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                                            style={{ background: "var(--faarz-green)", color: "#0a0f0d" }}
                                        >
                                            Verify
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
