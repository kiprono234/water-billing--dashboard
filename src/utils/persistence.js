export const getStoredBillings = () => {
    return JSON.parse(localStorage.getItem("billings") || "[]");
  };
  
  export const setStoredBillings = (billings) => {
    localStorage.setItem("billings", JSON.stringify(billings));
  };
  
  export const getStoredUsageData = () => {
    return JSON.parse(localStorage.getItem("usageData") || "[]");
  };
  
  export const setStoredUsageData = (usageData) => {
    localStorage.setItem("usageData", JSON.stringify(usageData));
  };
  
  export const getStoredUsers = () => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  };
  
  export const setStoredUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };