import React, { useState } from 'react';

const EventCard = ({ event }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="border rounded shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300">
            {/*<h3 className="text-xl font-bold mb-2 text-gray-800">{event.name}</h3>*/}
            {/*<p className="text-sm text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>*/}
            {event.banner && (
                <div className="cursor-pointer" onClick={handleModalToggle}>
                    <img
                        src={`http://localhost:8070/uploads/${event.banner}`}
                        alt={event.name}
                        className="mt-2 w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity duration-300"
                    />
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
                    <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8 flex">
                        {/* Left side - Banner */}
                        <div className="w-1/2 pr-4">
                            <img
                                src={`http://localhost:8070/uploads/${event.banner}`}
                                alt={event.name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        {/* Right side - Event Details */}
                        <div className="w-1/2 pl-4 flex flex-col justify-between">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{event.name}</h3>
                            <p className="text-lg text-gray-600 mb-4">Date: {new Date(event.date).toLocaleDateString()}</p>
                            <div className="text-gray-700">
                                <p className="font-semibold">Hotel Contact Details:</p>
                                <p>Phone: +94 77 888 7888</p>
                                <p>Email: info@hotelbonbon.com</p>
                                <p>Address: Hotel Bon Bon, Homagama</p>
                            </div>
                            <button
                                className="mt-4 py-2 px-4 bg-[#DAA520] text-white rounded hover:bg-blue-700 transition-colors duration-300"
                                onClick={handleModalToggle}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCard;
