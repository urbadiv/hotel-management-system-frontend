import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8070", // Ensure this is the correct API URL
});

// Add a request interceptor to attach the token to the headers
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch all employees (GET request)
export const getEmployees = () => API.get("/employees");

// Other API methods (POST, PUT, DELETE) for employees
export const createEmployee = async (employeeData) => {
  return await API.post("/employees/add", employeeData);
};

export const updateEmployee = async (id, employeeData) => {
  return await API.put(`/employees/${id}`, employeeData);
};

export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
