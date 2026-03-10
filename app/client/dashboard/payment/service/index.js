import { errorNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";




export const getPaymentHistory = async (status) => {
    try {
      const { data } = await axiosInstance.get(`/withdrawal/client/?approvalStatus=${status}`);
      console.log("PAYMENT HISTORY", data);
      return data;
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
    }
  };

  export const getEscrow = async () => {
    try {
      const { data } = await axiosInstance.get("/transaction/escrow");
      console.log("ESCROW", data);
      return data;
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
    }
  };