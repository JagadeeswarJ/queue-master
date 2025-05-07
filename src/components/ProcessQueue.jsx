import React from "react";
import ProcessCard from "./ProcessCard";
import { sortProcesses, getSystemTypeLabel } from "../utils/priorityCalculator";

const ProcessQueue = ({ processes, removeProcess, systemType, clearQueue }) => {
  const sortedProcesses = sortProcesses(processes);

  return (
    <div className="h-full">
      <div className="bg-white p-4 rounded-xl shadow-md h-full flex flex-col">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <h2 className="text-xl font-bold">
            {getSystemTypeLabel(systemType)} Queue
          </h2>
          {sortedProcesses.length > 0 && (
            <button
              onClick={clearQueue}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
              title="Clear entire queue"
            >
              Clear Queue
            </button>
          )}
        </div>
        
        {sortedProcesses.length === 0 ? (
          <div className="text-center py-8 text-gray-500 flex-grow">
            No processes in the queue
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-250px)] pr-2 flex-grow">
            {sortedProcesses.map((process) => (
              <ProcessCard
                key={process.id}
                process={process}
                onRemove={() => removeProcess(process.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessQueue;