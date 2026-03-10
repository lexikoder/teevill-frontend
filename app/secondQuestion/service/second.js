
import { errorNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";



export const getQuestion = async (type) => {
    try {
      const { data } = await axiosInstance.get(`/user/questions/?type=${type}`);
      console.log("QUESTION", data);
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