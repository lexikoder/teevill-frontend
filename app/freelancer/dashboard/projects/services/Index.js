import { errorNotifier, successNotifier } from "@/components/notifier";
import axiosInstance from "@/service/api";



export const createNewProject = async (payload) => {
  try {
    const { isEdit, projectId, ...rest } = payload;

    let response;

    if (isEdit && projectId) {
      response = await axiosInstance.put(`/project/${projectId}`, rest);
    } else {
      response = await axiosInstance.post("/project", rest);
    }

    successNotifier(
      isEdit ? "Project updated successfully" : "Project created successfully"
    );
    return response.data;
  } catch (e) {
    if (e?.response) {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    } else {
      errorNotifier("Network error, please check your internet connection");
    }
    throw e;
  }
};

export const getProjects = async () => {
  try {
    const { data } = await axiosInstance.get("/project");
    console.log("PROJECTZ", data);
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

export const getProjectsCollaboartors = async (projectId) => {
  try {
    const { data } = await axiosInstance.get(
     `project/collaborators/${projectId}`
    );
    console.log("COLLABORATORS", data);
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





export const getSpecificProject = async (Id) => {
  try {
    const { data } = await axiosInstance.get(
      `/project/${Id}`
    );
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
    await axiosInstance.delete(`/project/${id}`);

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



export const shareProject = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/project/invite",
      payload
    );

    successNotifier("Project shared successfully");
    window.location.reload();
    return data;
  } catch (e) {
    if (e?.response) {
      errorNotifier(
        console.log(
          e.response?.data?.message || e.response?.data?.data?.message
        )
      );
    }
  } finally {
    setLoading(false);
  }
};

export const createNewSection = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/section",
      payload
    );

    successNotifier("Section created successfully");
    window.location.reload();
    
    return data;

  } catch (e) {
    if (e?.response) {
      errorNotifier(
        console.log(
          e.response?.data?.message || e.response?.data?.data?.message
        )
      );
    }
  } finally {
    setLoading(false);
  }
};

export const getTask = async (sectionId) => {
  try {
    const { data } = await axiosInstance.get(`/tasks/?sectionId=${sectionId}`);
    console.log("TASKS", data);
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

export const getCollaborators = async (sectionId) => {
  try {
    const { data } = await axiosInstance.get(
      `project/collaborators/${sectionId}`
    );
    console.log("TASKS", data);
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

export const createNewTask = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/tasks", payload);

    successNotifier("Task created successfully");
    window.location.reload(); 
    return data;
  } catch (e) {
    if (e?.response) {
      errorNotifier(
        console.log(
          e.response?.data?.message || e.response?.data?.data?.message
        )
      );
    }
  } finally {
    setLoading(false);
  }
};

export const deleteTask = async (id) => {
  try {
    await axiosInstance.delete(`/tasks/${id}`);

    successNotifier("Task Deleted Successfully");
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


export const deleteSection = async (id) => {
  try {
    await axiosInstance.delete(`/section/${id}`);

    successNotifier("Section Deleted Successfully");
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
