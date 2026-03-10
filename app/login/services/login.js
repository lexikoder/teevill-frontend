import axiosInstance from "@/service/api";
import { successNotifier, errorNotifier } from "@/components/notifier";
import { APP_CONSTANTS } from "@/constant/app";
import { setLocalStorageItem, setLocalStorageString } from "@/utils/localStorage";

export const login = async (payload, setLoading, router, setUser) => {
  setLoading(true);
  try {
    const { data: { data } } = await axiosInstance.post("/user/login", payload);

    // Save token & user in localStorage
    setLocalStorageString(APP_CONSTANTS.token, data?.token);
    setLocalStorageItem(APP_CONSTANTS.user, data);

    setUser(data?.user);
    successNotifier("Login successful!");

    // Redirect based on account type
    const redirectMap = {
      freelancer: "/freelancer/dashboard",
      client: "/client/dashboard",
      admin: "/admin/dashboard",
    };
    router.push(redirectMap[data?.user?.accountType] || "/");
  } catch (error) {
    errorNotifier(error.response?.data?.message || error.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
