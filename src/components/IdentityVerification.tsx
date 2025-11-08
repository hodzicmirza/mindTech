import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

interface IdentityVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationSuccess: () => void;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export function IdentityVerification({ 
  isOpen, 
  onClose, 
  onVerificationSuccess 
}: IdentityVerificationProps) {
  const [verificationStep, setVerificationStep] = useState(1); // 1: identification, 2: verification
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode] = useState("123456"); // Hardcoded code

  // Function to change step
  const handleContinueToVerification = () => {
    if (userInfo.firstName && userInfo.lastName && userInfo.phoneNumber) {
      setVerificationStep(2);
      // In a real application, SMS would be sent here
      console.log(`Sending SMS to ${userInfo.phoneNumber} with code: ${generatedCode}`);
    }
  };

  // Verification function
  const handleVerifyCode = () => {
    if (verificationCode === generatedCode) {
      // Successful verification
      onVerificationSuccess();
      handleClose();
    } else {
      alert("Incorrect verification code. Please try again.");
    }
  };

  // Close and reset function
  const handleClose = () => {
    setVerificationStep(1);
    setUserInfo({ firstName: "", lastName: "", phoneNumber: "" });
    setVerificationCode("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gloss-white bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {verificationStep === 1 ? "Identification" : "Verification Code"}
            </h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {verificationStep === 1 ? (
            /* Step 1: Identification */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={userInfo.lastName}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={userInfo.phoneNumber}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 234 567 890"
                />
              </div>

              <button
                onClick={handleContinueToVerification}
                disabled={!userInfo.firstName || !userInfo.lastName || !userInfo.phoneNumber}
                className="w-full py-3 bg-blue-600 text-white rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Send Verification Code
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ) : (
            /* Step 2: Verification Code */
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  We sent an SMS verification code to:
                </p>
                <p className="font-semibold text-gray-900">{userInfo.phoneNumber}</p>
                <p className="text-sm text-gray-500 mt-4">
                  Enter the 6-digit code you received
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code *
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your verification code code"
                  maxLength={6}
                />
                
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setVerificationStep(1)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button
                  onClick={handleVerifyCode}
                  disabled={verificationCode.length !== 6}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}