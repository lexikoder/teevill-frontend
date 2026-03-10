import { successNotifier, errorNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";





export const forgotPassword = async (payload, setLoading) => {
  try {
    await axiosInstance.post("/user/forgot-password", payload);
    successNotifier("Check email for new password ");
    setLoading(false)
  } catch (e) {
    if (e?.response) {
      errorNotifier(
        console.log(
          e.response?.data?.message || e.response?.data?.data?.message
        )
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }finally {
    setLoading(false)
  }
};
