import React, { useState } from "react";
import { serviceToStr, priorityToStr } from "../utils/priorityCalculator";

const priorityColors = {
  Critical: "bg-red-100 border-red-500 text-red-800",
  High: "bg-orange-100 border-orange-500 text-orange-800",
  Medium: "bg-yellow-100 border-yellow-500 text-yellow-800",
  Low: "bg-green-100 border-green-500 text-green-800",
  VIP: "bg-purple-100 border-purple-500 text-purple-800",
  Reservation: "bg-blue-100 border-blue-500 text-blue-800",
  WalkIn: "bg-cyan-100 border-cyan-500 text-cyan-800",
  Online: "bg-gray-100 border-gray-500 text-gray-800",
};

const ProcessCard = ({ process, onRemove }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const priority = priorityToStr(process.priority);
  const priorityClass = priorityColors[priority] || "bg-gray-100";

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    if (isConfirming) {
      onRemove();
    } else {
      setIsConfirming(true);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setIsConfirming(false), 3000);
    }
  };

  const handleCancelRemove = (e) => {
    e.stopPropagation();
    setIsConfirming(false);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 border-blue-500 hover:shadow-lg transition-all relative ${
        isHovering ? "ring-2 ring-blue-200" : ""
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isConfirming ? (
        <div className="absolute top-2 right-2 flex gap-2 bg-white p-1 rounded shadow-sm">
          <button
            onClick={handleRemoveClick}
            className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title="Confirm removal"
          >
            Confirm
          </button>
          <button
            onClick={handleCancelRemove}
            className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            title="Cancel"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleRemoveClick}
          className={`absolute top-2 right-2 p-1 rounded-full transition-all ${
            isHovering 
              ? "bg-red-100 text-red-500 hover:bg-red-200" 
              : "text-gray-400 hover:text-red-500"
          }`}
          title="Remove from queue"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      <div className="flex justify-between items-start pr-6">
        <div>
          <h3 className="font-bold text-lg">
            {process.customerName}-{process.id}
          </h3>
          <p className="text-gray-600">{serviceToStr(process.service)}</p>
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${priorityClass}`}>
          {priority}
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="text-sm text-gray-500">Score</div>
        <div className="text-xl font-bold text-blue-600">{process.score}</div>
      </div>
    </div>
  );
};

export default ProcessCard;

