import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch roles from the backend
    axios
      .get("http://localhost:8070/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Delete a role
    axios
      .delete(`http://localhost:8070/roles/${id}`)
      .then(() => {
        setRoles(roles.filter((role) => role._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting role", error);
      });
  };

  return (
    <div>
      <h2>Role List</h2>
      <button>
        <Link to="/add-role">Add Role</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Max Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role._id}>
              <td>{role.name}</td>
              <td>{role.salary}</td>
              <td>{role.maxEmployees}</td>
              <td>
                <button>
                  <Link to={`/edit-role/${role._id}`}>Edit</Link>
                </button>
                <button onClick={() => handleDelete(role._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesPage;
