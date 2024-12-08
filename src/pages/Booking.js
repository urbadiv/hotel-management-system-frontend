import React, { useEffect, useState } from "react";
import { getRooms, getRoomsByType } from "../api/roomApi";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("All"); // Filter state
    const navigate = useNavigate(); // For navigation

    // Fetch all rooms or filtered rooms on type change
    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                if (filterType === "All") {
                    const { data } = await getRooms();
                    setRooms(data);
                } else {
                    const { data } = await getRoomsByType(filterType);
                    setRooms(data);
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [filterType]);

    // Handle Room Booking
    const handleBookNow = (roomId) => {
        navigate(`/single-booking/${roomId}`);
    };

    if (loading) {
        return <div className="text-center text-xl">Loading rooms...</div>;
    }

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
                {/* Enhanced Heading */}
                <h2 className="text-4xl font-extrabold text-center mb-8 text-[#DAA520] uppercase tracking-wide">
                    Available Rooms
                </h2>

                {/* Filter Dropdown */}
                <div className="flex justify-center mb-6">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="p-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                    >
                        <option value="All">All</option>
                        <option value="Family">Family</option>
                        <option value="Premium">Premium</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Twin">Twin</option>
                    </select>
                </div>

                <div className="">
                    <button onClick={() => navigate(`/`)} className=" bg-[#DAA520] text-white py-2 px-4 rounded hover:bg-[#B8860B]">See All Bookings</button>
                </div>

                {/* Room Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room) => (
                        <div
                            key={room._id}
                            className="bg-white p-6 shadow-lg rounded flex flex-col justify-between"
                        >
                            {/* Room Image */}
                            <img
                                src={`http://localhost:8070/uploads/${room.photo}` || "/default-room.jpg"} // Default image fallback
                                alt={room.name}
                                className="w-full h-48 object-cover rounded mb-4"
                            />

                            {/* Room Details */}
                            <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                            <p className="text-gray-700 mb-4">
                                {room.description || "No description available."}
                            </p>
                            <p className="font-medium text-lg text-gray-800">
                                Price: Rs.{room.rate}/night
                            </p>

                            {/* Book Now Button */}
                            <button
                                onClick={() => navigate(`/user/single-booking/${room._id}`)}
                                className="mt-4 bg-[#DAA520] text-white py-2 px-4 rounded hover:bg-[#B8860B]"
                            >
                                Book Now
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoomList;
