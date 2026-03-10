import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";





export const createClientType = async (payload) => {

   
    try {
      const { data } = await axiosInstance.put(`/client/client-type/${payload?.id}`, payload);
      successNotifier("Submitted");
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
  