import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";

 export const getPaymentHistory = async () => {
    try {
      const { data } = await axiosInstance.get("/transaction");
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


  export const getAllWithdrawal = async()=>{
    try{
       const {data} = await axiosInstance.get("/withdrawal");
    return data;
    } catch(e){
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
   
  }

  
  export const requestEarnings = async (payload) => {
      try {
        const { data } = await axiosInstance.post(
         "/withdrawal/wallet",
          payload
        );
    
        successNotifier("Earning Request Sent Successfully");
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


  export const getFreelancerWithdrawal = async (status) => {
    try {
      const { data } = await axiosInstance.get(`/withdrawal/?approvalStatus=${status}`);
      console.log("FREELANCER HISTORY", data);
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
  
