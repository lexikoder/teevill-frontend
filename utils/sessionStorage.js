// src/utils/sessionStorage.js

/**
 * Save an item to sessionStorage.
 * If it's an object/array, it will be stringified automatically.
 */
export const setSessionStorageItem = (key, value) => {
  try {
    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);
    sessionStorage.setItem(key, stringValue);
  } catch (error) {
    console.error("Error saving to sessionStorage:", error);
  }
};

/**
 * Retrieve an item from sessionStorage.
 * If it's JSON, it will be parsed back to an object automatically.
 */
export const getSessionStorageItem = (key) => {
  try {
    const item = sessionStorage.getItem(key);
    if (!item) return null;

    // Try parsing as JSON
    try {
      return JSON.parse(item);
    } catch {
      return item; // Return raw string if not JSON
    }
  } catch (error) {
    console.error("Error reading from sessionStorage:", error);
    return null;
  }
};

/**
 * Remove a specific item from sessionStorage.
 */
export const removeSessionStorageItem = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from sessionStorage:", error);
  }
};

/**
 * Clear all items from sessionStorage.
 */
export const clearSessionStorage = () => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error("Error clearing sessionStorage:", error);
  }
};
