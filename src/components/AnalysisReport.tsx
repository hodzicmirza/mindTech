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
    if (testType !== "problem-cards") {
      return [];
    }
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

  // Generate insights for self-esteem test
  const getSelfEsteemInsights = () => {
    const numAnswers = answers.map(Number);
    const avgScore = numAnswers.reduce((a, b) => a + b, 0) / numAnswers.length;
    
    const patterns: string[] = [];
    const focuses: string[] = [];

    if (avgScore <= 1.5) {
      patterns.push("You show strong self-confidence and positive self-regard.");
      patterns.push("You generally feel satisfied with who you are as a person.");
      patterns.push("You recognize your own worth and capabilities.");
      focuses.push("Continue building on your positive self-image through self-reflection");
      focuses.push("Explore ways to maintain healthy self-esteem during challenges");
      focuses.push("Consider how to support others in their self-esteem journey");
    } else if (avgScore <= 2.5) {
      patterns.push("You have a generally positive view of yourself with some areas of self-doubt.");
      patterns.push("You're working on accepting yourself while recognizing room for growth.");
      patterns.push("You show awareness of both your strengths and areas to develop.");
      focuses.push("Strengthen positive self-talk and challenge negative thoughts");
      focuses.push("Identify and celebrate your accomplishments, big and small");
      focuses.push("Explore the origins of self-doubt and work on reframing beliefs");
    } else {
      patterns.push("You're experiencing challenges with self-worth and self-acceptance.");
      patterns.push("You may have difficulty recognizing your positive qualities.");
      patterns.push("Your inner critic may be particularly active right now.");
      focuses.push("Develop compassionate self-talk and challenge harsh self-judgments");
      focuses.push("Work on identifying and acknowledging your strengths and achievements");
      focuses.push("Explore core beliefs about yourself and where they originated");
      focuses.push("Practice self-compassion exercises and mindfulness techniques");
    }

    return { patterns, focuses };
  };

  // Generate insights for well-being test
  const getWellBeingInsights = () => {
    const numAnswers = answers.map(Number);
    const totalScore = numAnswers.reduce((a, b) => a + b, 0);
    
    const patterns: string[] = [];
    const focuses: string[] = [];

    if (totalScore <= 7) {
      patterns.push("You're experiencing significant challenges with your well-being.");
      patterns.push("Your mood and energy levels may be consistently low.");
      patterns.push("Daily activities might feel overwhelming or unmanageable.");
      focuses.push("Consider reaching out to a mental health professional for support");
      focuses.push("Explore strategies for managing daily stress and building small routines");
      focuses.push("Work on identifying activities that bring even small moments of comfort");
      focuses.push("Discuss potential underlying factors affecting your well-being");
    } else if (totalScore <= 13) {
      patterns.push("Your well-being shows room for improvement in several areas.");
      patterns.push("You experience a mix of positive and challenging days.");
      patterns.push("Some aspects of daily life feel manageable while others are difficult.");
      focuses.push("Identify specific areas of life that need more attention and support");
      focuses.push("Develop coping strategies for managing stress and low mood");
      focuses.push("Explore lifestyle changes that could enhance your sense of well-being");
      focuses.push("Work on building consistent self-care practices");
    } else {
      patterns.push("You're experiencing good overall well-being and life satisfaction.");
      patterns.push("You generally feel capable and energized in your daily life.");
      patterns.push("You have positive emotional experiences most of the time.");
      focuses.push("Maintain your current wellness practices and identify what works best");
      focuses.push("Explore ways to deepen your sense of purpose and fulfillment");
      focuses.push("Consider how to navigate challenges while preserving your well-being");
    }

    return { patterns, focuses };
  };

  // Get patterns and focus areas based on test type
  let emotionalPatterns: string[] = [];
  let focusAreas: string[] = [];

  if (testType === "problem-cards") {
    emotionalPatterns = [
      getAnswerField(0, "description"),
      getAnswerField(1, "description"),
      getAnswerField(2, "description"),
      getAnswerField(3, "description"),
      getAnswerField(4, "description"),
    ].filter((pattern): pattern is string => pattern !== undefined);

    focusAreas = [
      getAnswerField(0, "suggestion"),
      getAnswerField(1, "suggestion"),
      getAnswerField(2, "suggestion"),
      getAnswerField(3, "suggestion"),
      getAnswerField(4, "suggestion"),
    ].filter((area): area is string => area !== undefined);
  } else if (testType === "self-esteem") {
    const insights = getSelfEsteemInsights();
    emotionalPatterns = insights.patterns;
    focusAreas = insights.focuses;
  } else if (testType === "well-being") {
    const insights = getWellBeingInsights();
    emotionalPatterns = insights.patterns;
    focusAreas = insights.focuses;
  }

  const talkingPoints = [
    /* `Explored feelings about ${problem || "personal growth"}`,
    "Identified key emotional patterns",
    "Discussed current coping strategies",
    "Explored future goals and aspirations", */
  ];

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
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
            style={{
              backgroundColor: "var(--color-lavender)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <FileText className="w-7 h-7 text-white" />
          </motion.div>
          <h1
            className="text-lg font-light tracking-tight mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Your First-Session Insight Report
          </h1>
          <p
            className="text-xs leading-relaxed font-light max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
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
            <Card
              className="p-5 rounded-2xl border-0"
              style={{
                backgroundColor: "var(--bg-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--color-sky)",
                    boxShadow: "var(--shadow-xs)",
                  }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3
                  className="text-sm font-light"
                  style={{ color: "var(--text-primary)" }}
                >
                  Session Summary
                </h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <p
                    className="text-xs font-light mb-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Test Type
                  </p>
                  <p
                    className="text-xs font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {getTestTitle()}
                  </p>
                </div>

                {problem && (
                  <div>
                    <p
                      className="text-xs font-light mb-1.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Focus Area
                    </p>
                    <div
                      className="inline-block px-2.5 py-1 rounded-lg text-xs font-light"
                      style={{
                        backgroundColor: "var(--color-lavender)",
                        color: "white",
                      }}
                    >
                      {problem}
                    </div>
                  </div>
                )}

                <div>
                  <p
                    className="text-xs font-light mb-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Responses
                  </p>
                  <p
                    className="text-xs font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {answers.length} insights shared
                  </p>
                </div>

                <div
                  className="pt-3.5"
                  style={{ borderTop: "1px solid var(--bg-hover)" }}
                >
                  <p
                    className="text-xs font-light mb-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Completed
                  </p>
                  <p
                    className="text-xs font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
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
              <Card
                className="p-5 rounded-2xl border-0"
                style={{
                  backgroundColor: "var(--bg-card)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--color-mint)",
                      boxShadow: "var(--shadow-xs)",
                    }}
                  >
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    className="text-sm font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
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
                      className="px-2.5 py-1.5 rounded-lg text-xs font-light"
                      style={{
                        backgroundColor: [
                          "var(--color-lavender)",
                          "var(--color-sky)",
                          "var(--color-mint)",
                          "var(--color-peach)",
                          "var(--color-sage)",
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
                className="w-full h-10 rounded-xl border-0 text-xs font-light cursor-pointer"
                style={{
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-primary)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Report
              </Button>
              <Button
                onClick={onBookSession}
                className="w-full h-10 rounded-xl text-xs font-light cursor-pointer"
                style={{
                  backgroundColor: "var(--color-sage)",
                  color: "white",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                Book a Real Session
              </Button>
              <Button
                onClick={onTryAnother}
                variant="outline"
                className="w-full h-10 rounded-xl border-0 text-xs font-light cursor-pointer"
                style={{
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-primary)",
                  boxShadow: "var(--shadow-sm)",
                }}
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
            <Card
              className="p-5 rounded-2xl border-0"
              style={{
                backgroundColor: "var(--bg-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--color-peach)",
                    boxShadow: "var(--shadow-xs)",
                  }}
                >
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3
                  className="text-sm font-light"
                  style={{ color: "var(--text-primary)" }}
                >
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
                    className="flex items-start gap-2.5 p-3 rounded-xl"
                    style={{ backgroundColor: "var(--bg-hover)" }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    />
                    <p
                      className="text-xs leading-relaxed font-light"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {pattern}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Focus Areas */}
            <Card
              className="p-5 rounded-2xl border-0"
              style={{
                backgroundColor: "var(--bg-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3
                className="mb-2 text-sm font-light"
                style={{ color: "var(--text-primary)" }}
              >
                Possible Focus Areas for Future Therapy
              </h3>
              <p
                className="text-xs font-light mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
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
                    className="flex items-start gap-2.5 p-3 rounded-xl"
                    style={{ backgroundColor: "var(--bg-hover)" }}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: "var(--color-lavender)",
                        boxShadow: "var(--shadow-xs)",
                      }}
                    >
                      <span className="text-white text-[10px] font-light">
                        {index + 1}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-relaxed font-light"
                      style={{ color: "var(--text-primary)" }}
                    >
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
