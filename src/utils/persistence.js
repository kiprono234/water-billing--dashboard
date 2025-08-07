export const getStoredBillings = () => {
    try {
      return JSON.parse(localStorage.getItem("billings") || "[]");
    } catch {
      return [];
    }
  };
  
  export const setStoredBillings = (billings) => {
    localStorage.setItem("billings", JSON.stringify(billings));
  };
  
  export const getStoredUsageData = () => {
    try {
      return JSON.parse(localStorage.getItem("usageData") || "[]");
    } catch {
      return [];
    }
  };
  
  export const setStoredUsageData = (usageData) => {
    localStorage.setItem("usageData", JSON.stringify(usageData));
  };
  
  export const getStoredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  };
  
  export const setStoredUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };