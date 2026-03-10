"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { getUserDetails } from "./getLoggedInVendor";
import { getLocalStorageString, setLocalStorageItem, setLocalStorageString } from "@/utils/localStorage";
import { APP_CONSTANTS } from "@/constant/app";

export const GlobalStateContext = createContext(null);

export const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getLocalStorageString(APP_CONSTANTS.token);

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        await getUserDetails(setUser);
      } catch (e) {
        setLocalStorageString(APP_CONSTANTS.token, "");
        setLocalStorageItem(APP_CONSTANTS.user, null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <GlobalStateContext.Provider value={{ user, setUser, loading }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
