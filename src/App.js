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
import MenuManagement from "./pages/MenuManagement";
import Booking from './pages/Booking'
import SingleBooking from './pages/SingleBooking';
import MyBookings from './pages/UserBookings'

import EmployeeManagement from "./pages/EmployeeManagement";
import RolesManagement from "./pages/RolesManagement";

import AddProduct from "./components/InventoryManagement/AddProduct";
import AllProducts from "./components/InventoryManagement/AllProducts";
import EditProduct from "./components/InventoryManagement/EditProduct";
import AddDamageItems from "./components/InventoryManagement/AddDamageItems";
import DamageItemList from "./components/InventoryManagement/DamagedItemList";
import AddDisposeItems from "./components/InventoryManagement/AddDisposeItems";
import DisposedItemList from "./components/InventoryManagement/DisposedItemList";
import DisplaySingle from "./components/InventoryManagement/displaySingle";
import LowStockedList from "./components/InventoryManagement/LowStockedList";
import AddCategory from "./components/InventoryManagement/AddCategory";
import AllCategorys from "./components/InventoryManagement/AllCategorys";
import CategoryWise from "./components/InventoryManagement/CategoryWise";
import GenerateReports from "./components/InventoryManagement/GenerateReports";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from './pages/Menu';
import SingleMenuItem from './pages/SingleMenuItem';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/user/home" />} />

        {/* Protected Admin Route wrapped in AdminLayout */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role={["admin","user", "event-manager", "inventory-manager", "booking-manager", "hr-manager"]}>
              <AdminLayout>
                <Routes>
                  <Route path="/event" element={<EventManagement />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/users" element={<UserTable />} />
                  <Route path="/rooms" element={<RoomManagement />} />
                  <Route path="/menuItem" element={<MenuManagement />} />
                  <Route path="/employees" element={<EmployeeManagement />} />
                  <Route path="/roles" element={<RolesManagement />} />
                  {/* Add other admin-specific routes here */}
                  /** Inventory Management System **/
                  <Route path="/add" element={<AddProduct />} />
                  <Route path="/AllProducts" element={<AllProducts />} />
                  <Route path="/edit/:id" element={<EditProduct />} />
                  <Route
                    path="/AddDamageItems/:id"
                    element={<AddDamageItems />}
                  />
                  <Route path="/DamageItemList" element={<DamageItemList />} />
                  <Route
                    path="/AddDisposeItems/:id"
                    element={<AddDisposeItems />}
                  />
                  <Route
                    path="/DisposedItemList/"
                    element={<DisposedItemList />}
                  />
                  <Route
                    path="/DisplaySingle/:id"
                    element={<DisplaySingle />}
                  />
                  <Route path="/LowStockedList" element={<LowStockedList />} />
                  <Route path="/AddCategory" element={<AddCategory />} />
                  <Route path="/AllCategorys" element={<AllCategorys />} />
                  <Route path="/CategoryWise/:cat" element={<CategoryWise />} />
                  <Route
                    path="/GenerateReports"
                    element={<GenerateReports />}
                  />
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
                            <Header />
                            <Routes>
                                {/* Include any additional non-admin routes here */}
                                <Route path="/home" element={<Home />} />
                                <Route path="/event" element={<EventList />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/booking" element={<Booking />} />
                                <Route path="/single-booking/:roomId" element={<SingleBooking />} />
                                <Route path="/my-bookings" element={<MyBookings />} />
                                <Route path="/menu" element={<Menu />} />
                                <Route path="/single-menuItem/:id" element={<SingleMenuItem />} />
                            </Routes>
                            <Footer/>
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
