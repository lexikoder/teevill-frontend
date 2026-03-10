import axiosInstance from "@/service/api";
import { errorNotifier } from "@/components/notifier";
import { APP_CONSTANTS } from "@/constant/app";
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from "@/utils/localStorage";

// export const getUserDetails = async (setUser) => {
//   try {
//     const cachedUser = getLocalStorageItem(APP_CONSTANTS.user);
//     if (cachedUser) {
//       setUser?.(cachedUser);
//       return cachedUser;
//     }

//     const { data: { data } } = await axiosInstance.get("/user/logged-in");
//     setLocalStorageItem(APP_CONSTANTS.user, data);
//     setUser?.(data);
//     return data;
//   } catch (e) {
//     if (e?.response?.status === 401) {
//       removeLocalStorageItem(APP_CONSTANTS.token);
//       removeLocalStorageItem(APP_CONSTANTS.user);
//       window.location.href = "/login";
//     } else {
//       errorNotifier(e.response?.data?.message || "Network error, please check your connection");
//     }
//   }
// };


// export const getUserDetails = async (setUser) => {
//     try {
//       const {
//         data: { data },
//       } = await axiosInstance.get("user/logged-in");
//       setUser(data);
//       console.log("USER DATA", data);
//       return data;
//     } catch (e) {
//       if (e?.response) {
//         errorNotifier(
//           console.log(
//             e.response?.data?.message || e.response?.data?.data?.message
//           )
//         );
//       } else {
//         errorNotifier("Network Error, please check your internet connections");
//       }
//     }
//   };


export const getUserDetails = async (setUser) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/user/logged-in");

    if (data) {
      setUser(data); // update global state
      console.log("USER DATA", data);
    }

    return data;
  } catch (e) {
    if (e?.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message || "Error fetching user details"
      );
    } else {
      errorNotifier("Network Error, please check your internet connection");
    }
    return null;
  }
};
