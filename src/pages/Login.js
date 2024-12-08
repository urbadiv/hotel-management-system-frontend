import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { login } from '../api/eventApi';
import logo from '../img/logo.png';
import {getUserRole} from "../utils/auth";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(formData);
            localStorage.setItem('token', data.token);
            if(getUserRole()=='user'){
                window.location.href = '/user/home';
            }else{
                window.location.href = '/admin/users';
            }

        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(https://source.unsplash.com/random)' }}>
            <div className="w-2/3 h-2/3 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg flex overflow-hidden">
                {/* Left Section */}
                <div className="w-1/2 bg-gray-900 flex flex-col items-center justify-center text-white p-8">
                    <img src={logo} alt="Company Logo" className="w-24 h-24 mb-4" />
                    <h1 className="text-white text-4xl font-bold">Bon Bon Hotel</h1>
                    <p className="mt-4 text-lg text-center">Welcome to our platform. Login to access your account.</p>
                </div>

                {/* Right Section */}
                <div className="w-1/2 flex items-center justify-center p-8">
                    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-xl ">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="submit"
                            className="w-full bg-gray-900 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-200">
                            Login
                        </button>

                        <div className="mt-4 text-center">
                            <a href="/forgot-password" className="text-blue-500 hover:underline text-sm">Forgot password?</a>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-gray-600 text-sm">
                                Don’t have an account?{' '}
                                <Link to={'/signup'}>
                                <a className="text-blue-500 hover:underline">
                                    Sign up
                                </a></Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
