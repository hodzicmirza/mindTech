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

  const handleNext = () => {
    if (selectedAnswer) {
      setHideContent(true); // Hide content immediately
      setShowEncouragement(true);
      setTimeout(() => {
        onNext(selectedAnswer);
        setSelectedAnswer("");
        setShowEncouragement(false);
      }, 800);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      exit={{ opacity: 0, y: -20, rotateY: 15 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative w-full max-w-lg mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-gray-100">
        {/* Decorative gradient top bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400" />

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6 pt-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentCard} of {totalCards}
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: totalCards }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < currentCard ? "bg-purple-500 scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question and Answers - hide when transitioning */}
        {!hideContent && (
          <>
            {/* Question */}
            <h3 className="mb-8 text-xl sm:text-2xl font-semibold text-center text-gray-800 leading-relaxed">
              {question}
            </h3>

            {/* Answer options */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {answerOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedAnswer(option.answer)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`min-h-[56px] px-4 py-3 rounded-2xl border-2 transition-all duration-200 text-sm font-semibold ${
                      selectedAnswer === option.answer
                        ? "border-purple-500 bg-purple-50 text-purple-700 shadow-lg shadow-purple-100"
                        : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 text-gray-700 hover:shadow-md"
                    }`}
                  >
                    {option.answer}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                disabled={!selectedAnswer}
                whileHover={selectedAnswer ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer ? { scale: 0.98 } : {}}
                className={`w-full h-12 rounded-2xl font-semibold text-white transition-all duration-200 ${
                  selectedAnswer
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg shadow-purple-200 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed opacity-60"
                }`}
              >
                {currentCard === totalCards ? "Complete" : "Next Question"}
              </motion.button>
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
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 backdrop-blur-md rounded-3xl z-10"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center px-8"
            >
              <p className="text-xl sm:text-2xl font-semibold text-purple-600 mb-2">
                Great choice! ✨
              </p>
              <p className="text-gray-600">{encouragementText}</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
