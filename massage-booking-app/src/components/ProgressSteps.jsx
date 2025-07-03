// components/ProgressSteps.jsx
import React from "react";
import { FaSpa, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
  { number: 1, label: "Service", icon: <FaSpa /> },
  { number: 2, label: "Date & Time", icon: <FaCalendarAlt /> },
  { number: 3, label: "Confirm", icon: <FaCheckCircle /> },
];

export default function ProgressSteps({ currentStep }) {
  return (
    <div className="flex justify-between items-center mb-8 relative">
      {steps.map((step, index) => (
        <div key={step.number} className="flex-1 text-center relative z-10">
          <div
            className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl font-bold border-4 ${
              step.number === currentStep
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {step.icon}
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            {step.label}
          </p>

          {/* Draw connector line if not last step */}
          {index < steps.length - 1 && (
            <div className="absolute top-6 left-1/2 w-full h-1 bg-gray-300 z-[-1] translate-x-6"></div>
          )}
        </div>
      ))}
    </div>
  );
}
