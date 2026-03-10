import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";



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

  export const approveProposal = async ({payload,id}) => {
      try {
        const { data } = await axiosInstance.put(`/proposal/${id}`,payload);
    
        successNotifier("Proposal Approved");
        return data;
        window.location.reload()
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






// export const postJobs = async (payload) => {
//   try {
//     const { isEdit, jobId, ...rest } = payload;

//     let response;

//     if (isEdit && jobId) {
//       response = await axiosInstance.put(`/job/${jobId}`, rest);
//     } else {
//       response = await axiosInstance.post(AUTH_ROUTES.POST_JOBS, rest);
//     }

//     successNotifier(isEdit ? "Job updated successfully" : "Job created successfully");
//     return response.data;
//   } catch (e) {
//     if (e?.response) {
//       errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
//     } else {
//       errorNotifier("Network error, please check your internet connection");
//     }
//     throw e;
//   }
// };
//  export const deleteJobs = async (id) => {
//   try {
//     await axiosInstance.delete(AUTH_ROUTES.DELETE_JOBS(id));

//     successNotifier("Job Deleted Successfully");
//   } catch (e) {
//     if (e?.response) {
//       errorNotifier(
//         console.log(
//           e.response?.data?.message || e.response?.data?.data?.message
//         )
//       );
//     } else {
//       errorNotifier("Network Error, please check your internet connections");
//     }
//   }
// };
