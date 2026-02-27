"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    Building2,
    HandHeart,
    TrendingUp,
    ShieldCheck,
    Settings,
    LogOut,
    Menu,
    X,
    Leaf,
    Sun,
    Moon,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/donations", label: "Donations", icon: HandHeart },
    { href: "/dashboard/ngos", label: "NGOs", icon: Building2 },
    { href: "/dashboard/restaurants", label: "Restaurants", icon: ShieldCheck },
    { href: "/dashboard/users", label: "Users", icon: Users },
    { href: "/dashboard/analytics", label: "Analytics", icon: TrendingUp },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
    };

    return (
        <motion.aside
            animate={{ width: collapsed ? 72 : 260 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 h-screen z-50 flex flex-col"
            style={{
                background: "rgba(18, 30, 24, 0.85)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRight: "1px solid var(--faarz-border)",
            }}
        >
            {/* Animated glow line at top */}
            <motion.div
                className="h-[2px] w-full"
                style={{
                    background: "linear-gradient(90deg, transparent, var(--faarz-neon), var(--faarz-green), transparent)",
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo */}
            <div className="flex items-center justify-between px-4 py-5">
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2.5"
                        >
                            <motion.div
                                className="w-9 h-9 rounded-xl flex items-center justify-center neon-glow"
                                style={{ background: "var(--faarz-green)" }}
                                animate={{ rotateY: [0, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <Leaf size={20} color="#0a0f0d" strokeWidth={2.5} />
                            </motion.div>
                            <span
                                className="text-xl font-bold tracking-tight text-shimmer"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                FAARZ
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg transition-colors cursor-pointer"
                    style={{ color: "var(--faarz-text-secondary)" }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--faarz-surface-hover)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    {collapsed ? <Menu size={20} /> : <X size={18} />}
                </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
                {navItems.map((item, idx) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ x: 3 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer relative"
                                style={{
                                    color: isActive ? "var(--faarz-neon)" : "var(--faarz-text-secondary)",
                                    background: isActive ? "var(--faarz-neon-glow)" : "transparent",
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                                        style={{
                                            background: "var(--faarz-neon)",
                                            boxShadow: "0 0 12px var(--faarz-neon), 0 0 4px var(--faarz-green)",
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <motion.div
                                    className={isActive ? "animate-subtle-bounce" : ""}
                                    style={{ display: "flex" }}
                                >
                                    <item.icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                                </motion.div>
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="text-sm font-medium whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="px-3 py-4 space-y-2" style={{ borderTop: "1px solid var(--faarz-border)" }}>
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                    style={{ color: "var(--faarz-text-secondary)" }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--faarz-surface-hover)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm font-medium"
                            >
                                {theme === "dark" ? "Light Mode" : "Dark Mode"}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>

                {/* Logout */}
                <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                    style={{ color: "var(--faarz-danger)" }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(255,107,107,0.08)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    <LogOut size={20} />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm font-medium"
                            >
                                Logout
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Bottom glow line */}
            <motion.div
                className="h-[1px] w-full"
                style={{
                    background: "linear-gradient(90deg, transparent, var(--faarz-green), transparent)",
                }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.aside>
    );
}
