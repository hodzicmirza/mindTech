import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  FileText,
  Brain,
  Heart,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Download,
} from "lucide-react";

interface AnalysisReportProps {
  problem?: string;
  answers: string[];
  testType: "problem-cards" | "self-esteem" | "well-being";
  onBookSession: () => void;
  onTryAnother: () => void;
}

export function AnalysisReport({
  problem,
  answers,
  testType,
  onBookSession,
  onTryAnother,
}: AnalysisReportProps) {
  // Generate insights based on the test type and answers
  const getTestTitle = () => {
    switch (testType) {
      case "problem-cards":
        return "Problem Cards Session";
      case "self-esteem":
        return "Self-Esteem Assessment";
      case "well-being":
        return "Well-Being Assessment";
    }
  };

  const emotionalPatterns = [
    "Awareness of emotional states",
    "Reflective thinking patterns",
    "Adaptive coping mechanisms",
  ];

  const keyThemes = answers.slice(0, 5);

  const focusAreas = [
    "Self-awareness and emotional intelligence",
    "Stress management techniques",
    "Building resilience and coping strategies",
  ];

  const talkingPoints = [
    `Explored feelings about ${problem || "personal growth"}`,
    "Identified key emotional patterns",
    "Discussed current coping strategies",
    "Explored future goals and aspirations",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center"
            style={{ backgroundColor: "var(--pastel-lavender)" }}
          >
            <FileText className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="mb-4">Your First-Session Insight Report</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your {getTestTitle()}, we've generated a personalized summary. This is a
            supportive overview, not a diagnosis - think of it as talking points for your next
            therapy session.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Panel - Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 rounded-3xl border-0" style={{ boxShadow: "var(--shadow-medium)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--pastel-sky)" }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3>Session Summary</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Test Type</p>
                  <p className="text-sm">{getTestTitle()}</p>
                </div>

                {problem && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Focus Area</p>
                    <div
                      className="inline-block px-3 py-1 rounded-xl text-sm"
                      style={{ backgroundColor: "var(--pastel-lavender)", color: "white" }}
                    >
                      {problem}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Responses</p>
                  <p className="text-sm">{answers.length} insights shared</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Completed</p>
                  <p className="text-sm">November 7, 2025</p>
                </div>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <Button
                variant="outline"
                className="w-full h-12 rounded-2xl border-2"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Panel - Detailed Report */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Emotional Patterns */}
            <Card className="p-8 rounded-3xl border-0" style={{ boxShadow: "var(--shadow-medium)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--pastel-rose)" }}
                >
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3>Emotional Patterns</h3>
              </div>

              <div className="space-y-3">
                {emotionalPatterns.map((pattern, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-background"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <p className="text-sm">{pattern}</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Key Words */}
            <Card className="p-8 rounded-3xl border-0" style={{ boxShadow: "var(--shadow-medium)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--pastel-mint)" }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3>Key Words You Used</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {keyThemes.map((word, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="px-4 py-2 rounded-xl text-sm"
                    style={{
                      backgroundColor: `var(--pastel-${
                        ["lavender", "sky", "mint", "peach", "rose"][index % 5]
                      })`,
                      color: "white",
                    }}
                  >
                    {word}
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Focus Areas */}
            <Card className="p-8 rounded-3xl border-0" style={{ boxShadow: "var(--shadow-medium)" }}>
              <h3 className="mb-4">Possible Focus Areas for Future Therapy</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Based on your responses, these areas might be worth exploring further with a
                professional therapist:
              </p>

              <div className="space-y-3">
                {focusAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-background"
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "var(--pastel-lavender)" }}
                    >
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                    <p className="text-sm">{area}</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Talking Points */}
            <Card className="p-8 rounded-3xl border-0" style={{ boxShadow: "var(--shadow-medium)" }}>
              <h3 className="mb-4">Talking Points for Your Next Session</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Share these topics with your therapist to continue the conversation:
              </p>

              <ul className="space-y-3">
                {talkingPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onBookSession}
            size="lg"
            className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 transition-all"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Book a Real Session
          </Button>

          <Button
            onClick={onTryAnother}
            variant="outline"
            size="lg"
            className="h-14 px-8 rounded-2xl border-2"
          >
            Try Another Activity
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
