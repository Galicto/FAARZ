"use client";

import Sidebar from "@/components/Sidebar";
import AuroraBackground from "@/components/AuroraBackground";
import { motion } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Aurora living background */}
            <AuroraBackground />

            <Sidebar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 ml-[260px] px-8 py-6 relative z-[1]"
                style={{ background: "transparent" }}
            >
                {children}
                <footer className="footer-credit mt-12">
                    Made with love by Aamina
                </footer>
            </motion.main>
        </div>
    );
}
