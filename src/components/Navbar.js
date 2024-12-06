import React from 'react';
import { Link } from 'react-router-dom';
import { logout, getUserRole } from '../utils/auth';

const Navbar = () => {
    const role = getUserRole();

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <Link to="/user" className="text-xl font-bold">
                    Event Manager
                </Link>
                <div>
                    <Link to="/user" className="px-4">Home</Link>
                    <Link to="/user/event" className="px-4">Events</Link>
                    {role === 'admin' && <Link to="/admin" className="px-4">Admin</Link>}
                    <button onClick={logout} className="px-4 bg-red-500 rounded">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
