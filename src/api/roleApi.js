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
export const createRole = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Assuming it's a JSON request body
    },
  };
  return await API.post("/roles/add", formData, config);
};

// Update an existing role
export const updateRole = async (id, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Assuming it's a JSON request body
    },
  };
  return await API.put(`/roles/${id}`, formData, config);
};

// Delete a role
export const deleteRole = (id) => API.delete(`/roles/${id}`);
