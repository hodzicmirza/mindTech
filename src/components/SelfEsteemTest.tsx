import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { SmallWinModal } from "./SmallWinModal";
import { ArrowLeft, Info, Heart } from "lucide-react";

interface SelfEsteemTestProps {
  onComplete: (responses: number[]) => void;
  onBack: () => void;
}

const questions = [
  { text: "On the whole, I am satisfied with myself.", reverse: false },
  { text: "At times I think I am no good at all.", reverse: true },
  { text: "I feel that I have a number of good qualities.", reverse: false },
  { text: "I am able to do things as well as most other people.", reverse: false },
  { text: "I feel I do not have much to be proud of.", reverse: true },
  { text: "I take a positive attitude toward myself.", reverse: false },
  { text: "I certainly feel useless at times.", reverse: true },
  { text: "I wish I could have more respect for myself.", reverse: true },
  { text: "I feel that I'm a person of worth, at least on an equal plane with others.", reverse: false },
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
  };

  const handleNext = () => {
    if (selectedValue !== null) {
      const newResponses = [...responses, selectedValue];
      setResponses(newResponses);
      setSelectedValue(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // All questions answered, show completion modal
        setShowWinModal(true);
      }
    }
  };

  const handleContinue = () => {
    setShowWinModal(false);
    // Apply reverse scoring before completing
    // Note: responses already includes the last answer since handleNext was called
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
          <h3>Do you believe in yourself?</h3>
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
              style={{ backgroundColor: "var(--pastel-sky)" }}
            >
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm">
                This is the Rosenberg Self-Esteem Scale. Read each statement and select how much you
                agree or disagree. There are no right or wrong answers - be honest with yourself.
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
              <h3 className="text-xl mb-2 text-foreground">{currentQuestionData.text}</h3>
            </div>

            {/* Likert Scale Options */}
            <div className="space-y-3 mb-8">
              {likertOptions.map((option) => (
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
                    <span className="text-sm font-medium text-foreground">{option.label}</span>
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
                          ? "var(--pastel-sky)"
                          : i === currentQuestion
                            ? "var(--pastel-sky)"
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

