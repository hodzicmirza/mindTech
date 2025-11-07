import React, { useState } from "react";
import { MainOffice } from "./components/MainOffice";
import { ProblemSelection } from "./components/ProblemSelection";
import { QuestionFlow } from "./components/QuestionFlow";
import { SelfEsteemTest } from "./components/SelfEsteemTest";
import { WellBeingTest } from "./components/WellBeingTest";
import { AnalysisReport } from "./components/AnalysisReport";
import { BookingFlow } from "./components/BookingFlow";
import { Dashboard } from "./components/Dashboard";

type Screen =
  | "main-office"
  | "problem-selection"
  | "question-flow"
  | "self-esteem"
  | "well-being"
  | "analysis"
  | "booking"
  | "dashboard";

type ActivityType = "problem-cards" | "self-esteem" | "well-being";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("main-office");
  const [currentActivity, setCurrentActivity] = useState<ActivityType | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [activityAnswers, setActivityAnswers] = useState<string[]>([]);

  const handleActivitySelect = (activityId: string) => {
    if (activityId === "problem-cards") {
      setCurrentActivity("problem-cards");
      setCurrentScreen("problem-selection");
    } else if (activityId === "self-esteem") {
      setCurrentActivity("self-esteem");
      setCurrentScreen("self-esteem");
    } else if (activityId === "well-being") {
      setCurrentActivity("well-being");
      setCurrentScreen("well-being");
    }
  };

  const handleProblemSelect = (problem: string) => {
    setSelectedProblem(problem);
    setCurrentScreen("question-flow");
  };

  const handleQuestionFlowComplete = (answers: string[]) => {
    setActivityAnswers(answers);
    setCurrentScreen("analysis");
  };

  const handleSelfEsteemComplete = (responses: number[]) => {
    // Convert numbers to strings for compatibility with AnalysisReport
    setActivityAnswers(responses.map(String));
    setCurrentScreen("analysis");
  };

  const handleWellBeingComplete = (responses: number[]) => {
    // Convert numbers to strings for compatibility with AnalysisReport
    setActivityAnswers(responses.map(String));
    setCurrentScreen("analysis");
  };

  const handleBookSession = () => {
    setCurrentScreen("booking");
  };

  const handleTryAnother = () => {
    setCurrentScreen("main-office");
    setCurrentActivity(null);
    setSelectedProblem("");
    setActivityAnswers([]);
  };

  const handleBookingComplete = () => {
    setCurrentScreen("dashboard");
  };

  const handleBackToOffice = () => {
    setCurrentScreen("main-office");
    setCurrentActivity(null);
    setSelectedProblem("");
    setActivityAnswers([]);
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "main-office" && (
        <MainOffice onActivitySelect={handleActivitySelect} />
      )}

      {currentScreen === "problem-selection" && (
        <ProblemSelection
          isOpen={true}
          onClose={() => setCurrentScreen("main-office")}
          onSelect={handleProblemSelect}
        />
      )}

      {currentScreen === "question-flow" && (
        <QuestionFlow
          problem={selectedProblem}
          onComplete={handleQuestionFlowComplete}
          onBack={() => setCurrentScreen("problem-selection")}
        />
      )}

      {currentScreen === "self-esteem" && (
        <SelfEsteemTest
          onComplete={handleSelfEsteemComplete}
          onBack={() => setCurrentScreen("main-office")}
        />
      )}

      {currentScreen === "well-being" && (
        <WellBeingTest
          onComplete={handleWellBeingComplete}
          onBack={() => setCurrentScreen("main-office")}
        />
      )}

      {currentScreen === "analysis" && currentActivity && (
        <AnalysisReport
          problem={selectedProblem}
          answers={activityAnswers}
          testType={currentActivity}
          onBookSession={handleBookSession}
          onTryAnother={handleTryAnother}
        />
      )}

      {currentScreen === "booking" && (
        <BookingFlow
          onComplete={handleBookingComplete}
          onBack={() => setCurrentScreen("analysis")}
        />
      )}

      {currentScreen === "dashboard" && (
        <Dashboard onBackToHome={handleBackToOffice} />
      )}
    </div>
  );
}
