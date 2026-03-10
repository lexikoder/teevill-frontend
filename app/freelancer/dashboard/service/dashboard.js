import { errorNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";


export const getFreelancerCard = async () => {
    try {
      const { data } = await axiosInstance.get("/dashboard/freelancer-cards");
      console.log("FREELANCERS DATA", data);
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


  export const getJobs = async () => {
    try {
      const { data } = await axiosInstance.get("/job");
      console.log("JOBSs", data);
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