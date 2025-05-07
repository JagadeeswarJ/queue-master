export const SYSTEM_TYPES = {
  HOSPITAL: "hospital",
  RESTAURANT: "restaurant",
};
export const ServiceType = {
  EmergencyCare: "EmergencyCare",
  Scheduled: "Scheduled",
  Diagnostics: "Diagnostics",
  Pharmacy: "Pharmacy",
  DineIn: "DineIn",
  Takeaway: "Takeaway",
  Delivery: "Delivery",
};

export const Priority = {
  Critical: "Critical",
  High: "High",
  Medium: "Medium",
  Low: "Low",
  VIP: "VIP",
  Reservation: "Reservation",
  WalkIn: "WalkIn",
  Online: "Online",
};

export const serviceToStr = (s) => {
  return ServiceType[s] || "Unknown";
};

export const priorityToStr = (p) => {
  return Priority[p] || "Unknown";
};

export const getScore = (s, p) => {
  const serviceScore = {
    [ServiceType.EmergencyCare]: 200,
    [ServiceType.Scheduled]: 100,
    [ServiceType.Diagnostics]: 80,
    [ServiceType.Pharmacy]: 60,
    [ServiceType.DineIn]: 90,
    [ServiceType.Takeaway]: 70,
    [ServiceType.Delivery]: 50,
  };

  const priorityScore = {
    [Priority.Critical]: 150,
    [Priority.High]: 100,
    [Priority.Medium]: 50,
    [Priority.Low]: 25,
    [Priority.VIP]: 120,
    [Priority.Reservation]: 90,
    [Priority.WalkIn]: 60,
    [Priority.Online]: 30,
  };

  return Math.floor(0.7 * serviceScore[s] + 0.3 * priorityScore[p]);
};

export const getServiceOptions = (systemType) => {
  if (systemType === "hospital") {
    return [
      { value: ServiceType.EmergencyCare, label: "Emergency Care" },
      { value: ServiceType.Scheduled, label: "Scheduled" },
      { value: ServiceType.Diagnostics, label: "Diagnostics" },
      { value: ServiceType.Pharmacy, label: "Pharmacy" },
    ];
  } else {
    return [
      { value: ServiceType.DineIn, label: "Dine In" },
      { value: ServiceType.Takeaway, label: "Takeaway" },
      { value: ServiceType.Delivery, label: "Delivery" },
    ];
  }
};

export const getPriorityOptions = (systemType) => {
  if (systemType === SYSTEM_TYPES.HOSPITAL) {
    return [
      { value: Priority.Critical, label: "Critical" },
      { value: Priority.High, label: "High" },
      { value: Priority.Medium, label: "Medium" },
      { value: Priority.Low, label: "Low" },
    ];
  } else {
    return [
      { value: Priority.VIP, label: "VIP" },
      { value: Priority.Reservation, label: "Reservation" },
      { value: Priority.WalkIn, label: "Walk In" },
      { value: Priority.Online, label: "Online" },
    ];
  }
};

export const sortProcesses = (processes) => {
  return [...processes].sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return a.id - b.id;
  });
};
export const getSystemTypeLabel = (systemType) => {
  return systemType === SYSTEM_TYPES.HOSPITAL ? "Hospital" : "Restaurant";
};
