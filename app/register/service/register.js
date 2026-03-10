import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";
import { APP_CONSTANTS } from "@/constant/app";
import { setLocalStorageItem } from "@/utils/localStorage";

// export const registerFreelancer = async (payload, setLoading, email, router) => {
//   try {
//     setLoading(true);
//     const { data: { data } } = await axiosInstance.post("/user", payload);
//     const userData = { ...data, accountType: "freelancer" };

//     // Save the full user object in localStorage
//     setLocalStorageItem(APP_CONSTANTS.user, userData);

//     successNotifier("Freelancer Created Successfully");
//     router.push(`/verify-code/${encodeURIComponent(email)}`);
//   } catch (e) {
//     if (e.response) {
//       errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
//     } else {
//       errorNotifier("Network Error, please check your internet connections");
//     }
//   } finally {
//     setLoading(false);
//   }
// };
export const registerFreelancer = async (payload, setLoading, email, router) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post("/user", payload);
      setLoading(false);
      console.log(data,"ygyg")
      setLocalStorageItem(APP_CONSTANTS.accountType, data)
      successNotifier("Freelancer Created Successfully")
      router.push(`/verify-code/${encodeURIComponent(email)}`);
    } catch (e) {
      setLoading(false);
      if (e.response) {
        errorNotifier(
          e.response?.data?.message || e.response?.data?.data?.message
        );
      } else {
        errorNotifier("Network Error, please check your internet connections");
      }
    }
  };


  export const registerClient = async (payload, setLoading, email, router) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post("/client", payload);
      setLoading(false);
      console.log(data)
      setLocalStorageItem(APP_CONSTANTS.accountType, data)
      successNotifier("Client Created Successfully")
     router.push(`/verify-code/${encodeURIComponent(email)}`);
      // window.location.replace("/verify-code")

    } catch (e) {
      setLoading(false);
      if (e.response) {
        errorNotifier(
          e.response?.data?.message || e.response?.data?.data?.message
        );
      } else {
        errorNotifier("Network Error, please check your internet connections");
      }
    }
  };
  





// // REGISTER CLIENT
// export const registerClient = async (payload, setLoading, email, router) => {
//   try {
//     setLoading(true);
//     const { data: { data } } = await axiosInstance.post("/client", payload);

//     // Add accountType
//     const userData = { ...data, accountType: "client" };

//     // Save the full user object in localStorage
//     setLocalStorageItem(APP_CONSTANTS.user, userData);

//     successNotifier("Client Created Successfully");
//     router.push(`/verify-code/${encodeURIComponent(email)}`);
//   } catch (e) {
//     if (e.response) {
//       errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
//     } else {
//       errorNotifier("Network Error, please check your internet connections");
//     }
//   } finally {
//     setLoading(false);
//   }
// };
