import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRolePage = () => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [maxEmployees, setMaxEmployees] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRole = {
      name,
      salary,
      maxEmployees,
    };

    // Add role
    axios
      .post("http://localhost:8070/roles", newRole)
      .then(() => {
        navigate("/roles");
      })
      .catch((error) => {
        console.error("Error adding role", error);
      });
  };

  return (
    <div>
      <h2>Add Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Max Employees</label>
          <input
            type="number"
            value={maxEmployees}
            onChange={(e) => setMaxEmployees(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Role</button>
      </form>
    </div>
  );
};

export default AddRolePage;
