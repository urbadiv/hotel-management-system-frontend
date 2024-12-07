import React, { useState, useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi"; // Import API methods
import { getRoles } from "../api/roleApi.js"; // Import role fetching API
import { useNavigate } from "react-router-dom";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    nic: "",
    role: "",
    salary: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all employees and roles when component mounts
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchEmployees();
    fetchRoles();
  }, []);

  useEffect(() => {
    // Automatically set salary when role changes
    if (formData.role) {
      const selectedRole = roles.find((role) => role._id === formData.role);
      if (selectedRole) {
        setFormData((prevData) => ({
          ...prevData,
          salary: selectedRole.salary,
        }));
      }
    }
  }, [formData.role, roles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.address ||
      !formData.phone ||
      !formData.nic ||
      !formData.role ||
      !formData.salary
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      // Prepare data for submission
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("nic", formData.nic);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("salary", formData.salary);

      // Call the API to create an employee
      await createEmployee(formDataToSend);

      // Fetch updated employee list
      const response = await getEmployees();
      setEmployees(response.data);

      // Reset form data and close the modal
      setFormData({
        name: "",
        address: "",
        phone: "",
        nic: "",
        role: "",
        salary: "",
      });
      setIsModalOpen(false);

      alert("Employee created successfully!");
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Failed to create employee.");
    }
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(currentEmployeeId, formData);
      const response = await getEmployees();
      setEmployees(response.data);
      setEditMode(false);
      setFormData({
        name: "",
        address: "",
        phone: "",
        nic: "",
        role: "",
        salary: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditMode(true);
    setCurrentEmployeeId(employee._id);
    setFormData({
      name: employee.name,
      address: employee.address,
      phone: employee.phone,
      nic: employee.nic,
      role: employee.role, // Assuming role is an object with _id
      salary: employee.salary,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Employee Management
      </h1>

      {/* Add button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditMode(false);
            setFormData({
              name: "",
              address: "",
              phone: "",
              nic: "",
              role: "",
              salary: "",
            });
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white p-3 rounded-full text-lg"
        >
          +
        </button>
      </div>

      {/* Modal for creating/updating employee */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Employee" : "Create Employee"}
            </h2>
            <form
              onSubmit={editMode ? handleUpdateEmployee : handleCreateEmployee}
            >
              <div className="grid gap-4">
                <div>
                  <label className="block text-gray-700">Employee Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">NIC</label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  {editMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employees list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div key={employee._id} className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{employee.name}</h3>
            <p className="text-gray-600">Address: {employee.address}</p>
            <p className="text-gray-600">Phone: {employee.phone}</p>
            <p className="text-gray-600">NIC: {employee.nic}</p>
            <p className="text-gray-600">Role: {employee.role.role}</p>
            <p className="text-gray-600">Salary: Rs: {employee.salary}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEditEmployee(employee)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEmployee(employee._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
