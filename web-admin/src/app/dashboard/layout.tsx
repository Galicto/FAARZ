"use client";

import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-1 ml-[260px] px-8 py-6"
                style={{ background: "var(--faarz-bg)" }}
            >
                {children}
                <footer className="footer-credit mt-12">
                    Made with love by Aamina
                </footer>
            </motion.main>
        </div>
    );
}
