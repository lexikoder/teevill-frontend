
import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";



export const getSingleClientQuestion = async (type) => {
    try {
      const { data } = await axiosInstance.get(`/client/questions/single-agency/?type=${type}`);
      console.log("SINGLE CLIENT QUESTIONs", data);
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

  
export const getClientQuestion = async (type) => {
    try {
      const { data } = await axiosInstance.get(`/client/questions/single-agency/?type=${type}`);
      console.log("SINGLE CLIENT QUESTIONs", data);
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


  export const sendClientSecondQuestions = async (payload) => {
  
     
      try {
        const { data } = await axiosInstance.put(`/client/update-question/${payload.id}`, payload);
        successNotifier("Submitted Successfully");
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