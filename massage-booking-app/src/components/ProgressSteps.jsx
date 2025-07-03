import React from "react";

const ProgressSteps = ({ currentStep })=> {
    return (
        <div className="flex space-x-4 mb-4">
            {[1,2,3].map((num) => (
                <div key={num} 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${num <= currentStep ? "bg-green-500" : "bg-gray-300"}`}>
                    {num}
                </div>
            ))}
        </div>
    );
}

export default ProgressSteps;