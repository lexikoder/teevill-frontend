import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";


export const sendOtp = async (payload, router) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post("/user/verify-otp", payload);
      successNotifier("Email Verifield")
      router()
    } catch (e) {
      // setLoading(false);
      if (e.response) {
        errorNotifier(
          e.response?.data?.message || e.response?.data?.data?.message
        );
      } else {
        errorNotifier("Network Error, please check your internet connections");
        setLoading(false);
      }
    }
  };

  export const sendClientOtp = async (payload) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post("/client/verify-otp", payload);
      successNotifier("Email Verifield")
    } catch (e) {
      // setLoading(false);
      if (e.response) {
        errorNotifier(
          e.response?.data?.message || e.response?.data?.data?.message
        );
      } else {
        errorNotifier("Network Error, please check your internet connections");
        setLoading(false);
      }
    }
  };

  export const resendOTP = async (payload) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post("/user/resend-otp", payload);
      successNotifier("OTP SENT TO YOUR EMAIL")
      // navigateTo(`/complete-profile?email=${email}`);
      return data;
    } catch (e) {
      errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
      console.log(e.response?.data?.message || e.response?.data?.data?.message)
    }
  };