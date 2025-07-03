// components/ProgressSteps.jsx
import React from "react";

const steps = [
  { number: 1, label: "Service" },
  { number: 2, label: "Date & Time" },
  { number: 3, label: "Confirm" },
];

export default function ProgressSteps({ currentStep }) {
  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((step) => (
        <div key={step.number} className="flex-1 text-center">
          <div
            className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white font-bold ${
              step.number === currentStep
                ? "bg-blue-600"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {step.number}
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            {step.label}
          </p>
        </div>
      ))}
    </div>
  );
}
