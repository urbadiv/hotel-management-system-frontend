import React, { useState } from 'react';
import { signup } from '../api/eventApi'; // Adjust the path if necessary

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
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
        }

        const phonePattern = /^07\d{8}$/;
        if (!phonePattern.test(formData.phone)) {
            newErrors.phone = "Phone number must start with 07 followed by 8 digits";
        }

        const employeeIdPattern = /^e\d{5}$/;
        if (!employeeIdPattern.test(formData.employeeId)) {
            newErrors.employeeId = "Employee ID must start with 'e' followed by 5 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await signup(formData);
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
        <div className="pt-20 fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className=" bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] p-8 overflow-y-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full border border-gray-300 rounded p-2"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="employeeId">Employee ID</label>
                        <input
                            type="text"
                            id="employeeId"
                            name="employeeId"
                            className={`w-full border ${errors.employeeId ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                        />
                        {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="w-full border border-gray-300 rounded p-2"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="nic">NIC</label>
                        <input
                            type="text"
                            id="nic"
                            name="nic"
                            className="w-full border border-gray-300 rounded p-2"
                            value={formData.nic}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
