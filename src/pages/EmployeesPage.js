import React, { useEffect, useState } from "react";
import { getEmployees } from "../api/employeeApi";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-pulse h-10 w-10 bg-blue-500 rounded-full"></div>
          <span className="ml-3 text-lg text-gray-700">
            Loading employees...
          </span>
        </div>
      ) : employees.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          No employees found.
        </div>
      ) : (
        <div className="space-y-4">
          {employees.map((employee) => (
            <div key={employee.id} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">
                {employee.name}
              </h3>
              <p className="text-gray-700">Role: {employee.role}</p>
              <p className="text-gray-500">Phone: {employee.phone}</p>
              {/* Add other employee fields here if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
