import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployeePage = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    address: "",
    phone: "",
    nic: "",
    role: "",
  });

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available roles from the backend
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles", error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/employees", employeeData);
      navigate("/employees"); // Redirect to the employees list
    } catch (err) {
      setError(err.response?.data?.message || "Error adding employee");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Add New Employee
      </h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-600">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={employeeData.address}
            onChange={handleChange}
            required
            rows="3"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-600">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={employeeData.phone}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="nic" className="block text-gray-600">
            NIC
          </label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={employeeData.nic}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-gray-600">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={employeeData.role}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a role
            </option>
            {roles.map((role) => (
              <option key={role._id} value={role.role}>
                {role.role}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className={`p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="p-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeePage;
