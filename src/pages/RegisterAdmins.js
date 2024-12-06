import React, { useState } from 'react';
import { signup } from '../api/eventApi';
import { Link } from "react-router-dom"; // Assuming you have a signup API function

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        role: 'admin',
        employeeId: '',
        nic: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        // Password validation
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
        }

        // Phone validation
        const phonePattern = /^07\d{8}$/;
        if (!phonePattern.test(formData.phone)) {
            newErrors.phone = "Phone number must start with 07 followed by 8 digits";
        }

        // Employee ID validation
        const employeeIdPattern = /^e\d{5}$/;
        if (!employeeIdPattern.test(formData.employeeId)) {
            newErrors.employeeId = "Employee ID must start with 'e' followed by 5 digits";
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await signup(formData); // Post data to the signup endpoint
                alert('Signup successful!');
                window.location.href = '/login';
            } catch (error) {
                alert('Signup failed. Please try again.');
            }
        } else {
            alert('Please fix the errors before submitting.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-2/3 h-2/3 flex border rounded-lg shadow-lg overflow-hidden">
                {/* Left side: Signup Form */}
                <form onSubmit={handleSubmit} className="w-full bg-white p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Signup</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        className="block w-full mb-2 p-2 border rounded"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        className="block w-full mb-2 p-2 border rounded"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        className="block w-full mb-2 p-2 border rounded"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    <input
                        type="text"
                        placeholder="Address"
                        className="block w-full mb-2 p-2 border rounded"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    <input
                        type="tel"
                        placeholder="Phone No"
                        className="block w-full mb-2 p-2 border rounded"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    <input
                        type="text"
                        placeholder="Employee Id"
                        className="block w-full mb-2 p-2 border rounded"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    />
                    {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-200"
                    >
                        Register Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
