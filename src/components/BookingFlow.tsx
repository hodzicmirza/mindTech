import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { IdentityVerification } from "./IdentityVerification";

import {
  Building2,
  Video,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar as CalendarIcon,
} from "lucide-react";
import { ConfettiEffect } from "./ConfettiEffect";

interface BookingDetails {
  sessionType: "in-person" | "online";
  date: Date;
  time: string;
}


interface BookingFlowProps {
  onComplete: (details: BookingDetails) => void;
  onBack: () => void;
}

export function BookingFlow({ onComplete, onBack }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState<"in-person" | "online" | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [includeReport, setIncludeReport] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

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
    if (sessionType && selectedDate && selectedTime) {
      setShowConfetti(true);
      setTimeout(() => {
        onComplete({
          sessionType,
          date: selectedDate,
          time: selectedTime,
        });
      }, 2000);
    }
  };

  const canContinueStep1 = sessionType !== null;
  const canContinueStep2 = selectedDate !== undefined && selectedTime !== null;

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <ConfettiEffect trigger={showConfetti} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-4">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            className="flex items-center gap-2 transition-colors mb-8 font-light cursor-pointer"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1
              className="text-2xl font-light mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Book Your Real Session
            </h1>
            <p
              className="text-sm font-light mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Step {step} of 3 - Let's schedule your first professional therapy
              session
            </p>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-3 mb-12">
              {[1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor:
                        step >= i ? "var(--color-sage)" : "var(--bg-card)",
                      color: step >= i ? "white" : "var(--text-light)",
                      border:
                        step >= i ? "none" : "1.5px solid var(--text-light)",
                      boxShadow: step >= i ? "var(--shadow-sm)" : "none",
                    }}
                  >
                    <span className="font-light">{i}</span>
                  </motion.div>
                  {i < 3 && (
                    <div className="relative w-20 h-0.5">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: "var(--text-light)" }}
                      ></div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: step > i ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: "var(--color-sage)" }}
                      ></motion.div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <h2
                className="text-center text-lg font-light mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                Choose Your Session Type
              </h2>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* In-Person Card */}
                <motion.button
                  onClick={() => setSessionType("in-person")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="text-left transition-all rounded-3xl cursor-pointer"
                  style={{
                    outline:
                      sessionType === "in-person"
                        ? "2px solid var(--color-sage)"
                        : "none",
                    outlineOffset: "2px",
                  }}
                >
                  <Card
                    className="p-8 rounded-3xl border-0 h-full"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: "var(--color-lavender)" }}
                    >
                      <Building2 className="w-7 h-7 text-white" />
                    </div>

                    <h3
                      className="text-lg font-normal mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      In-Person at Clinic
                    </h3>
                    <p
                      className="text-sm font-light mb-6 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Visit our comfortable, private office space. Perfect for
                      those who prefer face-to-face interaction.
                    </p>

                    <ul
                      className="space-y-2.5 text-sm font-light"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <li className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: "var(--text-muted)" }}
                        />
                        Cozy, private environment
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: "var(--text-muted)" }}
                        />
                        Free parking available
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: "var(--text-muted)" }}
                        />
                        Complimentary refreshments
                      </li>
                    </ul>
                  </Card>
                </motion.button>

                {/* Online Card */}
                <motion.button
                  onClick={() => setSessionType("online")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="text-left transition-all rounded-3xl cursor-pointer"
                  style={{
                    outline:
                      sessionType === "online"
                        ? "2px solid var(--color-sage)"
                        : "none",
                    outlineOffset: "2px",
                  }}
                >
                  <Card
                    className="p-8 rounded-3xl border-0 h-full"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: "var(--color-sky)" }}
                    >
                      <Video className="w-7 h-7 text-white" />
                    </div>

                    <h3
                      className="text-lg font-normal mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Online Session
                    </h3>
                    <p
                      className="text-sm font-light mb-6 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Connect from anywhere via secure video call. Flexible and
                      convenient for your schedule.
                    </p>

                    <ul
                      className="space-y-2.5 text-sm font-light"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <li className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: "var(--text-muted)" }}
                        />
                        Join from home
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: "var(--text-muted)" }}
                        />
                        HIPAA-compliant video
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: "var(--text-muted)" }}
                        />
                        Same-day appointments
                      </li>
                    </ul>
                  </Card>
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mt-10"
              >
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canContinueStep1}
                  className="h-12 px-10 rounded-2xl text-sm font-light transition-all disabled:opacity-40 border-0 cursor-pointer"
                  style={{
                    backgroundColor: canContinueStep1
                      ? "var(--color-sage)"
                      : "var(--text-light)",
                    color: "white",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2
                className="text-center text-lg font-light mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                Select Date & Time
              </h2>

              <Card
                className="p-8 rounded-3xl border-0 max-w-4xl mx-auto"
                style={{
                  backgroundColor: "var(--bg-card)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <div className="grid md:grid-cols-[400px_1fr] gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon
                        className="w-5 h-5"
                        style={{ color: "var(--color-sage)" }}
                      />
                      <h3
                        className="text-base font-normal"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Choose a Date
                      </h3>
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
                    <h3
                      className="text-base font-normal mb-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Available Times
                    </h3>
                    {!selectedDate ? (
                      <p
                        className="text-sm font-light "
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Please select a date first
                      </p>
                    ) : (
                      <div className="space-y-3 ">
                        {timeSlots.map((time, index) => (
                          <motion.button
                            key={time}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedTime(time)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full p-3 rounded-2xl transition-all text-sm font-light"
                            style={{
                              backgroundColor:
                                selectedTime === time
                                  ? "var(--color-sage)"
                                  : "var(--bg-hover)",
                              color:
                                selectedTime === time
                                  ? "white"
                                  : "var(--text-primary)",
                              boxShadow:
                                selectedTime === time
                                  ? "var(--shadow-sm)"
                                  : "none",
                            }}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex justify-center"
                >
                  <Button
                    onClick={() => setShowVerificationModal(true)}  // Ovdje samo promijeni na setShowVerificationModal(true)
                    disabled={!canContinueStep2}
                    className="h-12 px-10 rounded-2xl text-sm font-light transition-all disabled:opacity-40 border-0 cursor-pointer"
                    style={{
                      backgroundColor: canContinueStep2
                        ? "var(--color-sage)"
                        : "var(--text-light)",
                      color: "white",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {showVerificationModal && (
                    <AnimatePresence>
                      <IdentityVerification
                        isOpen={showVerificationModal}
                        onClose={() => setShowVerificationModal(false)}
                        onVerificationSuccess={() => setStep(3)}
                      />
                    </AnimatePresence>
                  )}
                </motion.div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2
                className="text-center text-lg font-light mb-8 cursor-pointer"
                style={{ color: "var(--text-primary)" }}
              >
                Confirm Your Booking
              </h2>

              <Card
                className="p-8 rounded-3xl border-0 max-w-2xl mx-auto"
                style={{
                  backgroundColor: "var(--bg-card)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                {/* Booking Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8 p-6 rounded-2xl"
                  style={{ backgroundColor: "var(--bg-hover)" }}
                >
                  <h3
                    className="text-base font-normal mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Session Details
                  </h3>
                  <div className="space-y-3 text-sm font-light">
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-secondary)" }}>
                        Type:
                      </span>
                      <span
                        className="capitalize"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {sessionType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-secondary)" }}>
                        Date:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        {selectedDate?.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-secondary)" }}>
                        Time:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        {selectedTime}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Attach Report */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 p-6 rounded-2xl"
                  style={{
                    backgroundColor: "var(--color-peach)",
                    border: "none",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="include-report"
                      checked={includeReport}
                      onCheckedChange={(checked: boolean) =>
                        setIncludeReport(checked as boolean)
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="include-report"
                        className="cursor-pointer"
                      >
                        <p
                          className="text-sm font-normal mb-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Include my insight report
                        </p>
                        <p
                          className="text-xs font-light leading-relaxed"
                          style={{ color: "var(--text-primary)" }}
                        >
                          We'll attach your insight report to this booking so
                          your psychologist can review your responses and start
                          your session with valuable context.
                        </p>
                      </label>
                    </div>
                  </div>
                </motion.div>

                {/* Confirmation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <Button
                    onClick={handleConfirmBooking}
                    className="h-12 px-10 rounded-2xl text-sm font-light cursor-pointer transition-all border-0"
                    style={{
                      backgroundColor: "var(--color-sage)",
                      color: "white",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                  <p
                    className="text-xs font-light mt-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    You'll receive a confirmation SMS with session details
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
