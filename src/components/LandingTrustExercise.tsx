import React, { useEffect, useMemo, useState } from "react";
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
    "Danas probaj 2 kratke šetnje po 5 min.",
    "Napiši jednu rečenicu: ‘Šta mi sada treba?’.",
    "Pozovi prijatelja samo da kažeš ‘hej’.",
  ],
  mid: [
    "Izdvoji 10 min za zadatak koji odgađaš.",
    "Napravi plan za 1 mali korak do cilja.",
    "Zahvali sebi za jednu malu stvar danas.",
  ],
  high: [
    "Podijeli nešto dobro sa nekim koga cijeniš.",
    "Zapiši 3 stvari na kojima si zahvalan.",
    "Napravi playlistu od 3 pjesme za fokus.",
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
  const cycle = [4, 7, 8];
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
      return { label: "Udah (4)", stage: "in" as const, prog: t / cycle[0] };
    if (t < cycle[0] + cycle[1])
      return {
        label: "Zadrži (7)",
        stage: "hold" as const,
        prog: (t - cycle[0]) / cycle[1],
      };
    return {
      label: "Izdah (8)",
      stage: "out" as const,
      prog: (t - cycle[0] - cycle[1]) / cycle[2],
    };
  }, [timer]);

  useEffect(() => {
    // pick a tip bucket based on value
    const bucket = value <= 3 ? "low" : value <= 7 ? "mid" : "high";
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
              Siguran početak
            </h2>
            <p
              className="text-xs font-light"
              style={{ color: "var(--text-secondary)" }}
            >
              2–3 minute da dođeš sebi, bez registracije.
            </p>
          </div>
        </div>
        <div
          className="hidden sm:flex items-center gap-2 text-xs font-light"
          style={{ color: "var(--text-secondary)" }}
        >
          <Shield className="w-4 h-4" />
          <span>Bez praćenja. Ništa se ne čuva.</span>
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
              Vježba disanja 4‑7‑8
            </h3>
            <p
              className="text-sm font-light mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Dva ciklusa. Prati krug: udah 4s, zadrži 7s, izdah 8s.
            </p>
            <p
              className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-xl font-light"
              style={{
                backgroundColor: "var(--bg-hover)",
                color: "var(--text-secondary)",
              }}
            >
              <HelpCircle className="w-4 h-4" /> Ako želiš, možeš preskočiti.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setPhase("cofeeTea")}
                className="px-4 py-2 rounded-xl border-0 text-sm font-light cursor-pointer transition-all"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  color: "var(--text-primary)",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                Preskoči
              </button>
            </div>
          </div>
        </section>
      )}

      {phase === "cofeeTea" && (
        <section className="grid sm:grid-cols-[220px_1fr] gap-6 items-center">
          <div>
            <h3
              className="text-base font-light mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Coffee or tea?
            </h3>
            <p
              className="text-sm font-light mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Choose your beverage of choice.
            </p>
            <QuestionCard question="Coffee or tea?" answerOptions={[{ answer: "Coffee", description: "Coffee is a great way to start your day.", suggestion: "Coffee is a great way to start your day." }, { answer: "Tea", description: "Tea is a great way to relax.", suggestion: "Tea is a great way to relax." }]} currentCard={1} totalCards={2} onNext={() => setPhase("miniGame")} />
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
            Lijepo! Danas si već uradio/la nešto dobro za sebe.
          </h3>
          <p
            className="text-sm font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Ako želiš, možeš odmah nastaviti u vođenu sesiju.
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
              Započni besplatnu sesiju
            </button>
          </div>
          <p
            className="text-[11px] font-light"
            style={{ color: "var(--text-muted)" }}
          >
            Ne čuvamo tvoje odgovore. Možeš nastaviti anonimno.
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
  const label = state === "in" ? "Udah" : state === "hold" ? "Zadrži" : "Izdah";
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
