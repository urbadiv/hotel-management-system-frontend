import React, { useEffect, useState } from 'react';
import { getEvents } from '../api/eventApi';
import EventCard from '../components/EventCard';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await getEvents();
                setEvents(data);
                setFilteredEvents(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        let updatedEvents = events;
        if (searchTerm) {
            updatedEvents = updatedEvents.filter(event =>
                event.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (dateFilter) {
            updatedEvents = updatedEvents.filter(event =>
                new Date(event.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
            );
        }
        setFilteredEvents(updatedEvents);
    }, [searchTerm, dateFilter, events]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search by event name..."
                    className="p-3 border rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="date"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
                <button
                    className="p-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200"
                    onClick={() => setDateFilter('')}
                >
                    Clear
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-pulse h-10 w-10 bg-blue-500 rounded-full"></div>
                    <span className="ml-3 text-lg text-gray-700">Loading events...</span>
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="text-center text-gray-600 mt-8">No events match your criteria.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventList;
