import { errorNotifier, successNotifier } from "@/components/notifier";
import { axiosInstanceMultipart } from "@/service/api";




  export const sendClientBio = async (payload) => {
  
     
      try {
        const { data } = await axiosInstanceMultipart.put(`/client/update-question/${payload.id}`, payload);
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


    
    export const uploadSingleClientPicture = async (id, payload) => {
    
       
        try {
          const { data } = await axiosInstanceMultipart.put(`/client/${id}/profile-picture`, payload);
          successNotifier("Picture Submitted");
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
      