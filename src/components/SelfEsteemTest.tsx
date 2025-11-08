import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SmallWinModal } from "./SmallWinModal";
import { ArrowLeft, Info, Heart, Home } from "lucide-react";

interface SelfEsteemTestProps {
  onComplete: (responses: number[]) => void;
  onBack: () => void;
}

const questions = [
  { text: "On the whole, I am satisfied with myself.", reverse: false },
  { text: "At times I think I am no good at all.", reverse: true },
  { text: "I feel that I have a number of good qualities.", reverse: false },
  {
    text: "I am able to do things as well as most other people.",
    reverse: false,
  },
  { text: "I feel I do not have much to be proud of.", reverse: true },
  { text: "I take a positive attitude toward myself.", reverse: false },
  { text: "I certainly feel useless at times.", reverse: true },
  { text: "I wish I could have more respect for myself.", reverse: true },
  {
    text: "I feel that I'm a person of worth, at least on an equal plane with others.",
    reverse: false,
  },
  { text: "I feel that I am a failure.", reverse: true },
];

const likertOptions = [
  { value: 1, label: "Strongly agree" },
  { value: 2, label: "Agree" },
  { value: 3, label: "Disagree" },
  { value: 4, label: "Strongly disagree" },
];

export function SelfEsteemTest({ onComplete, onBack }: SelfEsteemTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);

  const handleSelect = (value: number) => {
    setSelectedValue(value);

    // Automatically advance after a brief delay for visual feedback
    setTimeout(() => {
      const newResponses = [...responses, value];
      setResponses(newResponses);
      setSelectedValue(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // All questions answered, show completion modal
        setShowWinModal(true);
      }
    }, 300);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Remove the last response
      setResponses(responses.slice(0, -1));
      setSelectedValue(null);
    }
  };

  const handleContinue = () => {
    setShowWinModal(false);
    // Apply reverse scoring before completing
    const scoredResponses = responses.map((response, index) => {
      if (questions[index].reverse) {
        // Reverse scoring: 1→4, 2→3, 3→2, 4→1
        return 5 - response;
      }
      return response;
    });
    onComplete(scoredResponses);
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      {/* Header */}
      <div className="p-4 flex items-center justify-between relative">
        {/* Home Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4 text-gray-600" />
          <span className="text-xs text-gray-600 font-medium">Home</span>
        </button>

        {/* Center Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h3 className="text-sm font-medium text-gray-600 mb-0.5">
            Do you believe in yourself?
          </h3>
          <p className="text-xs text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Placeholder for alignment */}
        <div className="w-20"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-4">
        <div className="max-w-2xl w-full">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-white rounded-xl flex items-start gap-2.5 shadow-sm"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#a8d5f7" }}
            >
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600 leading-snug">
                This is the Rosenberg Self-Esteem Scale. Read each statement and
                select how much you agree or disagree. There are no right or
                wrong answers - be honest with yourself.
              </p>
            </div>
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl p-5 shadow-lg"
          >
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">
                {currentQuestionData.text}
              </h3>
            </div>

            {/* Likert Scale Options */}
            <div className="space-y-2 mb-4">
              {likertOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full p-3 rounded-xl border transition-all duration-200 text-left ${
                    selectedValue === option.value
                      ? "border-[#8b7ba8] bg-[#f8f6fa] shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  animate={
                    selectedValue === option.value
                      ? {
                          scale: [1, 1.02, 1],
                          boxShadow: [
                            "0px 0px 0px rgba(139, 123, 168, 0)",
                            "0px 0px 12px rgba(139, 123, 168, 0.3)",
                            "0px 4px 12px rgba(139, 123, 168, 0.2)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm text-gray-700">{option.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Progress dots and Back Button */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-1.5 justify-center">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor:
                        i <= currentQuestion ? "#a8d5f7" : "#d1d5db",
                      opacity:
                        i === currentQuestion
                          ? 1
                          : i < currentQuestion
                          ? 0.7
                          : 0.4,
                    }}
                  />
                ))}
              </div>

              {/* Back Button */}
              {currentQuestion > 0 && (
                <button
                  onClick={handlePreviousQuestion}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous Question
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Small Win Modal */}
      <SmallWinModal
        isOpen={showWinModal}
        title="Self-Esteem Assessment Complete! 🎉"
        message="You've completed all 10 questions. Your responses help us understand your self-perception and can guide meaningful conversations about self-worth."
        onContinue={handleContinue}
      />
    </div>
  );
}
