import SystemSelector from "./components/SystemSelector";
import ProcessForm from "./components/ProcessForm";
import ProcessQueue from "./components/ProcessQueue";
import React, { useState, useEffect } from "react";
import { SYSTEM_TYPES } from "./utils/priorityCalculator";

// Storage helper functions
const loadFromStorage = () => {
  try {
    const savedData = localStorage.getItem("priorityQueueData");
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (e) {
    console.error("Failed to load from localStorage", e);
  }
  return {
    processes: {
      [SYSTEM_TYPES.HOSPITAL]: [],
      [SYSTEM_TYPES.RESTAURANT]: [],
    },
    nextId: 1,
  };
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem("priorityQueueData", JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};

function App() {
  const [systemType, setSystemType] = useState(SYSTEM_TYPES.HOSPITAL);
  const [customerName, setCustomerName] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [state, setState] = useState({
    processes: {
      [SYSTEM_TYPES.HOSPITAL]: [],
      [SYSTEM_TYPES.RESTAURANT]: [],
    },
    nextId: 1,
  });

  // Load from localStorage on initial render
  useEffect(() => {
    const savedData = loadFromStorage();
    setState(savedData);
    setDataLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (dataLoaded) {
      saveToStorage(state);
    }
  }, [state, dataLoaded]);

  const addProcess = (process) => {
    setState((prev) => {
      const newProcess = {
        id: prev.nextId,
        customerName,
        ...process,
      };

      return {
        processes: {
          ...prev.processes,
          [systemType]: [...prev.processes[systemType], newProcess],
        },
        nextId: prev.nextId + 1,
      };
    });
  };

  const removeProcess = (id) => {
    setState((prev) => ({
      ...prev,
      processes: {
        ...prev.processes,
        [systemType]: prev.processes[systemType].filter(
          (process) => process.id !== id
        ),
      },
    }));
  };

  // Move clearQueue inside the App component
  const clearQueue = () => {
    if (
      window.confirm(
        `Are you sure you want to clear the entire ${systemType} queue?`
      )
    ) {
      setState((prev) => ({
        ...prev,
        processes: {
          ...prev.processes,
          [systemType]: [],
        },
      }));
    }
  };

  if (!dataLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Priority Queue Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SystemSelector
              systemType={systemType}
              setSystemType={setSystemType}
            />
            <ProcessForm
              systemType={systemType}
              customerName={customerName}
              setCustomerName={setCustomerName}
              addProcess={addProcess}
            />
          </div>

          <div className="lg:col-span-1">
            <ProcessQueue
              processes={state.processes[systemType]}
              removeProcess={removeProcess}
              systemType={systemType}
              clearQueue={clearQueue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
