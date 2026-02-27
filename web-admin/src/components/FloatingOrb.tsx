"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

function Orb() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame(({ clock, pointer }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = pointer.y * 0.3 + clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.y = pointer.x * 0.3 + clock.getElapsedTime() * 0.15;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
            <Sphere ref={meshRef} args={[1.4, 64, 64]}>
                <MeshDistortMaterial
                    color="#10ffb0"
                    emissive="#34d399"
                    emissiveIntensity={0.4}
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.35}
                    speed={2.5}
                    transparent
                    opacity={0.85}
                />
            </Sphere>
        </Float>
    );
}

export default function FloatingOrb({
    size = "280px",
    className = "",
}: {
    size?: string;
    className?: string;
}) {
    return (
        <div
            className={className}
            style={{
                width: size,
                height: size,
                position: "relative",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                dpr={[1, 2]}
                style={{ background: "transparent" }}
                gl={{ alpha: true }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1} color="#34d399" />
                <pointLight position={[-3, -3, 2]} intensity={0.6} color="#10ffb0" />
                <Orb />
            </Canvas>
            {/* Glow halo behind the orb */}
            <div
                style={{
                    position: "absolute",
                    inset: "15%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(16,255,176,0.2), transparent 70%)",
                    filter: "blur(30px)",
                    zIndex: -1,
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
