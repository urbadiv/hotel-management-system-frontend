// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const Profile = () => {
//     const [profile, setProfile] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [formData, setFormData] = useState({});
//
//     // Fetch user profile
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const { data } = await axios.get('http://localhost:8070/auth/profile', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setProfile(data);
//                 setFormData({ name: data.name, address: data.address, phone: data.phone });
//             } catch (error) {
//                 console.error('Error fetching profile:', error);
//             }
//         };
//
//         fetchProfile();
//     }, []);
//
//     // Handle modal close
//     const handleClose = () => setShowModal(false);
//
//     // Handle modal show
//     const handleShow = () => setShowModal(true);
//
//     // Handle form changes
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     // Update profile
//     const handleUpdate = async () => {
//         try {
//             const { data } = await axios.put('http://localhost:8070/auth/profile', formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setProfile(data.user);
//             setShowModal(false);
//             alert('Profile updated successfully');
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             alert('Failed to update profile');
//         }
//     };
//
//     if (!profile) return <div className="text-center text-xl mt-10">Loading...</div>;
//
//     return (
//         <div className="max-w-4xl mx-auto mt-10">
//             <h2 className="text-3xl font-bold mb-6">User Profile</h2>
//             <div className="bg-white shadow rounded-lg p-6">
//                 <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
//                 <p className="mb-2"><strong>Address:</strong> {profile.address}</p>
//                 <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
//                 <p className="mb-2"><strong>Phone:</strong> {profile.phone}</p>
//                 {profile.role === 'user' && <p className="mb-2"><strong>NIC:</strong> {profile.nic}</p>}
//                 {profile.role === 'admin' && <p className="mb-2"><strong>Employee ID:</strong> {profile.employeeId}</p>}
//                 {profile.role === 'admin' && <p className="mb-4"><strong>Role:</strong> {profile.role}</p>}
//                 <button
//                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     onClick={handleShow}
//                 >
//                     Edit Profile
//                 </button>
//             </div>
//
//             {/* Modal */}
//             {showModal && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
//                         <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
//                         <form>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-2" htmlFor="name">
//                                     Name
//                                 </label>
//                                 <input
//                                     id="name"
//                                     name="name"
//                                     type="text"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full border rounded px-3 py-2"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-2" htmlFor="address">
//                                     Address
//                                 </label>
//                                 <input
//                                     id="address"
//                                     name="address"
//                                     type="text"
//                                     value={formData.address}
//                                     onChange={handleChange}
//                                     className="w-full border rounded px-3 py-2"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-2" htmlFor="phone">
//                                     Phone
//                                 </label>
//                                 <input
//                                     id="phone"
//                                     name="phone"
//                                     type="text"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     className="w-full border rounded px-3 py-2"
//                                 />
//                             </div>
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
//                                     onClick={handleClose}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                                     onClick={handleUpdate}
//                                 >
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Profile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('http://localhost:8070/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProfile(data);
                setFormData({ name: data.name, email: data.email, phone: data.phone, address: data.address });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const { data } = await axios.put('http://localhost:8070/auth/profile', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setProfile(data.user);
            setShowModal(false);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (!profile) return <div className="text-center text-xl mt-10">Loading...</div>;

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white shadow-md rounded-lg p-6 relative">
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={profile.avatar || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{profile.name}</h2>
                        <p className="text-gray-500">{profile.email}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <strong>Name:</strong> {profile.name}
                </div>
                <div className="mb-4">
                    <strong>Email:</strong> {profile.email}
                </div>
                <div className="mb-4">
                    <strong>Phone:</strong> {profile.phone || 'Add number'}
                </div>
                <div className="mb-4">
                    <strong>Address:</strong> {profile.address || 'Not specified'}
                </div>
                {profile.role === 'user' && <div className="mb-4"><strong>NIC:</strong> {profile.nic}</div>}
                {profile.role === 'admin' && <div className="mb-4"><strong>Employee ID:</strong> {profile.employeeId}</div>}
                {profile.role === 'admin' && <div className="mb-4"><strong>Role:</strong> {profile.role}</div>}
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                    onClick={handleShow}
                >
                    Edit Profile
                </button>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                onClick={handleClose}
                            >
                                &times;
                            </button>
                            <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 w-full"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
