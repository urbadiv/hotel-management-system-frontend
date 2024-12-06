import React, { useState } from 'react';
import { signup } from '../api/eventApi';
import { Link } from "react-router-dom"; // Assuming you have a signup API function

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        role: 'user',
        employeeId: '',
        nic: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        phone: '',
        nic: '',
    });

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const validatePhone = (phone) => {
        const regex = /^[07]\d{8,9}$/;
        return regex.test(phone);
    };

    const validateNIC = (nic) => {
        const regex = /^\d{12}$|^\d{9}[vV]$/;
        return regex.test(nic);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = {};

        // Validate fields
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }
        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character';
            valid = false;
        }
        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Phone number must start with 0 or 7 and be followed by 8-9 digits';
            valid = false;
        }
        if (!validateNIC(formData.nic)) {
            newErrors.nic = 'NIC must be 12 digits or 9 digits followed by a lowercase/uppercase "v"';
            valid = false;
        }

        if (valid) {
            try {
                await signup(formData); // Post data to the signup endpoint
                alert('Signup successful!');
                window.location.href = '/login';
            } catch (error) {
                alert('Signup failed. Please try again.');
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-2/3 h-2/3 flex border rounded-lg shadow-lg overflow-hidden">
                {/* Left side: Signup Form */}
                <form onSubmit={handleSubmit} className="w-1/2 bg-white p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Signup</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        className="block w-full mb-2 p-2 border rounded"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className={`block w-full mb-2 p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setErrors({ ...errors, email: '' }); // Clear error as user types
                        }}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        className={`block w-full mb-2 p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                        value={formData.password}
                        onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                            setErrors({ ...errors, password: '' }); // Clear error as user types
                        }}
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
                        className={`block w-full mb-2 p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
                        value={formData.phone}
                        onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            setErrors({ ...errors, phone: '' }); // Clear error as user types
                        }}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                    <input
                        type="text"
                        placeholder="NIC Number"
                        className={`block w-full mb-2 p-2 border rounded ${errors.nic ? 'border-red-500' : ''}`}
                        value={formData.nic}
                        onChange={(e) => {
                            setFormData({ ...formData, nic: e.target.value });
                            setErrors({ ...errors, nic: '' }); // Clear error as user types
                        }}
                    />
                    {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}

                    <button type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-200">Signup
                    </button>
                    <div className="mt-2 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link to={'/login'}>
                                <a className="text-blue-500 hover:underline">
                                    Login
                                </a>
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Right side: Company Details */}
                <div className="w-1/2 bg-gradient-to-r from-blue-400 to-blue-600 flex justify-center items-center text-white">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Company Name</h1>
                        <p className="text-lg">Welcome to our platform.</p>
                        <p>Sign up today to access all the features we offer.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
