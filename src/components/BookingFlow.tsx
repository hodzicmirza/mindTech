import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Building2, Video, ArrowRight, ArrowLeft, CheckCircle2, Calendar as CalendarIcon } from "lucide-react";
import { ConfettiEffect } from "./ConfettiEffect";

interface BookingFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

export function BookingFlow({ onComplete, onBack }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState<"in-person" | "online" | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [includeReport, setIncludeReport] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleConfirmBooking = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const canContinueStep1 = sessionType !== null;
  const canContinueStep2 = selectedDate !== undefined && selectedTime !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-[#f5f0eb] to-[#f0ebe6] p-6">
      <ConfettiEffect trigger={showConfetti} />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 mt-8">
          <button
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-4">Book Your Real Session</h1>
            <p className="text-muted-foreground">
              Step {step} of 3 - Let's schedule your first professional therapy session
            </p>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      step >= i
                        ? "bg-primary text-white"
                        : "bg-white border-2 border-border text-muted-foreground"
                    }`}
                  >
                    {step > i ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span>{i}</span>
                    )}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-16 h-1 rounded-full transition-colors ${
                        step > i ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-center mb-8">Choose Your Session Type</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* In-Person Card */}
                <motion.button
                  onClick={() => setSessionType("in-person")}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left transition-all ${
                    sessionType === "in-person" ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <Card
                    className="p-8 rounded-3xl border-0 h-full"
                    style={{ boxShadow: "var(--shadow-medium)" }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: "var(--pastel-lavender)" }}
                    >
                      <Building2 className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="mb-3">In-Person at Clinic</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Visit our comfortable, private office space. Perfect for those who prefer
                      face-to-face interaction.
                    </p>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Cozy, private environment
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Free parking available
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Complimentary refreshments
                      </li>
                    </ul>

                    {sessionType === "in-person" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </Card>
                </motion.button>

                {/* Online Card */}
                <motion.button
                  onClick={() => setSessionType("online")}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left transition-all ${
                    sessionType === "online" ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <Card
                    className="p-8 rounded-3xl border-0 h-full"
                    style={{ boxShadow: "var(--shadow-medium)" }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: "var(--pastel-sky)" }}
                    >
                      <Video className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="mb-3">Online Session</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect from anywhere via secure video call. Flexible and convenient for your
                      schedule.
                    </p>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Join from home
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        HIPAA-compliant video
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Same-day appointments
                      </li>
                    </ul>

                    {sessionType === "online" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </Card>
                </motion.button>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canContinueStep1}
                  size="lg"
                  className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-center mb-8">Select Date & Time</h2>

              <Card
                className="p-8 rounded-3xl border-0 max-w-3xl mx-auto"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      <h3>Choose a Date</h3>
                    </div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-2xl border-0"
                      disabled={(date: Date) => date < new Date()}
                    />
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="mb-4">Available Times</h3>
                    {!selectedDate ? (
                      <p className="text-sm text-muted-foreground">
                        Please select a date first
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-3 rounded-xl transition-all ${
                              selectedTime === time
                                ? "bg-primary text-white"
                                : "bg-background hover:bg-muted"
                            }`}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!canContinueStep2}
                    size="lg"
                    className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-center mb-8">Confirm Your Booking</h2>

              <Card
                className="p-8 rounded-3xl border-0 max-w-2xl mx-auto"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                {/* Booking Summary */}
                <div className="mb-8 p-6 rounded-2xl bg-background">
                  <h3 className="mb-4">Session Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="capitalize">{sessionType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{selectedDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                </div>

                {/* Attach Report */}
                <div className="mb-8 p-6 rounded-2xl border-2 border-primary/20">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="include-report"
                      checked={includeReport}
                      onCheckedChange={(checked: boolean) => setIncludeReport(checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor="include-report" className="cursor-pointer">
                        <p className="mb-2">Include my insight report</p>
                        <p className="text-xs text-muted-foreground">
                          We'll attach your insight report to this booking so your psychologist
                          can review your responses and start your session with valuable context.
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Confirmation */}
                <div className="text-center">
                  <Button
                    onClick={handleConfirmBooking}
                    size="lg"
                    className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Confirm Booking
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    You'll receive a confirmation email with session details
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
