import React, { useState, useEffect } from "react";
import { getRoles, createRole, updateRole, deleteRole } from "../api/roleApi"; // Import API methods
import { useNavigate } from "react-router-dom";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    maxEmployees: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all roles when the component mounts
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    try {
      await createRole(formData);
      const response = await getRoles();
      setRoles(response.data);
      setFormData({ name: "", salary: "", maxEmployees: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      await updateRole(currentRoleId, formData);
      const response = await getRoles();
      setRoles(response.data);
      setEditMode(false);
      setFormData({ name: "", salary: "", maxEmployees: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id);
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleEditRole = (role) => {
    setEditMode(true);
    setCurrentRoleId(role._id);
    setFormData({
      name: role.role,
      salary: role.salary,
      maxEmployees: role.maxEmployees,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Role Management
      </h1>

      {/* Add button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditMode(false);
            setFormData({ name: "", salary: "", maxEmployees: "" });
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white p-3 rounded-full text-lg"
        >
          +
        </button>
      </div>

      {/* Modal for creating/updating roles */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Role" : "Create Role"}
            </h2>
            <form onSubmit={editMode ? handleUpdateRole : handleCreateRole}>
              <div className="grid gap-4">
                <div>
                  <label className="block text-gray-700">Role Name</label>
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
                  <label className="block text-gray-700">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Max Employees</label>
                  <input
                    type="number"
                    name="maxEmployees"
                    value={formData.maxEmployees}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
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

      {/* Roles list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role._id} className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{role.role}</h3>
            <p className="text-gray-600">Salary: Rs:{role.salary}</p>
            <p className="text-gray-600">Max Employees: {role.maxEmployees}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEditRole(role)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRole(role._id)}
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

export default RoleManagement;
