"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Settings as SettingsIcon,
    Bell,
    Shield,
    Palette,
    Globe,
    Database,
    Save,
    ToggleLeft,
    ToggleRight,
} from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className="cursor-pointer" style={{ color: enabled ? "var(--faarz-green)" : "var(--faarz-text-muted)" }}>
            {enabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
        </button>
    );
}

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [autoApprove, setAutoApprove] = useState(false);
    const [analytics, setAnalytics] = useState(true);
    const [twoFa, setTwoFa] = useState(true);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-3xl">
            <motion.div variants={item}>
                <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Settings</h1>
                <p className="mt-1 text-sm" style={{ color: "var(--faarz-text-secondary)" }}>Configure platform preferences</p>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={item} className="glass-card p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(52,211,153,0.1)" }}>
                        <Bell size={18} style={{ color: "var(--faarz-green)" }} />
                    </div>
                    <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderTop: "1px solid var(--faarz-border)" }}>
                    <div>
                        <p className="text-sm font-medium">Push Notifications</p>
                        <p className="text-xs" style={{ color: "var(--faarz-text-muted)" }}>Get notified on new donations and NGO requests</p>
                    </div>
                    <Toggle enabled={notifications} onChange={() => setNotifications(!notifications)} />
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderTop: "1px solid var(--faarz-border)" }}>
                    <div>
                        <p className="text-sm font-medium">Analytics Emails</p>
                        <p className="text-xs" style={{ color: "var(--faarz-text-muted)" }}>Weekly impact reports sent to admin email</p>
                    </div>
                    <Toggle enabled={analytics} onChange={() => setAnalytics(!analytics)} />
                </div>
            </motion.div>

            {/* Security */}
            <motion.div variants={item} className="glass-card p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(56,189,248,0.1)" }}>
                        <Shield size={18} style={{ color: "var(--faarz-info)" }} />
                    </div>
                    <h3 className="font-semibold">Security</h3>
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderTop: "1px solid var(--faarz-border)" }}>
                    <div>
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs" style={{ color: "var(--faarz-text-muted)" }}>Require OTP for admin logins</p>
                    </div>
                    <Toggle enabled={twoFa} onChange={() => setTwoFa(!twoFa)} />
                </div>
            </motion.div>

            {/* Automation */}
            <motion.div variants={item} className="glass-card p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(167,139,250,0.1)" }}>
                        <Database size={18} style={{ color: "#a78bfa" }} />
                    </div>
                    <h3 className="font-semibold">Automation</h3>
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderTop: "1px solid var(--faarz-border)" }}>
                    <div>
                        <p className="text-sm font-medium">Auto-Approve Verified NGOs</p>
                        <p className="text-xs" style={{ color: "var(--faarz-text-muted)" }}>Automatically approve NGOs with known verification IDs</p>
                    </div>
                    <Toggle enabled={autoApprove} onChange={() => setAutoApprove(!autoApprove)} />
                </div>
            </motion.div>

            {/* Save */}
            <motion.div variants={item}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer btn-ripple"
                    style={{ background: "linear-gradient(135deg, var(--faarz-green), var(--faarz-accent))", color: "#0a0f0d" }}
                >
                    <Save size={16} /> Save Changes
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
