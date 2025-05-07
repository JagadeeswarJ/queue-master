import { SYSTEM_TYPES } from "../utils/priorityCalculator";

const SystemSelector = ({ systemType, setSystemType }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">System Type</h2>
      <div className="flex space-x-3">
        <button
          onClick={() => setSystemType(SYSTEM_TYPES.HOSPITAL)}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            systemType === SYSTEM_TYPES.HOSPITAL
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          🏥 Hospital
        </button>
        <button
          onClick={() => setSystemType(SYSTEM_TYPES.RESTAURANT)}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            systemType === SYSTEM_TYPES.RESTAURANT
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          🍽️ Restaurant
        </button>
      </div>
    </div>
  );
};

export default SystemSelector;
