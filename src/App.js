import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventList from './pages/EventList';
import EventManagement from './pages/EventManagement';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import AdminLayout from './components/AdminLayout';
import NotFound from './pages/NotFound'; // A 404 page component
import UserTable from "./pages/UserTable";
import { isAuthenticated, getUserRole } from './utils/auth';
import RoomManagement from './pages/RoomManagement';
import MenuManagement from './pages/MenuManagement';

import Header from './components/InventoryManagement/Header';
import AddProduct from './components/InventoryManagement/AddProduct';
import AllProducts from './components/InventoryManagement/AllProducts';
import NavBar from './components/InventoryManagement/NavBar';
import EditProduct from './components/InventoryManagement/EditProduct';
import AddDamageItems from './components/InventoryManagement/AddDamageItems';
import DamageItemList from './components/InventoryManagement/DamagedItemList';
import AddDisposeItems from './components/InventoryManagement/AddDisposeItems';
import DisposedItemList from './components/InventoryManagement/DisposedItemList';
import DisplaySingle from './components/InventoryManagement/displaySingle';
import LowStockedList from './components/InventoryManagement/LowStockedList';
import AddCategory from './components/InventoryManagement/AddCategory';
import AllCategorys from './components/InventoryManagement/AllCategorys';
import CategoryWise from './components/InventoryManagement/CategoryWise';
import GenerateReports from './components/InventoryManagement/GenerateReports';

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
                                    <Route path="/menuItem" element={<MenuManagement />} />
                                    {/* Add other admin-specific routes here */}
                                    /** Inventory Management System - Urindu **/
                                    <Route path="/add" element={<AddProduct />} />
                                    <Route path="/AllProducts" element={<AllProducts />} />
                                    <Route path="/edit/:id" element={<EditProduct />} />
                                    <Route path="/AddDamageItems/:id" element={<AddDamageItems />} />
                                    <Route path="/DamageItemList" element={<DamageItemList />} />
                                    <Route path="/AddDisposeItems/:id" element={<AddDisposeItems />} />
                                    <Route path="/DisposedItemList/" element={<DisposedItemList />} />
                                    <Route path="/DisplaySingle/:id" element={<DisplaySingle />} /> 
                                    <Route path="/LowStockedList" element={<LowStockedList />} /> 
                                    <Route path="/AddCategory" element={<AddCategory />} /> 
                                    <Route path="/AllCategorys" element={<AllCategorys />} /> 
                                    <Route path="/CategoryWise/:cat" element={<CategoryWise />} /> 
                                    <Route path="/GenerateReports" element={<GenerateReports />} /> 
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
