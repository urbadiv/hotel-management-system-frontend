import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Register from './Register';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch all users from the API
        axios.get('http://localhost:8070/auth/users',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                const allUsers = response.data;
                setUsers(allUsers.filter(user => user.role === 'user'));
                setAdmins(allUsers.filter(user => user.role === 'admin'));
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:8070/auth/users/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(() => {
                alert('User deleted successfully');
                setUsers(users.filter(user => user._id !== id));
                setAdmins(admins.filter(admin => admin._id !== id));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div className="p-6">
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Admins</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="text-left">
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Employee ID</th>
                        <th className="py-2 px-4 border-b">Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {admins.map(admin => (
                        <tr key={admin._id}>
                            <td className="py-2 px-4 border-b">{admin.name}</td>
                            <td className="py-2 px-4 border-b">{admin.email}</td>
                            <td className="py-2 px-4 border-b">{admin.employeeId}</td>
                            <td className="py-2 px-4 border-b">{admin.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Users</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="text-left">
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">NIC</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.nic}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="text-red-500 hover:text-red-700"
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
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(true)}
            >
                Register Admin
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-black z-10"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✖
                        </button>
                        <Register/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;
