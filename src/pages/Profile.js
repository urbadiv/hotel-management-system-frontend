import React, { useState, useEffect } from "react";
import axios from "axios";
import profilepic from "../img/profile.png"

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:8070/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
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
      const { data } = await axios.put(
        "http://localhost:8070/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(data.user);
      setShowModal(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!profile)
    return <div className="text-center text-xl mt-10">Loading...</div>;

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-40">
      <div className="w-4/5 h-2/3 bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={profilepic}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-500">{profile.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <strong className="block text-gray-700">Name:</strong>
            {profile.name}
          </div>
          <div>
            <strong className="block text-gray-700">Email:</strong>
            {profile.email}
          </div>
          <div>
            <strong className="block text-gray-700">Phone:</strong>
            {profile.phone || "Add number"}
          </div>
          <div>
            <strong className="block text-gray-700">Address:</strong>
            {profile.address || "Not specified"}
          </div>
          {profile.role === "user" && (
            <div>
              <strong className="block text-gray-700">NIC:</strong>
              {profile.nic}
            </div>
          )}
          {profile.role === "admin" && (
            <>
              <div>
                <strong className="block text-gray-700">Employee ID:</strong>
                {profile.employeeId}
              </div>
              <div>
                <strong className="block text-gray-700">Role:</strong>
                {profile.role}
              </div>
            </>
          )}
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          onClick={handleShow}
        >
          Edit Profile
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-4/5 md:w-1/3 p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={handleClose}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
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
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
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
