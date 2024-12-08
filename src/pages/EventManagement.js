import React, { useState, useEffect } from 'react';
import { getAdminEvents, createEvent, updateEvent, deleteEvent } from '../api/eventApi';
import AdminLayout from "../components/AdminLayout";

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ name: '', date: '', banner: '' });
    const [editEvent, setEditEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await getAdminEvents();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        if (new Date(formData.date) < new Date()) {
            alert('Date cannot be in the past.');
            return;
        }
        if (!formData.name || !formData.date || !formData.banner) {
            alert('All fields are required.');
            return;
        }
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('banner', formData.banner);

            const response = await createEvent(formDataToSend);
            setEvents([...events, response.data.event]);
            alert('Event created successfully!');
            setShowModal(false);
            setFormData({ name: '', date: '', banner: '' });
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event.');
        }
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        if (new Date(formData.date) < new Date()) {
            alert('Date cannot be in the past.');
            return;
        }
        if (!formData.name || !formData.date) {
            alert('Name and date are required.');
            return;
        }
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('date', formData.date);
            if (formData.banner) formDataToSend.append('banner', formData.banner);
    
            const response = await updateEvent(editEvent._id, formDataToSend);
            
            // Update events state with the updated event
            setEvents(events.map((event) => (event._id === editEvent._id ? response.data.event : event)));
            
            alert('Event updated successfully!');
            setFormData({ name: '', date: '', banner: '' });
            setShowModal(false);  // Close modal after update
            setEditEvent(null);    // Reset edit event
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event.');
        }
    };
    
    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(id);
            // Remove the deleted event from the state
            setEvents(events.filter((event) => event._id !== id)); // Ensure _id is used
            alert('Event deleted successfully!');
        } catch (error) {
            alert('Failed to delete event.');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredEvents = events.filter(event => {
        return event.name.toLowerCase().includes(searchTerm) &&
            (!dateFilter || new Date(event.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString());
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search Events"
                        className="p-2 border rounded-md w-80"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <input
                        type="date"
                        className="p-2 border rounded-md"
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => window.location.reload()}
                    >
                        Clear Filters
                    </button>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    <span className="font-bold text-xxl">+</span>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-white border rounded-lg shadow-lg">
                        <img src={`http://localhost:8070/uploads/${event.banner}`} alt={event.name}
                             className="w-full h-40 object-cover rounded-md"/>
                        <h4 className="text-lg font-bold mt-2">{event.name}</h4>
                        <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                        <div className="flex mt-2 gap-x-2">
                            <button
                                onClick={() => {
                                    setEditEvent(event);
                                    const formattedDate = new Date(event.date).toISOString().split('T')[0];
                                    setFormData({name: event.name, date: formattedDate, banner: ''});
                                    setShowModal(true);
                                }}
                                className=" w-20 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteEvent(event._id)}
                                className="w-20 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-4">{editEvent ? 'Edit Event' : 'Create Event'}</h3>
                        <form onSubmit={editEvent ? handleUpdateEvent : handleCreateEvent}>
                            <input
                                type="text"
                                placeholder="Event Name"
                                className="block w-full mb-2 p-2 border rounded"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                            <input
                                type="date"
                                className="block w-full mb-2 p-2 border rounded"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                required
                            />
                            <input
                                type="file"
                                className="block w-full mb-4 p-2 border rounded"
                                onChange={(e) => setFormData({...formData, banner: e.target.files[0]})}
                            />
                            <button type="submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                                {editEvent ? 'Update Event' : 'Create Event'}
                            </button>
                        </form>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-2 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventManagement;
