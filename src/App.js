import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventList from "./pages/EventList";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeesPage from "./pages/EmployeesPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import RolesPage from "./pages/RolesPage";
import AddRolePage from "./pages/AddRolePage";
import { isAuthenticated, getUserRole } from "./utils/auth";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/add-employee" element={<AddEmployeePage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/add-role" element={<AddRolePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
