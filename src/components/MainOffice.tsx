import { motion } from "motion/react";
import { useState } from "react";
import { ActivityCard } from "./ActivityCard";
import { Brain, Image, MessageSquare, HelpCircle, Sparkles, Music } from "lucide-react";
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
      title: "Rorschach Test",
      icon: Image,
      color: "var(--pastel-sky)",
      id: "rorschach",
    },
    {
      title: "TAT Test",
      icon: Brain,
      color: "var(--pastel-mint)",
      id: "tat",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6]">
      {/* Background Image with Overlay (placeholder - feel free to replace with your own asset) */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1920&q=80"
          alt="Cozy psychotherapy office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f6]/85 via-[#f5f0eb]/80 to-[#f0ebe6]/85" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
        style={{ backgroundColor: "var(--pastel-mint)" }}
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-20"
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

      {/* Main Content (shifts right when chat open to make room on left) */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 transition-transform duration-500 ease-[cubic-bezier(.4,.08,.2,1)] ${notesOpen ? 'md:translate-x-[380px]' : ''}`}
      >
        {/* Avatar trigger (opens chat) */}
        <button
          type="button"
          aria-label="Open chat notes"
          onClick={() => setNotesOpen(true)}
          className={`fixed right-4 bottom-4 z-50 group w-36 h-36 rounded-full flex items-center justify-center relative focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus-outline)] transition-shadow ${notesOpen ? 'opacity-0 pointer-events-none' : ''}`}
          style={{
            background: 'radial-gradient(circle at 30% 30%, var(--pastel-lavender), var(--pastel-mint))',
            boxShadow: '0 12px 40px rgba(139,127,184,0.25)'
          }}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=512&q=80"
              alt="Friendly AI agent"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
          <motion.div
            className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-md"
            animate={{ y: [0, -4, 0], opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Music className="w-5 h-5 text-[var(--foreground)]" />
          </motion.div>
        </button>

        {/* Chat / notes panel (bottom-left, takes precedence over content) */}
        <motion.aside
          role="dialog"
          aria-label="Notes"
          aria-modal="false"
          className="fixed bottom-4 left-4 z-50 w-[22rem] max-w-[95vw]"
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: notesOpen ? 0 : 24, opacity: notesOpen ? 1 : 0, scale: notesOpen ? 1 : 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          style={{ pointerEvents: notesOpen ? 'auto' : 'none' }}
        >
          <div className="w-full rounded-2xl p-4 bg-white/80 backdrop-blur-md shadow-2xl border border-border flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">Session notes</h3>
                <p className="text-xs text-muted-foreground">Jot ideas here. AI assist coming soon.</p>
              </div>
              <button
                onClick={() => setNotesOpen(false)}
                className="h-8 px-3 rounded-xl text-xs bg-white/60 hover:bg-white/80 border border-border text-foreground"
              >
                Hide
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type your thoughts..."
              className="min-h-32 max-h-[40vh] resize-y rounded-xl p-3 text-sm bg-white/90 placeholder:text-muted-foreground text-foreground border border-border outline-none focus:ring-2 focus:ring-[var(--focus-outline)]"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setNotes("")}
                className="h-8 px-3 rounded-xl text-xs bg-transparent hover:bg-white/60 border border-border text-muted-foreground"
              >
                Clear
              </button>
              <button
                onClick={() => setNotesOpen(false)}
                className="h-8 px-3 rounded-xl text-xs bg-primary text-white hover:bg-primary/90"
              >
                Done
              </button>
            </div>
          </div>
        </motion.aside>
        {/* (Removed center avatar - avatar now acts as trigger) */}

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12 max-w-2xl"
        >
          <h2 className="mb-4 text-foreground">Welcome to Your First Session</h2>
          <p className="text-muted-foreground">
            Choose an activity below to begin your journey of self-discovery. Take your time,
            and remember: this is a safe space.
          </p>
        </motion.div>

        {/* Activity Cards on Desk Surface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Table surface */}
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-[3rem] transform perspective-1000 rotate-x-12"
              style={{
                background: "linear-gradient(145deg,var(--pastel-cream), var(--pastel-peach) 120%)",
                boxShadow: "0 24px 70px rgba(139, 127, 184, 0.25)",
                opacity: 0.85,
                filter: "blur(2px)",
              }}
            />
            <div className="relative flex flex-wrap gap-8 justify-center p-10">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
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

        {/* Helpful hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted-foreground text-center mt-12"
        >
          ✨ Click any card to begin your personalized session
        </motion.p>
      </div>
    </div>
  );
}
