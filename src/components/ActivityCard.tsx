import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

export function ActivityCard({ title, icon: Icon, color, onClick }: ActivityCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-outline)]"
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div
        className="w-40 h-48 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300"
        style={{
          backgroundColor: color,
          boxShadow: "0 4px 16px rgba(139, 127, 184, 0.15)",
        }}
      >
        <motion.div
          className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8 text-[var(--foreground)]" />
        </motion.div>
        <p className="text-[var(--foreground)] text-center font-medium drop-shadow-sm">{title}</p>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${color}55, transparent 70%)`,
          filter: "blur(20px)",
          zIndex: -1,
        }}
      />
    </motion.button>
  );
}
