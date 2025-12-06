import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

// GET all tasks
export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// CREATE task
export const createTask = async (newTask) => {
  const res = await axios.post(API_URL, newTask);
  return res.data;
};

// DELETE task
export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
