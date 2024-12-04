import React from 'react';

const EventCard = ({ event }) => {
    return (
        <div className="border rounded shadow-md p-4 bg-white">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            {event.banner && (
                <img src={`http://localhost:8070/uploads/${event.banner}`} alt={event.name} className="mt-2 w-full h-48 object-cover rounded" />
            )}
        </div>
    );
};

export default EventCard;
