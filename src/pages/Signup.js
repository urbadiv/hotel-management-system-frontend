import React, { useState } from 'react';
import { signup } from '../api/eventApi';
import { Link } from "react-router-dom"; // Assuming you have a signup API function
import logo from '../img/logo.png';

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
        address: '',
    });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const validatePhone = (phone) => /^[07]\d{8,9}$/.test(phone);
    const validateNIC = (nic) => /^\d{12}$|^\d{9}[vV]$/.test(nic);

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
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
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
            <div className="w-full md:w-2/3 lg:w-2/3 max-h-screen flex flex-col md:flex-row border rounded-lg shadow-lg overflow-hidden">
                {/* Left side: Signup Form */}
                <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white p-6 overflow-y-auto">
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
                            setErrors({ ...errors, email: '' });
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
                            setErrors({ ...errors, password: '' });
                        }}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                    <input
                        type="text"
                        placeholder="Address"
                        className={`block w-full mb-2 p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
                        value={formData.address}
                        onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value });
                            setErrors({ ...errors, address: '' });
                        }}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                    <input
                        type="tel"
                        placeholder="Phone No"
                        className={`block w-full mb-2 p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
                        value={formData.phone}
                        onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            setErrors({ ...errors, phone: '' });
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
                            setErrors({ ...errors, nic: '' });
                        }}
                    />
                    {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}

                    <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-200"
                    >
                        Signup
                    </button>
                    <div className="mt-2 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link to={'/login'}>
                                <span className="text-blue-500 hover:underline">
                                    Login
                                </span>
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Right side: Company Details */}
                <div className="w-full md:w-1/2 bg-gray-900 flex flex-col items-center justify-center text-white p-8">
                    <img src={logo} alt="Company Logo" className="w-24 h-24 mb-4" />
                    <h1 className="text-white text-4xl font-bold">Bon Bon Hotel</h1>
                    <p className="mt-4 text-lg text-center">
                        "Welcome to Hotel Bon Bon! Sign up to manage your bookings, events, and more. Experience personalized service at your fingertips."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
