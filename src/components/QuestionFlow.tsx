import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QuestionCard } from "./QuestionCard";
import { SmallWinModal } from "./SmallWinModal";
import { ArrowLeft } from "lucide-react";
import questionsData from "../questionsDB/q&a.json";
import { getCustomQuestions } from "../utils/generateQuestions";
import React from "react";

interface QuestionFlowProps {
  problem: string;
  onComplete: (answers: string[]) => void;
  onBack: () => void;
}

interface QuestionData {
  question: string;
  answers: Array<{
    answer: string;
    description: string;
    suggestion: string;
  }>;
}

const encouragements = [
  "It’s not easy, but you’re showing courage. 🌼",
  "You’re opening up — that takes strength. 🌱",
  "Small step, big progress! 💫",
  "Keep going! 🌸",
  "You’re taking an important step forward. 🌾",
  "You're making progress! 🌈",
  "It’s okay to feel what you feel. 💧",
  "Thanks for sharing that! 🌺",
];

export function QuestionFlow({
  problem,
  onComplete,
  onBack,
}: QuestionFlowProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showWinModal, setShowWinModal] = useState(false);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  // Map problem label to JSON key
  const getProblemKey = (problemLabel: string): string | null => {
    const key = problemLabel.toLowerCase();
    if (key === "anxiety" || key === "depression" || key === "adhd") {
      return key;
    }
    // Return null for custom problems (they'll be handled separately)
    return null;
  };

  useEffect(() => {
    const problemKey = getProblemKey(problem);

    if (problemKey) {
      // Use predefined questions for standard problems
      const categoryQuestions =
        (questionsData as { tests: Record<string, QuestionData[]> }).tests[
          problemKey
        ] || [];
      setQuestions(categoryQuestions);
    } else {
      // Try to get custom questions from localStorage
      const customQuestions = getCustomQuestions(problem);
      if (customQuestions && customQuestions.length > 0) {
        setQuestions(customQuestions);
      } else {
        // Fallback to anxiety questions if custom questions not found
        const categoryQuestions =
          (questionsData as { tests: Record<string, QuestionData[]> }).tests[
            "anxiety"
          ] || [];
        setQuestions(categoryQuestions);
      }
    }
  }, [problem]);

  const handleNext = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentCardIndex < questions.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowWinModal(true);
    }
  };

  const handleContinue = () => {
    setShowWinModal(false);
    onComplete(answers);
  };

  if (questions.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <p className="font-light" style={{ color: "var(--text-secondary)" }}>
          Loading questions...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm transition-all font-light cursor-pointer"
          style={{
            backgroundColor: "var(--bg-card)",
            color: "var(--text-primary)",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="text-center">
          <p
            className="text-sm font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Working on
          </p>
          <p className="font-light" style={{ color: "var(--text-primary)" }}>
            {problem}
          </p>
        </div>
        <div className="w-24" /> {/* Spacer for centering */}
      </div>

      {/* Question Cards */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentCardIndex}
            question={questions[currentCardIndex]?.question || ""}
            answerOptions={questions[currentCardIndex]?.answers || []}
            currentCard={currentCardIndex + 1}
            totalCards={questions.length}
            onNext={handleNext}
            encouragementText={
              encouragements[currentCardIndex % encouragements.length]
            }
          />
        </AnimatePresence>
      </div>

      {/* Small Win Modal */}
      <SmallWinModal
        isOpen={showWinModal}
        title="You completed this mini-exercise! 🎉"
        message="Small steps lead to big progress. You've shared valuable insights about yourself."
        onContinue={handleContinue}
      />
    </div>
  );
}
