export const STORAGE_KEY = "priorityQueueData";

export const loadQueueData = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (e) {
    console.error("Failed to load from localStorage", e);
  }
  return {
    processes: {
      hospital: [],
      restaurant: [],
    },
    nextId: 1,
  };
};

export const saveQueueData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
    // Handle storage full error if needed
    if (e.name === "QuotaExceededError") {
      alert("Storage is full. Please clear some space.");
    }
  }
};

// Migration function for future updates
export const migrateData = (oldData) => {
  // Add any data migration logic here if storage format changes
  return oldData;
};
