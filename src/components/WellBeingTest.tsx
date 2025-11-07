import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { SmallWinModal } from "./SmallWinModal";
import { ArrowLeft, Info, Sun } from "lucide-react";

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

  const handleSelect = (value: number) => {
    setSelectedValue(value);
  };

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

  const handleNext = () => {
    if (selectedValue !== null) {
      const newResponses = [...responses, selectedValue];
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
    }
  };

  const handleContinue = () => {
    setShowWinModal(false);
    onComplete(responses);
  };

  const currentQuestionText = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6]">
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
          <h3>How are you feeling?</h3>
          <p className="text-xs text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="w-24" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl flex items-start gap-3"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--pastel-mint)" }}
            >
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm">
                This is the WHO-5 Well-Being Index. Think about the past two weeks and select how
                often each statement has applied to you. There are no right or wrong answers.
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
            className="bg-white rounded-3xl p-8"
            style={{ boxShadow: "var(--shadow-large)" }}
          >
            <div className="mb-8">
              <h3 className="text-xl mb-2 text-foreground">{currentQuestionText}</h3>
              <p className="text-sm text-muted-foreground">
                Over the past two weeks, how often has this applied to you?
              </p>
            </div>

            {/* Scale Options */}
            <div className="space-y-3 mb-8">
              {scaleOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedValue === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-foreground w-8">
                        {option.value}
                      </span>
                      <span className="text-sm font-medium text-foreground">{option.label}</span>
                    </div>
                    {selectedValue === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                      >
                        <span className="text-white text-xs">✓</span>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Progress and Navigation */}
            <div className="space-y-4">
              {/* Progress dots */}
              <div className="flex gap-2 justify-center">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor:
                        i < currentQuestion
                          ? "var(--pastel-mint)"
                          : i === currentQuestion
                            ? "var(--pastel-mint)"
                            : "var(--muted)",
                      opacity: i === currentQuestion ? 1 : i < currentQuestion ? 0.6 : 0.3,
                    }}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={selectedValue === null}
                className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Test"}
              </Button>
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
            ? `Your well-being score is ${calculatedScore} out of 100. ${getScoreInterpretation(calculatedScore)}`
            : "You've completed all 5 questions. Your responses help us understand your overall well-being."
        }
        onContinue={handleContinue}
      />
    </div>
  );
}

