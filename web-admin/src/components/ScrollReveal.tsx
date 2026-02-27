"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    stagger?: number;
    once?: boolean;
}

const offsets: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: 1 },
    down: { x: 0, y: -1 },
    left: { x: 1, y: 0 },
    right: { x: -1, y: 0 },
};

export default function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    distance = 50,
    className = "",
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const offset = offsets[direction];

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                x: offset.x * distance,
                y: offset.y * distance,
                scale: 0.95,
            }}
            animate={
                isInView
                    ? { opacity: 1, x: 0, y: 0, scale: 1 }
                    : { opacity: 0, x: offset.x * distance, y: offset.y * distance, scale: 0.95 }
            }
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.div>
    );
}

/* Grid children stagger wrapper */
export function ScrollRevealGrid({
    children,
    className = "",
    stagger = 0.08,
    direction = "up",
    distance = 40,
}: {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    direction?: Direction;
    distance?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });
    const offset = offsets[direction];

    return (
        <div ref={ref} className={className}>
            {React.Children.map(children, (child, i) => (
                <motion.div
                    initial={{
                        opacity: 0,
                        x: offset.x * distance,
                        y: offset.y * distance,
                        scale: 0.92,
                    }}
                    animate={
                        isInView
                            ? { opacity: 1, x: 0, y: 0, scale: 1 }
                            : {}
                    }
                    transition={{
                        duration: 0.55,
                        delay: i * stagger,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    );
}
