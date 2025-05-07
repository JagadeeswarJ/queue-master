import React from "react";
import { sortProcesses } from "../utils/priorityCalculator";
import ProcessCard from "./ProcessCard";

const ProcessQueue = ({ processes }) => {  // Remove customerName from props
  const sortedProcesses = sortProcesses(processes);

  return (
    <div className="h-full">
      <div className="bg-white p-4 rounded-lg shadow-md h-full">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b">Execution Queue</h2>
        {sortedProcesses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No processes in the queue
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
            {sortedProcesses.map((process) => (
              <ProcessCard
                key={process.id}
                process={process}  {/* Only pass process now */}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessQueue;