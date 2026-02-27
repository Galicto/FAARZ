"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 200 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null!);

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
            sz[i] = Math.random() * 3 + 1;
        }
        return [pos, sz];
    }, [count]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const posArr = mesh.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            posArr[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.003;
            posArr[i * 3] += Math.cos(t * 0.2 + i * 0.5) * 0.002;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.rotation.y = t * 0.02;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                    count={count}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#34d399"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

export default function ParticleField() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                dpr={[1, 1.5]}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: false }}
            >
                <Particles count={150} />
            </Canvas>
        </div>
    );
}
