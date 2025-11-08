import React, { useState } from "react";
import { motion } from "motion/react";
import { SmallWinModal } from "./SmallWinModal";
import { ArrowLeft, Info, Sun, Home } from "lucide-react";

interface WellBeingTestProps {
  onComplete: (responses: number[]) => void;
  onBack: () => void;
}

const questions = [
  "I have felt cheerful and in good spirits.",
  "I have felt calm and relaxed.",
  "I have felt active and vigorous.",
  "I woke up feeling fresh and rested.",
  "My daily life has been filled with things that interest me.",
];

const scaleOptions = [
  { value: 0, label: "At no time" },
  { value: 1, label: "Some of the time" },
  { value: 2, label: "Less than half the time" },
  { value: 3, label: "More than half the time" },
  { value: 4, label: "Most of the time" },
  { value: 5, label: "All of the time" },
];

export function WellBeingTest({ onComplete, onBack }: WellBeingTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  const calculateScore = (allResponses: number[]): number => {
    const sum = allResponses.reduce((acc, val) => acc + val, 0);
    return sum * 4; // Multiply by 4 to get 0-100 scale
  };

  const getScoreInterpretation = (score: number): string => {
    if (score < 50) {
      return "Your score suggests you may be experiencing low mood. Consider speaking with a healthcare professional.";
    } else if (score < 70) {
      return "Your well-being is moderate. There's room for improvement in your daily life.";
    } else {
      return "Your well-being appears to be good! Keep nurturing the positive aspects of your life.";
    }
  };

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
        // All questions answered, calculate score and show completion modal
        const score = calculateScore(newResponses);
        setCalculatedScore(score);
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
    onComplete(responses);
  };

  const currentQuestionText = questions[currentQuestion];

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
            How are you feeling?
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
              style={{ backgroundColor: "#a8e6cf" }}
            >
              <Sun className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600 leading-snug">
                This is the WHO-5 Well-Being Index. Think about the past two
                weeks and select how often each statement has applied to you.
                There are no right or wrong answers.
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
              <h3 className="text-sm font-medium mb-1.5 text-gray-700">
                {currentQuestionText}
              </h3>
              <p className="text-xs text-gray-500">
                Over the past two weeks, how often has this applied to you?
              </p>
            </div>

            {/* Scale Options */}
            <div className="space-y-2 mb-4">
              {scaleOptions.map((option) => (
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
                        i <= currentQuestion ? "#a8e6cf" : "#d1d5db",
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

      {/* Small Win Modal with Score */}
      <SmallWinModal
        isOpen={showWinModal}
        title="Well-Being Assessment Complete! 🎉"
        message={
          calculatedScore !== null
            ? `Your well-being score is ${calculatedScore} out of 100. ${getScoreInterpretation(
                calculatedScore
              )}`
            : "You've completed all 5 questions. Your responses help us understand your overall well-being."
        }
        onContinue={handleContinue}
      />
    </div>
  );
}
