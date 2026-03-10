import { APP_CONSTANTS } from "@/constant/app";

export const  getUserFromToken = () => {
  if (typeof window === "undefined") return null;

  const token = sessionStorage.getItem(APP_CONSTANTS.token);
  const user = sessionStorage.getItem(APP_CONSTANTS.user);

  if (!token || !user) return null;

  try {
    const decoded = jwtDecode(token);
    const isExpired = Date.now() >= decoded.exp * 1000;
    if (isExpired) {
      sessionStorage.clear();
      return null;
    }
    return { ...decoded, ...JSON.parse(user) }; 
  } catch {
    return null;
  }
};
