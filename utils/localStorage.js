import { APP_CONSTANTS } from "@/constant/app";

// ✅ Save object or array
export const setLocalStorageItem = (key, data) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }
};

// ✅ Save plain string
export const setLocalStorageString = (key, data) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, data);
    } catch (error) {
      console.error(`Error saving string ${key} to localStorage:`, error);
    }
  }
};

// ✅ Get parsed JSON
export const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    try {
      const storedItem = localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : null;
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error);
      return null;
    }
  }
  return null;
};

// ✅ Get string
export const getLocalStorageString = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || null;
  }
  return null;
};

// ✅ Remove single item
export const removeLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// ✅ Clear everything
export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

// ✅ Remove all important keys (example: token)
export const removeAllStorageItems = () => {
  removeLocalStorageItem(APP_CONSTANTS.token);
};
