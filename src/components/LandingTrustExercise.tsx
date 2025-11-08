import React, { useEffect, useMemo, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Check, HelpCircle, Shield, Sparkles } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import AmonUS from "./AmonUS";
/**
 * LandingTrustExercise
 * A 2–3 minute, privacy-first micro‑exercise for your homepage to build trust before sign-up.
 * Flow:
 *  1) 4‑7‑8 Breathing with animated circle
 *  2) Mood check (0–10) + instant micro‑savjet
 *  3) Jedan mali korak (checkbox + sugestije)
 *  CTA: "Započni besplatnu sesiju" – koristite onStart prop za redirect u aplikaciju
 */

type Props = {
  onStart?: () => void; // called when user clicks the CTA
};

const tips: Record<string, string[]> = {
  low: [
    "Try taking two short 5-minute walks today.",
    "Write one sentence: ‘What do I need right now?’",
    "Call a friend just to say ‘hey’.",
  ],
  mid: [
    "Spend 10 minutes on a task you’ve been postponing.",
    "Make a plan for one small step toward your goal.",
    "Thank yourself for one small thing today.",
  ],
  high: [
    "Share something good with someone you appreciate.",
    "Write down 3 things you’re grateful for.",
    "Create a playlist of 3 songs to help you focus.",
  ],
};


export default function LandingTrustExercise({ onStart }: Props) {
  const [phase, setPhase] = useState<"breath" |"cofeeTea"| "miniGame" | "done">(
    "breath"
  );
  const [timer, setTimer] = useState(0);
  const [value, setValue] = useState(5);
  const [chosenTip, setChosenTip] = useState<string | null>(null);
  const [ack, setAck] = useState(false);

  // simple 4-7-8 cycle lengths in seconds
  const cycle = [2, 3, 5];
  const total = cycle.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (phase !== "breath") return;
    setTimer(0);
    const id = setInterval(() => setTimer((t) => t + 1), 1000);
    const timeout = setTimeout(() => {
      clearInterval(id);
      setPhase("cofeeTea");
    }, (total * 2 + 4) * 1000); // ~2 ciklusa + buffer
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, [phase, total]);

  const cycleState = useMemo(() => {
    const t = timer % total;
    if (t < cycle[0])
      return { label: "Udah (2)", stage: "in" as const, prog: t / cycle[0] };
    if (t < cycle[0] + cycle[1])
      return {
        label: "Zadrži (3)",
        stage: "hold" as const,
        prog: (t - cycle[0]) / cycle[1],
      };
    return {
      label: "Izdah (5)",
      stage: "out" as const,
      prog: (t - cycle[0] - cycle[1]) / cycle[2],
    };
  }, [timer]);

  useEffect(() => {
    // pick a tip bucket based on value
    const bucket = value <= 2 ? "low" : value <= 3 ? "mid" : "high";
    const arr = tips[bucket];
    setChosenTip(arr[Math.floor(Math.random() * arr.length)]);
  }, [value]);

  return (
    <div
      className="w-full z-99 max-w-3xl mx-auto my-16 p-6 sm:p-10 rounded-3xl backdrop-blur border-0"
      style={{
        backgroundColor: "var(--bg-card)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {/* Header / Trust strip */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-lavender)",
              boxShadow: "var(--shadow-xs)",
            }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2
              className="text-lg font-light"
              style={{ color: "var(--text-primary)" }}
            >
               Safe start
            </h2>
            <p
              className="text-xs font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              2–3 minutes to ground yourself, no registration needed.
            </p>
          </div>
        </div>
        <div
          className="hidden sm:flex items-center gap-2 text-xs font-light"
          style={{ color: "var(--text-secondary)" }}
        >
         
        </div>
      </div>

      {/* PHASES */}
      {phase === "breath" && (
        <section className="grid sm:grid-cols-[220px_1fr] gap-6 items-center">
          <BreathCircle state={cycleState.stage} prog={cycleState.prog} />
          <div>
            <h3
              className="text-base font-light mb-2"
              style={{ color: "var(--text-primary)" }}
            >
               2-3-5 Breathing Exercise
            </h3>
            <p
              className="text-sm font-light mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Two cycles. Follow the circle: breathe in 2s, hold 3s, breathe out 5s.
            </p>
            <p
              className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-xl font-light"
              style={{
                backgroundColor: "var(--bg-hover)",
                color: "var(--text-secondary)",
              }}
            >
              <HelpCircle className="w-4 h-4" /> If you want, you can skip
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setPhase("cofeeTea")} /*Change later to phase coffeeTea*/
                className="px-4 py-2 rounded-xl border-0 text-sm font-light cursor-pointer transition-all"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  color: "var(--text-primary)",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                Skip
              </button>
            </div>
          </div>
        </section>
      )}

      {phase === "cofeeTea" && (
        <section className="space-y-6">
          <div>
            <h3
              className="text-base font-light mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Coffee or tea?
            </h3>
            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setPhase("miniGame")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setPhase("miniGame");
              }}
              className="rounded-2xl overflow-hidden cursor-pointer transform transition-transform duration-200 ease-out hover:-translate-y-2"
              style={{ backgroundColor: "var(--card)" }}
            >
              <ImageWithFallback src="/src/public/coffe.jpg" alt="Kafa" className="w-full h-44 object-cover" />
              <div className="p-4">
                <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Coffe</h4>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Warm, morning energy. Ideal for focus.</p>
                <div className="mt-4 inline-block px-4 py-2 rounded-xl text-sm font-light" style={{ backgroundColor: "var(--color-sage)", color: "white", boxShadow: "var(--shadow-xs)" }}>
                  Choose
                </div>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => setPhase("miniGame")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setPhase("miniGame");
              }}
              className="rounded-2xl overflow-hidden cursor-pointer transform transition-transform duration-200 ease-out hover:-translate-y-2"
              style={{ backgroundColor: "var(--card)" }}
            >
              <ImageWithFallback src="/src/public/tea2.jpg" alt="Čaj" className="w-full h-44 object-cover" />
              <div className="p-4">
                <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Tea</h4>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>A calming choice for rest and relaxation.</p>
                <div className="mt-4 inline-block px-4 py-2 rounded-xl text-sm font-light" style={{ backgroundColor: "var(--color-sage)", color: "white", boxShadow: "var(--shadow-xs)" }}>
                  Choose
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {phase === "miniGame" && (
        <AmonUS onComplete={() => setPhase("done")} />
      )}
      {phase === "done" && (
        <section className="text-center space-y-4">
          <div
            className="mx-auto w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-mint)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Check className="w-6 h-6 text-white" />
          </div>
          <h3
            className="text-base font-light"
            style={{ color: "var(--text-primary)" }}
          >
            Nice! You’ve already done something good for yourself today.
          </h3>
          <p
            className="text-sm font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            You can continue with the conversation.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onStart}
              className="px-5 py-2.5 rounded-2xl text-white text-sm font-light cursor-pointer transition-all"
              style={{
                backgroundColor: "var(--color-sage)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
             Let's go
            </button>
          </div>
          <p
            className="text-[11px] font-light"
            style={{ color: "var(--text-muted)" }}
          >
            We don’t store your answers. You can continue anonymously.
          </p>
        </section>
      )}
    </div>
  );
}

function BreathCircle({
  state,
  prog,
}: {
  state: "in" | "hold" | "out";
  prog: number;
}) {
  const label = state === "in" ? "Breathe in" : state === "hold" ? "Hold" : "Breathe out";
  const aria = `${label} – ${Math.round(prog * 100)}%`;

  // Therapeutic colors for breathing states
  const getStateStyle = () => {
    if (state === "in") return { scale: "scale-110", bg: "#cfe3f0" }; // sky
    if (state === "hold") return { scale: "scale-100", bg: "#d8cce6" }; // lavender
    return { scale: "scale-90", bg: "#d1e8dd" }; // mint
  };

  const stateStyle = getStateStyle();

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative grid place-items-center w-48 h-48 rounded-full transition-all duration-700 ${stateStyle.scale}`}
        style={{
          backgroundColor: stateStyle.bg,
          boxShadow: "var(--shadow-md)",
        }}
        aria-label={aria}
      >
        <div
          className="w-28 h-28 rounded-full border-2 shadow-inner"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "white" }}
        />
      </div>
      <p
        className="mt-3 text-sm font-light"
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </p>
    </div>
  );
}
