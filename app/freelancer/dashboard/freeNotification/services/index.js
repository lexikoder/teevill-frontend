
import { errorNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";




  export const getFreelancerNotification = async () => {
    try {
      const { data } = await axiosInstance.get("/notification");
      console.log("freelancer notification", data);
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
