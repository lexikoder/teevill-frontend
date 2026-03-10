import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";



  export const getSingleClientJobs = async () => {
    try {
      const { data } = await axiosInstance.get("/job");
      console.log("rr", data);
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

export const postJobs = async (payload) => {
  try {
    const { isEdit, jobId, ...rest } = payload;

    let response;

    if (isEdit && jobId) {
      response = await axiosInstance.put(`/job/${jobId}`, rest);
    } else {
      response = await axiosInstance.post("/job", rest);
    }

    successNotifier(isEdit ? "Job updated successfully" : "Job created successfully");
    return response.data;
  } catch (e) {
    if (e?.response) {
      errorNotifier(e.response?.data?.message || e.response?.data?.data?.message);
    } else {
      errorNotifier("Network error, please check your internet connection");
    }
    throw e;
  }
};


 export const deleteJobs = async (id) => {
  try {
    await axiosInstance.delete(`/job/${id}`);

    successNotifier("Job Deleted Successfully");
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

export const closeJob = async (payload) => {
  try {
    await axiosInstance.put(`/job/${id}`, payload);

    successNotifier("Job closed successfully");
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
