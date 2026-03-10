
import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";




export const createNewProject = async (payload, setLoading, onClose) => {
    try {
      const { data } = await axiosInstance.post(
        AUTH_ROUTES.CREATE_PROJECT,
        payload
      );
  
      successNotifier("Project created successfully");
      setLoading(false);
      onClose()
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

  export const getJobs = async () => {
    try {
      const { data } = await axiosInstance.get("/job");
      console.log("JOBSs", data);
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

  export const deleteProjects = async (id) => {
  try {
    await axiosInstance.delete(AUTH_ROUTES.DELETE_PROJECTS(id));

    successNotifier("Project Deleted Successfully");
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
      const { data } = await axiosInstance.post("/proposal", payload);
  
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