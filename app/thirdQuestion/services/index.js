import { errorNotifier, successNotifier } from "@/components/notifier";
import { axiosInstanceMultipart } from "@/service/api";

export const uploadPicture = async (id, payload) => {
  try {
    const { data } = await axiosInstanceMultipart.put(
      `/user/${id}/profile-picture`,
      payload
    );
    successNotifier("Picture Submitted");
    return data;
  } catch (e) {
    if (e?.response) {
      const errorMessage =
        e.response?.data?.message || e.response?.data?.data?.message;
      errorNotifier(errorMessage);
    } else {
      errorNotifier("Network Error, please check your internet connections");
    }
    throw e; // rethrow so React Query (or caller) knows it failed
  }
};
