import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";

export const createExperince = async (payload) => {
  try {
    const { id, ...rest } = payload; 
    const { data } = await axiosInstance.put(
      `/user/update-question/${id}`,
      rest
    );
    successNotifier("Submitted");
    return data;
  } catch (e) {
    if (e?.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
  }
};
