import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8070" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Get all roles
export const getRoles = () => API.get("/roles");

// Create a new role
export const createRole = async (data) => {
  return await API.post("/roles/add", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Update an existing role
export const updateRole = async (id, data) => {
  return await API.put(`/roles/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Delete a role
export const deleteRole = (id) => API.delete(`/roles/${id}`);
