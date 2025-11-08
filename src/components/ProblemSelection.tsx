import React from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Heart, Brain, Zap, Plus, Loader2 } from "lucide-react";
import {
  generateQuestionsFromText,
  storeCustomQuestions,
  getCustomQuestions,
} from "../utils/generateQuestions";

interface ProblemSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (problem: string) => void;
}

export function ProblemSelection({
  isOpen,
  onClose,
  onSelect,
}: ProblemSelectionProps) {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [customIssue, setCustomIssue] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const problems = [
    {
      id: "anxiety",
      label: "Anxiety",
      icon: Heart,
      color: "var(--color-lavender)",
    },
    {
      id: "depression",
      label: "Depression",
      icon: Brain,
      color: "var(--color-sky)",
    },
    { id: "adhd", label: "ADHD", icon: Zap, color: "var(--color-mint)" },
  ];

  const handleContinue = async () => {
    if (selectedProblem === "custom" && customIssue.trim()) {
      // Check if questions already exist in localStorage
      const existingQuestions = getCustomQuestions(customIssue);

      if (existingQuestions) {
        // Use existing questions
        onSelect(customIssue);
      } else {
        // Generate new questions
        setIsGenerating(true);
        setError(null);

        try {
          const questions = await generateQuestionsFromText(customIssue);
          storeCustomQuestions(customIssue, questions);
          onSelect(customIssue);
        } catch (err) {
          console.error("Error generating questions:", err);
          setError(
            err instanceof Error
              ? err.message
              : "Failed to generate questions. Please try again."
          );
          setIsGenerating(false);
        }
      }
    } else if (selectedProblem) {
      const problem = problems.find((p) => p.id === selectedProblem);
      if (problem) onSelect(problem.label);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-500/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer"
          style={{
            backgroundColor: "var(--bg-hover)",
            color: "var(--text-secondary)",
          }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8 pr-12">
          <h2
            className="text-2xl font-light mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            What do you want to work on today?
          </h2>
          <p
            className="text-base font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Select an area you'd like to explore. This helps personalize your
            session.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {problems.map((problem) => {
            const Icon = problem.icon;
            const isSelected = selectedProblem === problem.id;

            // map backgrounds (use therapeutic colors)
            const iconBgMap: Record<string, string> = {
              anxiety: "#d8cce6",
              depression: "#cfe3f0",
              adhd: "#d1e8dd",
            };

            const checkBgMap: Record<string, string> = {
              anxiety: "#d8cce6",
              depression: "#cfe3f0",
              adhd: "#d1e8dd",
            };

            const isColorLiteral = (s: string) =>
              s.trim().startsWith("#") || s.trim().startsWith("rgb");

            const hexToRgba = (hex: string, alpha = 1) => {
              let h = hex.replace("#", "").trim();
              if (h.length === 3)
                h = h
                  .split("")
                  .map((c) => c + c)
                  .join("");
              const r = parseInt(h.substring(0, 2), 16);
              const g = parseInt(h.substring(2, 4), 16);
              const b = parseInt(h.substring(4, 6), 16);
              return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            };

            const toTransparent = (color: string, alpha = 0.15) => {
              const c = color.trim();
              if (c.startsWith("#")) return hexToRgba(c, alpha);
              if (c.startsWith("rgb("))
                return c.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
              return undefined;
            };

            // button class
            const buttonClass = `p-6 cursor-pointer rounded-2xl border-2 transition-all relative ${
              isSelected
                ? "shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`;

            // set border + subtle bg on selected to match the color
            const iconBg = iconBgMap[problem.id];
            const selectedBorderColor = isColorLiteral(iconBg)
              ? iconBg
              : undefined;
            const selectedBgColor = isColorLiteral(iconBg)
              ? toTransparent(iconBg, 0.15)
              : undefined;

            const buttonStyle = isSelected
              ? {
                  ...(selectedBorderColor
                    ? { borderColor: selectedBorderColor }
                    : {}),
                  ...(selectedBgColor
                    ? { backgroundColor: selectedBgColor }
                    : {}),
                }
              : undefined;

            const iconClass = `w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              !isColorLiteral(iconBg) ? iconBg : ""
            }`;
            const iconStyle = isColorLiteral(iconBg)
              ? { backgroundColor: iconBg }
              : undefined;

            const checkBg = checkBgMap[problem.id];
            // place checkmark in the top-right so it doesn't overlap the label
            const checkClass = `absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center shadow-md ${
              !isColorLiteral(checkBg) ? checkBg : ""
            }`;
            const checkStyle = isColorLiteral(checkBg)
              ? { backgroundColor: checkBg }
              : undefined;

            return (
              <motion.button
                key={problem.id}
                onClick={() => {
                  setSelectedProblem(problem.id);
                  setShowCustomInput(false);
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={buttonClass}
                style={buttonStyle}
              >
                <div className={iconClass} style={iconStyle}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <p
                  className="text-center font-light"
                  style={{ color: "var(--text-primary)" }}
                >
                  {problem.label}
                </p>

                {/* Checkmark indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className={checkClass}
                    style={checkStyle}
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Custom issue option */}
        <div className="mb-8">
          <motion.button
            onClick={() => {
              setShowCustomInput(!showCustomInput);
              setSelectedProblem(showCustomInput ? null : "custom");
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full p-5 rounded-2xl border-0 transition-all cursor-pointer ${
              selectedProblem === "custom" ? "shadow-sm" : ""
            }`}
            style={{
              backgroundColor:
                selectedProblem === "custom"
                  ? "var(--bg-hover)"
                  : "var(--bg-card)",
              boxShadow:
                selectedProblem === "custom" ? "var(--shadow-sm)" : "none",
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-peach)" }}
              >
                <Plus className="w-6 h-6 text-white" />
              </div>
              <p
                className="font-light"
                style={{ color: "var(--text-primary)" }}
              >
                Something else (custom)
              </p>
            </div>
          </motion.button>

          {showCustomInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Input
                value={customIssue}
                onChange={(e) => setCustomIssue(e.target.value)}
                placeholder="Describe what you'd like to work on..."
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
              />
            </motion.div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={
            !selectedProblem ||
            (selectedProblem === "custom" && !customIssue.trim()) ||
            isGenerating
          }
          className={`w-full h-14 rounded-2xl font-light text-white transition-all ${
            !selectedProblem ||
            (selectedProblem === "custom" && !customIssue.trim()) ||
            isGenerating
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          style={{
            backgroundColor: "var(--color-sage)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating questions...</span>
            </div>
          ) : (
            "Continue"
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
