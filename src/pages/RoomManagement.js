import React, { useState, useEffect } from 'react';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../api/roomApi'; // Import API methods
import { useNavigate } from 'react-router-dom';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    rate: '',
    description: '',
    photo: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all rooms when component mounts
    const fetchRooms = async () => {
      try {
        const response = await getRooms();
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, photo: e.target.files[0] }));
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      await createRoom(form);
      const response = await getRooms();
      setRooms(response.data);
      setFormData({ type: '', rate: '', description: '', photo: null });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      await updateRoom(currentRoomId, form);
      const response = await getRooms();
      setRooms(response.data);
      setEditMode(false);
      setFormData({ type: '', rate: '', description: '', photo: null });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await deleteRoom(id);
      const response = await getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleEditRoom = (room) => {
    setEditMode(true);
    setCurrentRoomId(room._id);
    setFormData({
      type: room.type,
      rate: room.rate,
      description: room.description,
      photo: room.photo,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Room Management</h1>

      {/* Add button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditMode(false);
            setFormData({ type: '', rate: '', description: '', photo: null });
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white p-3 rounded-full text-lg"
        >
          +
        </button>
      </div>

      {/* Modal for creating/updating rooms */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? 'Edit Room' : 'Create Room'}
            </h2>
            <form onSubmit={editMode ? handleUpdateRoom : handleCreateRoom}>
              <div className="grid gap-4">
                <div>
                  <label className="block text-gray-700">Room Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Family">Family</option>
                    <option value="Premium">Premium</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Twin">Twin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Rate</label>
                  <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700">Room Photo</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  {editMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rooms list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={`http://localhost:8070/uploads/${room.photo}`}
              alt={room.type}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{room.type}</h3>
            <p className="text-gray-600">Rate: Rs:{room.rate}</p>
            <p className="text-gray-600">{room.description}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEditRoom(room)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRoom(room._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomManagement;
