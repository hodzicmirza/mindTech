import React, { useState } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import {
  Calendar,
  Video,
  Building2,
  CheckCircle2,
  Sparkles,
  Heart,
  Brain,
  Smile,
  TrendingUp,
  ArrowRight,
  Home,
} from "lucide-react";
import { ConfettiEffect } from "./ConfettiEffect";

interface DashboardProps {
  onBackToHome: () => void;
}

export function Dashboard({ onBackToHome }: DashboardProps) {
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sectionCompleted, setSectionCompleted] = useState(false);

  const upcomingSession = {
    date: "November 14, 2025",
    time: "2:00 PM",
    type: "online",
    psychologist: "Dr. Sarah Chen",
  };

  const talkingPoints = [
    "Explored feelings about anxiety and stress management",
    "Discussed morning routines and their impact on mood",
    "Identified energy drains in daily life",
    "Set intention to work on sleep quality",
  ];

  const quickSolutions = [
    {
      title: "5-Minute Breathing",
      description: "Calm your nervous system",
      icon: Heart,
      color: "var(--color-lavender)",
    },
    {
      title: "Gratitude Journal",
      description: "Write 3 things daily",
      icon: Smile,
      color: "var(--color-mint)",
    },
    {
      title: "Mindful Walking",
      description: "10 minutes outside",
      icon: Brain,
      color: "var(--color-sky)",
    },
  ];

  const handleToggleItem = (index: number) => {
    if (completedItems.includes(index)) {
      setCompletedItems(completedItems.filter((i) => i !== index));
      setSectionCompleted(false);
    } else {
      const newCompletedItems = [...completedItems, index];
      setCompletedItems(newCompletedItems);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
  };

  const handleCompleteSection = () => {
    if (completedItems.length === quickSolutions.length) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setSectionCompleted(true);
      }, 2000);
    }
  };

  const allTasksCompleted = completedItems.length === quickSolutions.length;

  const progressValue = 33; // First session simulation done

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <ConfettiEffect trigger={showConfetti} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 transition-colors mb-6 font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Back to Office</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1
                className="text-2xl font-light mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Your Therapy Journey
              </h1>
              <p
                className="text-sm font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                Track your progress and access helpful resources
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-5 py-2.5 rounded-full flex items-center gap-2"
              style={{
                backgroundColor: "var(--color-lavender)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-light">
                Session 1 Complete!
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className="p-6 rounded-3xl border-0 mb-6"
            style={{
              backgroundColor: "var(--bg-card)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "var(--color-sage)" }}
              >
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3
                  className="text-base font-normal"
                  style={{ color: "var(--text-primary)" }}
                >
                  Your Progress
                </h3>
                <p
                  className="text-xs font-light"
                  style={{ color: "var(--text-secondary)" }}
                >
                  You're on the right path to better mental health
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span
                  className="font-light"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Journey Progress
                </span>
                <span
                  className="font-normal"
                  style={{ color: "var(--text-primary)" }}
                >
                  {progressValue}%
                </span>
              </div>
              <Progress value={progressValue} className="h-2" />

              <div className="grid grid-cols-3 gap-3 mt-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-3 rounded-2xl"
                  style={{ backgroundColor: "var(--color-mint)" }}
                >
                  <CheckCircle2
                    className="w-5 h-5 mx-auto mb-2"
                    style={{ color: "var(--text-primary)" }}
                  />
                  <p
                    className="text-xs font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    First Simulation
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-center p-3 rounded-2xl opacity-50"
                  style={{ backgroundColor: "var(--bg-hover)" }}
                >
                  <Calendar
                    className="w-5 h-5 mx-auto mb-2"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <p
                    className="text-xs font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    First Real Session
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-3 rounded-2xl opacity-50"
                  style={{ backgroundColor: "var(--bg-hover)" }}
                >
                  <ArrowRight
                    className="w-5 h-5 mx-auto mb-2"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <p
                    className="text-xs font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Ongoing Sessions
                  </p>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Session */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card
              className="p-6 rounded-3xl border-0 mb-6"
              style={{
                backgroundColor: "var(--bg-card)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-sky)" }}
                >
                  {upcomingSession.type === "online" ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <Building2 className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h3
                    className="text-base font-normal"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Upcoming Session
                  </h3>
                  <p
                    className="text-xs font-light"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Your next appointment
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3 mb-6">
                    <div>
                      <p
                        className="text-xs font-light mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Date & Time
                      </p>
                      <p
                        className="text-sm font-light"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {upcomingSession.date} at {upcomingSession.time}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-light mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Psychologist
                      </p>
                      <p
                        className="text-sm font-light"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {upcomingSession.psychologist}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-light mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Session Type
                      </p>
                      <div
                        className="inline-block px-3 py-1 rounded-xl text-xs capitalize font-light"
                        style={{
                          backgroundColor: "var(--color-sky)",
                          color: "white",
                        }}
                      >
                        {upcomingSession.type}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full h-11 rounded-2xl text-sm font-light border-0"
                    style={{
                      backgroundColor: "var(--color-sage)",
                      color: "white",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {upcomingSession.type === "online"
                      ? "Join Video Call"
                      : "Get Directions"}
                  </Button>
                </div>

                <div
                  className="p-5 rounded-2xl"
                  style={{ backgroundColor: "var(--color-peach)" }}
                >
                  <p
                    className="text-sm font-normal mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Preparation Tips
                  </p>
                  <ul
                    className="space-y-2.5 text-xs font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <li className="flex items-start gap-2">
                      <div
                        className="w-3 h-3 rounded-full border mt-0.5 flex-shrink-0"
                        style={{
                          borderColor: "var(--text-primary)",
                          borderWidth: "1.5px",
                        }}
                      />
                      <span>Review your talking points below</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div
                        className="w-3 h-3 rounded-full border mt-0.5 flex-shrink-0"
                        style={{
                          borderColor: "var(--text-primary)",
                          borderWidth: "1.5px",
                        }}
                      />
                      <span>Reflect on your week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div
                        className="w-3 h-3 rounded-full border mt-0.5 flex-shrink-0"
                        style={{
                          borderColor: "var(--text-primary)",
                          borderWidth: "1.5px",
                        }}
                      />
                      <span>Note any questions you have</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Talking Points */}
            <Card
              className="p-6 rounded-3xl border-0"
              style={{
                backgroundColor: "var(--bg-card)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3
                className="text-base font-normal mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Talking Points from Last Session
              </h3>
              <p
                className="text-xs font-light mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                Topics to continue exploring with your therapist
              </p>

              <div className="space-y-2.5">
                {talkingPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl"
                    style={{ backgroundColor: "var(--bg-hover)" }}
                  >
                    <ArrowRight
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    />
                    <p
                      className="text-xs font-light flex-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Access Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-6"
          >
            <Card
              className="p-6 rounded-3xl border-0"
              style={{
                backgroundColor: "var(--bg-card)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3
                className="text-base font-normal mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Quick Access Solutions
              </h3>
              <p
                className="text-xs font-light mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                Daily practices recommended by your therapist
              </p>

              {!sectionCompleted ? (
                <>
                  <div className="space-y-3">
                    {quickSolutions.map((solution, index) => {
                      const Icon = solution.icon;
                      const isCompleted = completedItems.includes(index);

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ y: -2 }}
                          className="p-4 rounded-2xl border-0 transition-all cursor-pointer"
                          style={{
                            backgroundColor: isCompleted
                              ? "var(--color-mint)"
                              : "var(--bg-hover)",
                            boxShadow: "var(--shadow-xs)",
                          }}
                          onClick={() => handleToggleItem(index)}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: solution.color }}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p
                                  className="text-sm font-normal"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {solution.title}
                                </p>
                                <Checkbox
                                  checked={isCompleted}
                                  onCheckedChange={() => handleToggleItem(index)}
                                  className="mt-0.5"
                                />
                              </div>
                              <p
                                className="text-xs font-light"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {solution.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.button
                    onClick={handleCompleteSection}
                    disabled={!allTasksCompleted}
                    whileHover={allTasksCompleted ? { scale: 1.02 } : {}}
                    whileTap={allTasksCompleted ? { scale: 0.98 } : {}}
                    className={`mt-5 p-3 rounded-2xl text-center w-full transition-all ${
                      allTasksCompleted
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                    }`}
                    style={{ backgroundColor: "var(--color-lavender)" }}
                  >
                    <p className="text-xs font-light text-white">
                      ✨ Complete tasks to earn small wins
                    </p>
                  </motion.button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="p-6 rounded-2xl text-center"
                  style={{
                    backgroundColor: "var(--color-sage)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <Sparkles className="w-6 h-6 mx-auto mb-2 text-white" />
                  <p className="text-sm font-normal text-white mb-1">
                    All Tasks Completed! 🎉
                  </p>
                  <p className="text-xs font-light text-white opacity-90">
                    Great job on your daily wellness practices!
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
