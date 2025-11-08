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
      color: "var(--pastel-lavender)",
    },
    {
      id: "depression",
      label: "Depression",
      icon: Brain,
      color: "var(--pastel-sky)",
    },
    { id: "adhd", label: "ADHD", icon: Zap, color: "var(--pastel-mint)" },
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
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="mb-8 pr-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            What do you want to work on today?
          </h2>
          <p className="text-gray-500 text-base">
            Select an area you'd like to explore. This helps personalize your
            session.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {problems.map((problem) => {
            const Icon = problem.icon;
            const isSelected = selectedProblem === problem.id;

            const colorClasses = {
              anxiety: "bg-purple-100",
              depression: "bg-blue-100",
              adhd: "bg-teal-100",
            };

            const iconColorClasses = {
              anxiety: "bg-purple-400",
              depression: "bg-blue-400",
              adhd: "bg-teal-400",
            };

            const checkColorClasses = {
              anxiety: "bg-purple-500",
              depression: "bg-blue-500",
              adhd: "bg-teal-500",
            };

            return (
              <motion.button
                key={problem.id}
                onClick={() => {
                  setSelectedProblem(problem.id);
                  setShowCustomInput(false);
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl border-2 transition-all relative ${
                  isSelected
                    ? "border-purple-300 bg-purple-50/30 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    iconColorClasses[
                      problem.id as keyof typeof iconColorClasses
                    ]
                  }`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-center font-medium text-gray-700">
                  {problem.label}
                </p>

                {/* Checkmark indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center ${
                      checkColorClasses[
                        problem.id as keyof typeof checkColorClasses
                      ]
                    }`}
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
            className={`w-full p-5 rounded-2xl border-2 transition-all ${
              selectedProblem === "custom"
                ? "border-gray-300 bg-gray-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 font-medium">
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
          className={`w-full h-14 rounded-2xl font-semibold text-white transition-all ${
            !selectedProblem ||
            (selectedProblem === "custom" && !customIssue.trim()) ||
            isGenerating
              ? "bg-purple-200 cursor-not-allowed"
              : "bg-purple-300 hover:bg-purple-400 active:scale-98 shadow-sm"
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2">
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
