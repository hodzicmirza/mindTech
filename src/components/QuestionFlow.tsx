import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QuestionCard } from "./QuestionCard";
import { SmallWinModal } from "./SmallWinModal";
import { ArrowLeft } from "lucide-react";
import questionsData from "../questionsDB/q&a.json";

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
  "Nice work! 🌟",
  "You're doing great! ✨",
  "Small step, big progress! 💫",
  "Keep going! 🌸",
  "Wonderful! 🎉",
  "You're making progress! 🌈",
  "Great reflection! 💝",
  "Thanks for sharing that! 🌺",
];

export function QuestionFlow({ problem, onComplete, onBack }: QuestionFlowProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showWinModal, setShowWinModal] = useState(false);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  // Map problem label to JSON key
  const getProblemKey = (problemLabel: string): string => {
    const key = problemLabel.toLowerCase();
    if (key === "anxiety" || key === "depression" || key === "adhd") {
      return key;
    }
    // Default to anxiety if custom problem
    return "anxiety";
  };

  useEffect(() => {
    const problemKey = getProblemKey(problem);
    const categoryQuestions = (questionsData as { tests: Record<string, QuestionData[]> }).tests[problemKey] || [];
    setQuestions(categoryQuestions);
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
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6] flex items-center justify-center">
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6] flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">Working on</p>
          <p className="text-primary">{problem}</p>
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
            encouragementText={encouragements[currentCardIndex % encouragements.length]}
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
