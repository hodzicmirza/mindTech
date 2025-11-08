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
  Download,
} from "lucide-react";
import data from "../questionsDB/q&a.json";
import { getCustomQuestions } from "../utils/generateQuestions";

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
  const keyThemes = answers.slice(0, 5);

  // Check if this is a custom problem (not in predefined list)
  const isCustomProblem =
    problem &&
    problem.toLowerCase() !== "anxiety" &&
    problem.toLowerCase() !== "depression" &&
    problem.toLowerCase() !== "adhd";

  // Get questions - either from predefined data or custom questions
  const getQuestions = () => {
    if (isCustomProblem && problem) {
      const customQuestions = getCustomQuestions(problem);
      return customQuestions || [];
    } else {
      const testKey = (problem?.toLowerCase() ||
        "anxiety") as keyof typeof data.tests;
      return data.tests[testKey] || [];
    }
  };

  const questions = getQuestions();

  // helper to safely get fields from the questions array
  const getAnswerField = (
    index: number,
    field: "description" | "suggestion"
  ) => {
    const question = questions[index];
    if (!question) return undefined;
    const found = question.answers.find(
      (answer) => answer.answer === keyThemes[index]
    );
    return found ? found[field] : undefined;
  };

  const emotionalPatterns = [
    getAnswerField(0, "description"),
    getAnswerField(1, "description"),
    getAnswerField(2, "description"),
    getAnswerField(3, "description"),
    getAnswerField(4, "description"),
  ].filter((pattern): pattern is string => pattern !== undefined);

  const focusAreas = [
    getAnswerField(0, "suggestion"),
    getAnswerField(1, "suggestion"),
    getAnswerField(2, "suggestion"),
    getAnswerField(3, "suggestion"),
    getAnswerField(4, "suggestion"),
  ].filter((area): area is string => area !== undefined);

  const talkingPoints = [
    /* `Explored feelings about ${problem || "personal growth"}`,
    "Identified key emotional patterns",
    "Discussed current coping strategies",
    "Explored future goals and aspirations", */
  ];

  return (
    <div className="min-h-screen bg-[#f9f7f4] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="w-14 h-14 mb-4 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#c8b6e2" }}
          >
            <FileText className="w-7 h-7 text-white" />
          </motion.div>
          <h1 className="text-lg font-medium tracking-tight mb-2 text-gray-800">
            Your First-Session Insight Report
          </h1>
          <p className="text-xs leading-relaxed text-gray-500 max-w-2xl">
            Based on your {getTestTitle()}, we've generated a personalized
            summary. This is a supportive overview, not a diagnosis - think of
            it as talking points for your next therapy session.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Left Panel - Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#a8d5f7" }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  Session Summary
                </h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <p className="text-xs text-gray-500 mb-1.5">Test Type</p>
                  <p className="text-xs text-gray-700">{getTestTitle()}</p>
                </div>

                {problem && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">Focus Area</p>
                    <div
                      className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: "#c8b6e2",
                        color: "white",
                      }}
                    >
                      {problem}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-500 mb-1.5">Responses</p>
                  <p className="text-xs text-gray-700">
                    {answers.length} insights shared
                  </p>
                </div>

                <div className="pt-3.5 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1.5">Completed</p>
                  <p className="text-xs text-gray-700">
                    {new Date().toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Card>
            {/* Key Words */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-5"
            >
              <Card className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#a8e6cf" }}
                  >
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Key Words You Used
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {keyThemes.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + index * 0.04 }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: [
                          "#c8b6e2",
                          "#a8d5f7",
                          "#a8e6cf",
                          "#ffd4a3",
                          "#ffb6c1",
                        ][index % 5],
                        color: "white",
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-5 space-y-2.5"
            >
              <Button
                variant="outline"
                className="w-full h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Report
              </Button>
              <Button
                onClick={onBookSession}
                className="w-full h-10 rounded-xl text-xs font-medium"
                style={{
                  backgroundColor: "#8b7ba8",
                  color: "white",
                }}
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                Book a Real Session
              </Button>
              <Button
                onClick={onTryAnother}
                variant="outline"
                className="w-full h-10 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700"
              >
                Try Another Activity
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Panel - Detailed Report */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-5"
          >
            {/* Emotional Patterns */}
            <Card className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#ffb6c1" }}
                >
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  Emotional Patterns
                </h3>
              </div>

              <div className="space-y-2.5">
                {emotionalPatterns.map((pattern, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed text-gray-700">
                      {pattern}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Focus Areas */}
            <Card className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <h3 className="mb-2 text-sm font-medium text-gray-800">
                Possible Focus Areas for Future Therapy
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Based on your responses, these areas might be worth exploring
                further with a professional therapist:
              </p>

              <div className="space-y-2.5">
                {focusAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50"
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#c8b6e2" }}
                    >
                      <span className="text-white text-[10px] font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-700">
                      {area}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Talking Points */}
            {/* <Card className="p-8 rounded-3xl border-0" style={{ boxShadow: "var(--shadow-medium)" }}>
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
            </Card> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
