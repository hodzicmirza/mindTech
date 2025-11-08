import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

export function ActivityCard({
  title,
  icon: Icon,
  color,
  onClick,
}: ActivityCardProps) {
  // Generate soft, therapeutic gradients
  const getGradient = (baseColor: string) => {
    const gradients: { [key: string]: string } = {
      "var(--color-lavender)":
        "linear-gradient(135deg, #d8cce6 0%, #e8dff2 100%)",
      "var(--color-sky)": "linear-gradient(135deg, #cfe3f0 0%, #e3f1f8 100%)",
      "var(--color-mint)": "linear-gradient(135deg, #d1e8dd 0%, #e5f3ed 100%)",
    };
    return gradients[baseColor] || baseColor;
  };

  return (
    <motion.button
      onClick={onClick}
      className="relative group focus:outline-none cursor-pointer"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Soft card background */}
      <div
        className="relative w-40 h-48 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 border-0 overflow-hidden"
        style={{
          background: getGradient(color),
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-50" />

        {/* Icon container - softer design */}
        <motion.div
          className="relative w-16 h-16 backdrop-blur-sm rounded-2xl flex items-center justify-center border-0"
          style={{
            backgroundColor: "var(--bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8" style={{ color: "var(--text-primary)" }} />
        </motion.div>

        <p
          className="relative text-center font-light"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </p>
      </div>

      {/* Gentle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${color}33, transparent 70%)`,
          filter: "blur(16px)",
          zIndex: -1,
        }}
      />
    </motion.button>
  );
}
