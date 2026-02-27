"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface GlowingCounterProps {
    value: string; // e.g. "2,847" or "18,420"
    color?: string;
    className?: string;
    duration?: number;
}

export default function GlowingCounter({
    value,
    color = "var(--faarz-text)",
    className = "",
    duration = 2,
}: GlowingCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (!isInView) return;

        // Extract the numeric value, ignoring commas
        const numericStr = value.replace(/[^0-9.]/g, "");
        const target = parseFloat(numericStr);

        if (isNaN(target)) {
            setDisplayValue(value);
            return;
        }

        const suffix = value.replace(/[0-9,. ]/g, "").trim();
        const hasCommas = value.includes(",");

        const controls = animate(0, target, {
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            onUpdate(latest) {
                const rounded = Math.round(latest);
                const formatted = hasCommas
                    ? rounded.toLocaleString()
                    : rounded.toString();
                setDisplayValue(formatted + (suffix ? ` ${suffix}` : ""));
            },
        });

        return () => controls.stop();
    }, [isInView, value, duration]);

    return (
        <motion.span
            ref={ref}
            className={className}
            style={{
                color,
                display: "inline-block",
                fontVariantNumeric: "tabular-nums",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
        >
            {displayValue}
            {/* Subtle glow flash on complete */}
            {isInView && (
                <motion.span
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(circle, ${color}22, transparent)`,
                        borderRadius: "8px",
                        pointerEvents: "none",
                    }}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.5, delay: duration }}
                />
            )}
        </motion.span>
    );
}
