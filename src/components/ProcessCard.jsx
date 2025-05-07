import React from "react";
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

const ProcessCard = ({ process }) => {  // Remove customerName from props
    const priority = priorityToStr(process.priority);
    const priorityClass = priorityColors[priority] || "bg-gray-100";
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">
              {process.customerName}-{process.id}  {/* Use process.customerName */}
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