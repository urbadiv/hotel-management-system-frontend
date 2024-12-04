import React, { useState, useEffect } from 'react';
import { getAdminEvents, createEvent, updateEvent, deleteEvent } from '../api/eventApi';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ name: '', date: '', banner: '' });

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
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('banner', formData.banner);

            const response = await createEvent(formDataToSend); // Ensure this sends a multipart/form-data request
            setEvents([...events, response.data.event]);
            alert('Event created successfully!');
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event.');
        }
    };


    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(id);
            setEvents(events.filter((event) => event.id !== id));
            alert('Event deleted successfully!');
        } catch (error) {
            alert('Failed to delete event.');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Admin Dashboard</h2>
            <form onSubmit={handleCreateEvent} className="mb-6">
                <input
                    type="text"
                    placeholder="Event Name"
                    className="block w-full mb-2 p-2 border rounded"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="date"
                    className="block w-full mb-2 p-2 border rounded"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <input
                    type="file"
                    className="block w-full mb-4 p-2 border rounded"
                    onChange={(e) => setFormData({ ...formData, banner: e.target.files[0] })}
                />
                <button className="bg-blue-500 text-white p-2 rounded">Create Event</button>
            </form>
            <div>
                <h3 className="text-xl mb-4">Existing Events</h3>
                {events.map((event) => (
                    <div key={event.id} className="p-4 border-b">
                        <h4 className="text-lg">{event.name}</h4>
                        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                        <button onClick={() => handleDeleteEvent(event.id)} className="mt-2 bg-red-500 text-white p-2 rounded">
                            Delete Event
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
