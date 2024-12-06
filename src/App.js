import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import EventList from "./pages/EventList";
import EventManagement from "./pages/EventManagement";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import AdminLayout from "./components/AdminLayout";
import NotFound from "./pages/NotFound"; // A 404 page component
import UserTable from "./pages/UserTable";
import { isAuthenticated, getUserRole } from "./utils/auth";
import RoomManagement from "./pages/RoomManagement";
import EmployeesPage from "./pages/EmployeesPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import RolesPage from "./pages/RolesPage";
import AddRolePage from "./pages/AddRolePage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Admin Route wrapped in AdminLayout */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Routes>
                  <Route path="/event" element={<EventManagement />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/users" element={<UserTable />} />
                  <Route path="/rooms" element={<RoomManagement />} />
                  <Route path="/employees" element={<EmployeesPage />} />
                  <Route path="/add-employee" element={<AddEmployeePage />} />
                  <Route path="/roles" element={<RolesPage />} />
                  <Route path="/add-role" element={<AddRolePage />} />
                  {/* Add other admin-specific routes here */}
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Non-admin routes with Navbar */}
        <Route
          path="/user/*"
          element={
            <div>
              <Navbar />
              <Routes>
                {/* Include any additional non-admin routes here */}
                <Route path="/event" element={<EventList />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          }
        />

        {/* 404 Route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
