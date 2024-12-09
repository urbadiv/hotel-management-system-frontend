import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Register from './Register';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8070/auth/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                const allUsers = response.data;
                setUsers(allUsers.filter((user) => user.role === 'user'));
                setAdmins(allUsers.filter((user) => user.role === 'admin'));
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const deleteUser = (id) => {
        axios
            .delete(`http://localhost:8070/auth/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(() => {
                alert('User deleted successfully');
                setUsers(users.filter((user) => user._id !== id));
                setAdmins(admins.filter((admin) => admin._id !== id));
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    return (
        <div className="p-6 relative">
            <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Admins</h2>
                <table className="min-w-full table-auto border-collapse overflow-hidden shadow-lg rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-5 bg-gray-400 border-b text-left text-gray-600 font-medium">Name</th>
                            <th className="py-3 px-5 bg-gray-400 border-b text-left text-gray-600 font-medium">Email</th>
                            <th className="py-3 px-5 bg-gray-400 border-b text-left text-gray-600 font-medium">Employee ID</th>
                            <th className="py-3 px-5 bg-gray-400 border-b text-left text-gray-600 font-medium">Role</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {admins.map((admin) => (
                            <tr key={admin._id} className="hover:bg-gray-50">
                                <td className="py-3 px-5 text-gray-800">{admin.name}</td>
                                <td className="py-3 px-5 text-gray-800">{admin.email}</td>
                                <td className="py-3 px-5 text-gray-800">{admin.employeeId}</td>
                                <td className="py-3 px-5 text-gray-800">{admin.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Users</h2>
                <table className="min-w-full table-auto border-collapse overflow-hidden shadow-lg rounded-lg">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="py-3 px-5 bg-gray-400 border-b text-left text-gray-600 font-medium">Name</th>
                            <th className="py-3 px-5 bg-gray-400 border-b text-left text-gray-600 font-medium">Email</th>
                            <th className="py-3 px-5 bg-gray-400 border-b text-left text-gray-600 font-medium">NIC</th>
                            <th className="py-3 px-5 bg-gray-400 border-b text-left text-gray-600 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="py-3 px-5 text-gray-800">{user.name}</td>
                                <td className="py-3 px-5 text-gray-800">{user.email}</td>
                                <td className="py-3 px-5 text-gray-800">{user.nic}</td>
                                <td className="py-3 px-5 text-gray-800">
                                    <button
                                        className="bg-red-600 text-white hover:text-red-800 px-6 py-2 rounded shadow-lg"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                className="mt-4 bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 rounded shadow-lg"
                onClick={() => setIsModalOpen(true)}
            >
                Register Admin
            </button>

            {isModalOpen && (
    <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        style={{ overflow: 'auto' }}
    >
            <button
                className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                onClick={() => setIsModalOpen(false)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '20px',
                    lineHeight: '1',
                    zIndex: 100, // Explicit z-index for the close button
                }}
            >
                ✖
            </button>
            <Register />
    </div>
)}


        </div>
    );
};

export default UserTable;
