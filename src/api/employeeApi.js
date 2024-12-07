import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8070" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Get all employees
export const getEmployees = () => API.get("/employees");

// Create a new employee
export const createEmployee = async (formData) => {
  console.log(formData)
  // const config = {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // };
  return await API.post('/employees/add', formData);
};

// Update an existing employee
export const updateEmployee = async (id, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await API.put(`/employees/${id}`, formData, config);
};

// Delete an employee
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
