import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
  Building2,
  Video,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar as CalendarIcon,
} from "lucide-react";
import { ConfettiEffect } from "./ConfettiEffect";

interface BookingFlowProps {
  onComplete: () => void;
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
    <div className="min-h-screen bg-[#f5f0eb] p-6">
      <ConfettiEffect trigger={showConfetti} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-4">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl font-medium text-gray-800 mb-3">
              Book Your Real Session
            </h1>
            <p className="text-sm text-gray-500 mb-8">
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
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step >= i
                        ? "bg-[#8b7ba8] text-white shadow-md"
                        : "bg-white border-2 border-gray-300 text-gray-400"
                    }`}
                  >
                    <span className="font-medium">{i}</span>
                  </motion.div>
                  {i < 3 && (
                    <div className="relative w-20 h-0.5">
                      <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: step > i ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-[#8b7ba8] rounded-full"
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
              <h2 className="text-center text-lg font-medium text-gray-700 mb-8">
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
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left transition-all rounded-3xl ${
                    sessionType === "in-person" ? "ring-2 ring-[#8b7ba8]" : ""
                  }`}
                >
                  <Card className="p-8 rounded-3xl border border-gray-200 bg-white shadow-lg h-full">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: "#c8b6e2" }}
                    >
                      <Building2 className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      In-Person at Clinic
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      Visit our comfortable, private office space. Perfect for
                      those who prefer face-to-face interaction.
                    </p>

                    <ul className="space-y-2.5 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                        Cozy, private environment
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                        Free parking available
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
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
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left transition-all rounded-3xl ${
                    sessionType === "online" ? "ring-2 ring-[#8b7ba8]" : ""
                  }`}
                >
                  <Card className="p-8 rounded-3xl border border-gray-200 bg-white shadow-lg h-full">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: "#a8d5f7" }}
                    >
                      <Video className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Online Session
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      Connect from anywhere via secure video call. Flexible and
                      convenient for your schedule.
                    </p>

                    <ul className="space-y-2.5 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                        Join from home
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
                        HIPAA-compliant video
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gray-400" />
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
                  className="h-12 px-10 rounded-2xl text-sm font-medium transition-all disabled:opacity-40 shadow-md"
                  style={{
                    backgroundColor: canContinueStep1 ? "#8b7ba8" : "#d1d5db",
                    color: "white",
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
              <h2 className="text-center text-lg font-medium text-gray-700 mb-8">
                Select Date & Time
              </h2>

              <Card className="p-8 rounded-3xl border border-gray-200 bg-white shadow-lg max-w-4xl mx-auto">
                <div className="grid md:grid-cols-[400px_1fr] gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="w-5 h-5 text-[#8b7ba8]" />
                      <h3 className="text-base font-medium text-gray-700">
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
                    <h3 className="text-base font-medium text-gray-700 mb-4">
                      Available Times
                    </h3>
                    {!selectedDate ? (
                      <p className="text-sm text-gray-500">
                        Please select a date first
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {timeSlots.map((time, index) => (
                          <motion.button
                            key={time}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedTime(time)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-3 rounded-2xl transition-all text-sm font-medium ${
                              selectedTime === time
                                ? "bg-[#8b7ba8] text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
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
                    onClick={() => setStep(3)}
                    disabled={!canContinueStep2}
                    className="h-12 px-10 rounded-2xl text-sm font-medium transition-all disabled:opacity-40 shadow-md"
                    style={{
                      backgroundColor: canContinueStep2 ? "#8b7ba8" : "#d1d5db",
                      color: "white",
                    }}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
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
              <h2 className="text-center text-lg font-medium text-gray-700 mb-8">
                Confirm Your Booking
              </h2>

              <Card className="p-8 rounded-3xl border border-gray-200 bg-white shadow-lg max-w-2xl mx-auto">
                {/* Booking Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8 p-6 rounded-2xl bg-gray-50"
                >
                  <h3 className="text-base font-medium text-gray-700 mb-4">
                    Session Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-700 capitalize">
                        {sessionType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="text-gray-700">
                        {selectedDate?.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="text-gray-700">{selectedTime}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Attach Report */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 p-6 rounded-2xl border-2 border-gray-200"
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
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Include my insight report
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
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
                    className="h-12 px-10 rounded-2xl text-sm font-medium transition-all shadow-md"
                    style={{
                      backgroundColor: "#8b7ba8",
                      color: "white",
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                  <p className="text-xs text-gray-500 mt-4">
                    You'll receive a confirmation email with session details
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
