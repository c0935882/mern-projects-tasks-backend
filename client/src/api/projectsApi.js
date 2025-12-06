import apiFetch from "./apiClient.js";

export const getProjects = () => apiFetch("/api/projects");
export const getProject = (id) => apiFetch(`/api/projects/${id}`);
export const createProject = (data) =>
  apiFetch("/api/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateProject = (id, data) =>
  apiFetch(`/api/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
export const deleteProject = (id) =>
  apiFetch(`/api/projects/${id}`, {
    method: "DELETE",
  });
