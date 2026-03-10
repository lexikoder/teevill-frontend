import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";


export const changeClientPassword= async (payload)=>{
    try {
        await axiosInstance.post("/client/change-password",payload);
    
        successNotifier("Password updated successfully");
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
}

export const updateProfileImage = async (vendorId, payload) => {
  try {
    await axiosInstance.put(AUTH_ROUTES.UPDATE_IMAGE(vendorId), payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    successNotifier("Image updated successfully");
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


export const editUser= async (payload, id)=>{
    try {
        await axiosInstance.put(`/user/edit-profile/${id}`, payload);
    
        successNotifier("User updated successfully");
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
}

