import React, { useState } from "react";
import { motion } from "motion/react";
import { ActivityCard } from "./ActivityCard";
import {
  Sun,
  Heart,
  Brain,
  Image,
  MessageSquare,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MainOfficeProps {
  onActivitySelect: (activity: string) => void;
}

export function MainOffice({ onActivitySelect }: MainOfficeProps) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const activities = [
    {
      title: "Problem Cards",
      icon: MessageSquare,
      color: "var(--pastel-lavender)",
      id: "problem-cards",
    },
    {
      title: "Do you believe in yourself?",
      icon: Heart,
      color: "var(--pastel-sky)",
      id: "self-esteem",
    },
    {
      title: "How are you feeling",
      icon: Sun,
      color: "var(--pastel-mint)",
      id: "well-being",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6]">
      {/* Background */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1920&q=80"
          alt="Cozy psychotherapy office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f6]/85 via-[#f5f0eb]/80 to-[#f0ebe6]/85" />
      </div>

      {/* Decorative blobs (iza sadržaja) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 z-0"
        style={{ backgroundColor: "var(--pastel-mint)" }}
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-20 z-0"
        style={{ backgroundColor: "var(--pastel-peach)" }}
      />

      {/* Top Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "var(--pastel-lavender)" }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-foreground">First Session</h1>
            <p className="text-xs text-muted-foreground">Your safe space</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="hidden md:block text-right">
            <p className="text-sm text-muted-foreground">Session 1 of 1</p>
            <p className="text-xs text-muted-foreground">Intro simulation</p>
          </div>
          <button className="w-10 h-10 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/70 transition-colors">
            <HelpCircle className="w-5 h-5 text-foreground" />
          </button>
        </motion.div>
      </nav>

      {/* Chat panel – force bottom-left positioning */}
      <motion.aside
        role="dialog"
        aria-label="Notes"
        aria-modal="false"
        className="fixed z-50 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{
          opacity: notesOpen ? 1 : 0,
          scale: notesOpen ? 1 : 0.98,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{
          pointerEvents: notesOpen ? "auto" : "none",
          left: 16,
          bottom: 16,
          top: "auto",
          right: "auto",
        }}
      >
        <div className="w-full rounded-2xl p-4 bg-white/60 backdrop-blur-xl shadow-2xl border-2 border-white/40 flex flex-col gap-3 will-change-transform">
          {/* Avatar removed from panel header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground drop-shadow-sm">
                Session notes
              </h3>
              <p className="text-xs text-muted-foreground">
                Jot ideas here. AI assist coming soon.
              </p>
            </div>
            <button
              onClick={() => setNotesOpen(false)}
              className="h-8 px-3 rounded-xl text-xs font-medium bg-white/90 hover:bg-white border border-border text-foreground shadow-sm hover:shadow transition-all"
            >
              Hide
            </button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Type your message..."
            className="min-h-24 max-h-40 rounded-xl p-3 text-sm bg-white/70 placeholder:text-muted-foreground text-foreground border-2 border-border/60 outline-none focus:ring-2 focus:ring-[var(--focus-outline)] focus:border-border resize-none shadow-sm"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setNotes("")}
              className="h-8 px-3 rounded-xl text-xs font-medium bg-white/70 hover:bg-white/90 border border-border text-foreground shadow-sm hover:shadow transition-all"
            >
              Clear
            </button>
            <button
              onClick={() => setNotesOpen(false)}
              className="h-8 px-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main content: kolona + raste preko min visine; centrira se kad je chat otvoren */}
      <motion.main
        layout
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className={`relative z-10 mx-auto w-full max-w-5xl px-4
                    min-h-[calc(100vh-120px)]
                    flex flex-col items-center
                    ${notesOpen ? "justify-center" : "justify-start"}`}
      >
        {/* Avatar floats to top-left when panel opens */}
        {notesOpen && (
          <motion.div
            layoutId="session-avatar"
            className="absolute top-0 left-10 z-50 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=512&q=80"
              alt="AI Agent"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
        {/* Center avatar (moves into panel on click) */}
        {!notesOpen && (
          <motion.button
            type="button"
            layoutId="session-avatar"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => setNotesOpen(true)}
            className="mb-6 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus-outline)]"
            aria-label="Open notes panel"
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white ring-4 ring-white/20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=512&q=80"
                alt="AI Agent"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>
        )}

        {/* Tekst — dodatno spušten; još niže kad je chat otvoren */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-center max-w-2xl w-full ${
            notesOpen ? "mt-12" : "mt-16"
          }`}
        >
          <h2 className="mb-4 text-foreground">
            Welcome to Your First Session
          </h2>
          <p className="text-muted-foreground">
            Choose an activity below to begin your journey of self-discovery.
            Take your time, and remember: this is a safe space.
          </p>
        </motion.div>

        {/* Kartice — kolona ispod desktopa; wrap od sm naviše; spuštene još malo */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`w-full ${notesOpen ? "mt-8" : "mt-10"} mb-8`}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 sm:-inset-8 rounded-[2rem] sm:rounded-[3rem]"
              style={{
                background:
                  "linear-gradient(145deg,var(--pastel-cream), var(--pastel-peach) 120%)",
                boxShadow: "0 24px 70px rgba(139, 127, 184, 0.25)",
                opacity: 0.85,
                filter: "blur(2px)",
              }}
            />
            <div
              className="relative flex flex-col /* mobile-first: kolona */
                                sm:flex-row sm:flex-wrap /* od sm: wrap */
                                gap-5 sm:gap-8 justify-center p-6 sm:p-10"
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.08 }}
                  className="p-3 sm:p-4"
                >
                  <ActivityCard
                    title={activity.title}
                    icon={activity.icon}
                    color={activity.color}
                    onClick={() => onActivitySelect(activity.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-muted-foreground text-center mb-10"
        >
          Click any card to begin your personalized session
        </motion.p>
      </motion.main>
    </div>
  );
}
