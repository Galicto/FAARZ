"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Leaf, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

const FloatingOrb = dynamic(() => import("@/components/FloatingOrb"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/ParticleField"), { ssr: false });

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--faarz-bg)" }}
    >
      {/* Background particle field */}
      <ParticleField />

      {/* Aurora background */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
      </div>

      {/* Floating 3D orb — positioned behind card */}
      <motion.div
        className="absolute z-[1]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        <FloatingOrb size="420px" />
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
        className="glass-card w-full max-w-md p-8 relative z-10"
        style={{
          background: "rgba(16, 28, 22, 0.75)",
          backdropFilter: "blur(30px)",
        }}
      >
        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 neon-glow"
            style={{ background: "var(--faarz-green)" }}
            whileHover={{ rotate: 15, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Leaf size={32} color="#0a0f0d" strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight text-shimmer"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FAARZ
          </h1>
          <motion.div
            className="flex items-center gap-1.5 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Sparkles size={12} style={{ color: "var(--faarz-neon)" }} />
            <p className="text-sm" style={{ color: "var(--faarz-text-muted)" }}>
              Admin Dashboard
            </p>
          </motion.div>
        </motion.div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {[
            {
              label: "Email",
              icon: Mail,
              type: "email",
              placeholder: "admin@faarz.org",
              value: email,
              onChange: setEmail,
              delay: 0.9,
            },
            {
              label: "Password",
              icon: Lock,
              type: "password",
              placeholder: "••••••••",
              value: password,
              onChange: setPassword,
              delay: 1.0,
            },
          ].map((field) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: field.delay, duration: 0.4 }}
            >
              <label
                className="text-xs font-medium mb-1.5 block"
                style={{ color: "var(--faarz-text-secondary)" }}
              >
                {field.label}
              </label>
              <div className="relative">
                <field.icon
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--faarz-text-muted)" }}
                />
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                  style={{
                    background: "var(--faarz-surface)",
                    border: "1px solid var(--faarz-border)",
                    color: "var(--faarz-text)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--faarz-border-active)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--faarz-border)")
                  }
                />
              </div>
            </motion.div>
          ))}

          {/* Sign in button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(52,211,153,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 btn-ripple cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, var(--faarz-green), var(--faarz-accent))",
              color: "#0a0f0d",
            }}
          >
            Sign In
            <ArrowRight size={16} />
          </motion.button>

          {/* Divider */}
          <motion.div
            className="flex items-center gap-3 my-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex-1 h-px" style={{ background: "var(--faarz-border)" }} />
            <span className="text-xs" style={{ color: "var(--faarz-text-muted)" }}>
              or
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--faarz-border)" }} />
          </motion.div>

          {/* Google */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            style={{
              background: "var(--faarz-surface)",
              border: "1px solid var(--faarz-border)",
              color: "var(--faarz-text)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.26,9.76A7.49,7.49,0,0,1,12,4.5a6.88,6.88,0,0,1,4.86,1.89l3.6-3.6A12,12,0,0,0,12,.5,11.99,11.99,0,0,0,1.24,6.65Z"
              />
              <path
                fill="#34A853"
                d="M16.04,18.01A7.07,7.07,0,0,1,12,19.5a7.49,7.49,0,0,1-6.74-5.26l-4.02,3.11A11.99,11.99,0,0,0,12,23.5a11.45,11.45,0,0,0,7.84-3.04Z"
              />
              <path
                fill="#4A90D9"
                d="M19.84,20.46A11.81,11.81,0,0,0,23.5,12a10.85,10.85,0,0,0-.25-2.5H12v5h6.47a5.74,5.74,0,0,1-2.43,3.51Z"
              />
              <path
                fill="#FBBC05"
                d="M5.26,14.24A7.42,7.42,0,0,1,4.5,12a7.42,7.42,0,0,1,.76-2.24L1.24,6.65A11.94,11.94,0,0,0,0,12a11.94,11.94,0,0,0,1.24,5.35Z"
              />
            </svg>
            Continue with Google
          </motion.button>
        </form>

        {/* Footer */}
        <p className="footer-credit mt-8">Made with love by Aamina</p>
      </motion.div>
    </div>
  );
}
