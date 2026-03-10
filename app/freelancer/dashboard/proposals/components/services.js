import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";

 export const getProposals = async () => {
    try {
      const { data } = await axiosInstance.get("/proposal");
      console.log("PROPOSAL", data);
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

  export const createNewProposal = async (payload, setLoading) => {
    try {
      const { data } = await axiosInstance.post("/proposal",payload);
  
      successNotifier("Proposal sent successfully");
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
    } finally {
      setLoading(false);
    }
  };


    export const getClientProposal = async () => {
      try {
        const { data } = await axiosInstance.get("/proposal/client");
        console.log("CLIENT PROPOSAL", data);
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
  