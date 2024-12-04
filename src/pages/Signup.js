import React, { useState } from 'react';
import { signup } from '../api/eventApi'; // Assuming you have a signup API function

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData); // Post data to the signup endpoint
            alert('Signup successful!');
            window.location.href = '/login';
        } catch (error) {
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Signup</h2>
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
                    className="block w-full mb-2 p-2 border rounded"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block w-full mb-2 p-2 border rounded"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button className="w-full bg-green-500 text-white p-2 rounded">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
