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
      color: "var(--pastel-lavender)",
    },
    {
      title: "Gratitude Journal",
      description: "Write 3 things daily",
      icon: Smile,
      color: "var(--pastel-mint)",
    },
    {
      title: "Mindful Walking",
      description: "10 minutes outside",
      icon: Brain,
      color: "var(--pastel-sky)",
    },
  ];

  const handleToggleItem = (index: number) => {
    if (completedItems.includes(index)) {
      setCompletedItems(completedItems.filter((i) => i !== index));
    } else {
      setCompletedItems([...completedItems, index]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
  };

  const progressValue = 33; // First session simulation done

  return (
    <div className="min-h-screen bg-[#f5f0eb] p-6">
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
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Back to Office</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-medium text-gray-800 mb-1">
                Your Therapy Journey
              </h1>
              <p className="text-sm text-gray-500">
                Track your progress and access helpful resources
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md"
              style={{ backgroundColor: "#c8b6e2" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">
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
          <Card className="p-6 rounded-3xl bg-white shadow-lg border border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#c8b6e2" }}
              >
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-800">
                  Your Progress
                </h3>
                <p className="text-xs text-gray-500">
                  You're on the right path to better mental health
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Journey Progress</span>
                <span className="text-gray-700 font-medium">
                  {progressValue}%
                </span>
              </div>
              <Progress value={progressValue} className="h-2" />

              <div className="grid grid-cols-3 gap-3 mt-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-3 rounded-2xl bg-gray-50"
                >
                  <CheckCircle2 className="w-5 h-5 text-gray-800 mx-auto mb-2" />
                  <p className="text-xs text-gray-700">First Simulation</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-center p-3 rounded-2xl bg-gray-50 opacity-40"
                >
                  <Calendar className="w-5 h-5 text-gray-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">First Real Session</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-3 rounded-2xl bg-gray-50 opacity-40"
                >
                  <ArrowRight className="w-5 h-5 text-gray-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Ongoing Sessions</p>
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
            <Card className="p-6 rounded-3xl bg-white shadow-lg border border-gray-200 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "#a8d5f7" }}
                >
                  {upcomingSession.type === "online" ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <Building2 className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-800">
                    Upcoming Session
                  </h3>
                  <p className="text-xs text-gray-500">Your next appointment</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                      <p className="text-sm text-gray-700">
                        {upcomingSession.date} at {upcomingSession.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Psychologist</p>
                      <p className="text-sm text-gray-700">
                        {upcomingSession.psychologist}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Session Type</p>
                      <div
                        className="inline-block px-3 py-1 rounded-xl text-xs capitalize"
                        style={{ backgroundColor: "#a8d5f7", color: "white" }}
                      >
                        {upcomingSession.type}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full h-11 rounded-2xl text-sm font-medium"
                    style={{ backgroundColor: "#8b7ba8", color: "white" }}
                  >
                    {upcomingSession.type === "online"
                      ? "Join Video Call"
                      : "Get Directions"}
                  </Button>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50">
                  <p className="text-sm text-gray-700 font-medium mb-4">
                    Preparation Tips
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Review your talking points below</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Reflect on your week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-gray-400 mt-0.5 flex-shrink-0" />
                      <span>Note any questions you have</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Talking Points */}
            <Card className="p-6 rounded-3xl bg-white shadow-lg border border-gray-200">
              <h3 className="text-base font-medium text-gray-800 mb-2">
                Talking Points from Last Session
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                Topics to continue exploring with your therapist
              </p>

              <div className="space-y-2.5">
                {talkingPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 flex-1">{point}</p>
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
            <Card className="p-6 rounded-3xl bg-white shadow-lg border border-gray-200">
              <h3 className="text-base font-medium text-gray-800 mb-2">
                Quick Access Solutions
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                Daily practices recommended by your therapist
              </p>

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
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isCompleted
                          ? "border-gray-300 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
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
                            <p className="text-sm text-gray-800 font-medium">
                              {solution.title}
                            </p>
                            <Checkbox
                              checked={isCompleted}
                              onCheckedChange={() => handleToggleItem(index)}
                              className="mt-0.5"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {solution.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 p-3 rounded-2xl bg-gray-50 text-center">
                <p className="text-xs text-gray-500">
                  ✨ Complete tasks to earn small wins
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
