import React, { useState } from "react";
import SystemSelector from "./components/SystemSelector";
import ProcessForm from "./components/ProcessForm";
import ProcessQueue from "./components/ProcessQueue";

function App() {
  const [systemType, setSystemType] = useState("hospital");
  const [customerName, setCustomerName] = useState("");
  const [processes, setProcesses] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addProcess = (process) => {
    const newProcess = {
      id: nextId,
      customerName: customerName, // Store the current customer name with the process
      ...process,
    };
    setProcesses([...processes, newProcess]);
    setNextId(nextId + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Priority Queue Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
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

          {/* Right Column - Queue */}
          <div className="lg:col-span-1">
            <ProcessQueue processes={processes} />{" "}
            {/* Remove customerName prop */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
