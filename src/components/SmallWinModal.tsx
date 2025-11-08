import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";
import { ConfettiEffect } from "./ConfettiEffect";

interface SmallWinModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onContinue: () => void;
  showConfetti?: boolean;
}

export function SmallWinModal({
  isOpen,
  title,
  message,
  onContinue,
  showConfetti = true,
}: SmallWinModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {showConfetti && <ConfettiEffect trigger={isOpen} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(180, 180, 180, 0.6)" }}
        onClick={onContinue}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-3xl p-12 max-w-lg w-full text-center relative overflow-hidden shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#c8b6e2" }}
            >
              <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center">
                <CheckCircle2
                  className="w-12 h-12 text-white"
                  strokeWidth={2.5}
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-2xl font-medium text-gray-700"
            >
              {title}
            </motion.h2>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 mb-10 text-base leading-relaxed"
            >
              {message}
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={onContinue}
                className="w-full h-14 rounded-2xl text-lg font-medium transition-all"
                style={{
                  backgroundColor: "#8b7ba8",
                  color: "white",
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Continue
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
