import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";

export const changePassword= async (payload)=>{
    try {
        await axiosInstance.post("/user/change-password",payload);
    
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

export const updateProfileImage = async (id, payload) => {
  try {
    await axiosInstance.put(`/user/${id}/profile-picture`, payload, {
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


export const editUser= async ( id, payload)=>{
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

export const deleteAccount= async (payload)=>{
    try {
        await axiosInstance.post("/user/delete-account",payload);
    
        successNotifier("Account Deleted successfully");
      } catch (e) {
        if (e?.response) {
          errorNotifier(
            console.log(
              e.response?.data?.message || e.response?.data?.data?.message || e.response?.data?.message
            )
          );
        } else {
          errorNotifier("Network Error, please check your internet connections");
        }
      }
}


export const updateVisibility= async (payload)=>{
    try {
        await axiosInstance.put( "/user/visibility",payload);
    
        successNotifier("Visibility changed");
      } catch (e) {
        if (e?.response) {
          errorNotifier(
            console.log(
              e.response?.data?.message || e.response?.data?.data?.message || e.response?.data?.message
            )
          );
        } else {
          errorNotifier("Network Error, please check your internet connections");
        }
      }
}


