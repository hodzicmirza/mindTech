import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface AnswerOption {
  answer: string;
  description: string;
  suggestion: string;
}

interface QuestionCardProps {
  question: string;
  answerOptions: AnswerOption[];
  currentCard: number;
  totalCards: number;
  onNext: (answer: string) => void;
  encouragementText?: string;
}

export function QuestionCard({
  question,
  answerOptions,
  currentCard,
  totalCards,
  onNext,
  encouragementText,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [hideContent, setHideContent] = useState(false);

  // Reset selected answer when question changes
  useEffect(() => {
    setSelectedAnswer("");
    setShowEncouragement(false);
    setHideContent(false);
  }, [question]);

  // called when an answer is chosen -> animate + proceed
  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setHideContent(true); // Hide content immediately
    setShowEncouragement(true);
    setTimeout(() => {
      onNext(answer);
      setSelectedAnswer("");
      setShowEncouragement(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      exit={{ opacity: 0, y: -20, rotateY: 15 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative w-full max-w-lg mx-auto"
    >
      <div
        className="backdrop-blur-sm rounded-3xl p-6 sm:p-8 relative overflow-hidden border-0"
        style={{
          backgroundColor: "var(--bg-card)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Decorative gradient top bar */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background:
              "linear-gradient(90deg, var(--color-lavender) 0%, var(--color-sky) 50%, var(--color-mint) 100%)",
          }}
        />

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6 pt-2">
          <span
            className="text-sm font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Question {currentCard} of {totalCards}
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: totalCards }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < currentCard ? "scale-110" : ""
                }`}
                style={{
                  backgroundColor:
                    i < currentCard ? "var(--color-sage)" : "var(--bg-hover)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Question and Answers - hide when transitioning */}
        {!hideContent && (
          <>
            {/* Question */}
            <h3
              className="mb-8 text-xl sm:text-2xl font-light text-center leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              {question}
            </h3>

            {/* Answer options */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {answerOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSelect(option.answer)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`min-h-[56px] px-4 py-3 rounded-2xl border-0 transition-all duration-200 text-sm font-light cursor-pointer`}
                    style={{
                      backgroundColor:
                        selectedAnswer === option.answer
                          ? "var(--color-sage)"
                          : "var(--bg-hover)",
                      color:
                        selectedAnswer === option.answer
                          ? "white"
                          : "var(--text-primary)",
                      boxShadow:
                        selectedAnswer === option.answer
                          ? "var(--shadow-md)"
                          : "var(--shadow-xs)",
                    }}
                  >
                    {option.answer}
                  </motion.button>
                ))}
              </div>

              {/* Removed explicit Next/Complete button - selection advances automatically */}
            </div>
          </>
        )}

        {/* Encouragement text with animation */}
        {showEncouragement && encouragementText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center backdrop-blur-md rounded-3xl z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(216, 204, 230, 0.9) 0%, rgba(207, 227, 240, 0.9) 100%)",
            }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center px-8"
            >
              {/* <p
                className="text-xl sm:text-2xl font-light mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Great choice! ✨
              </p> */}
              <p
                className="font-light"
                style={{ color: "var(--text-secondary)", fontSize: "30px" }}
              >
                {encouragementText}
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
