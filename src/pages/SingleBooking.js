import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById } from '../api/roomApi';
import { createBooking } from '../api/bookingApi';

const SingleBooking = () => {
    const { roomId } = useParams(); // Extract room ID from URL params
    const navigate = useNavigate(); // For navigation
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        noOfAccommodations: 1,
    });
    const [totalCost, setTotalCost] = useState(0);

    // Fetch room details by ID
    useEffect(() => {
        const fetchRoomDetails = async () => {
            setLoading(true);
            try {
                const { data } = await getRoomById(roomId);
                setRoom(data);
            } catch (error) {
                console.error('Error fetching room details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    // Calculate total cost whenever accommodations or room rate changes
    useEffect(() => {
        if (room) {
            const days =
                (new Date(formData.checkOut) - new Date(formData.checkIn)) /
                (1000 * 60 * 60 * 24);
            if (days > 0) {
                setTotalCost(days * room.rate * formData.noOfAccommodations);
            } else {
                setTotalCost(0);
            }
        }
    }, [formData, room]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            roomID: roomId,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            noOfAccommodations: formData.noOfAccommodations,
            totalCost,
        };

        try {
            await createBooking(bookingData);
            alert('Booking successful!');
            navigate('/user/my-bookings'); // Navigate to user bookings page
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking.');
        }
    };

    if (loading) {
        return <div className="text-center text-xl">Loading room details...</div>;
    }

    if (!room) {
        return <div className="text-center text-xl">Room not found.</div>;
    }

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
                {/* <h2 className="text-3xl font-bold text-center mb-8">Book {room.name}</h2> */}

                <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded">
                    {/* Room Details */}
                    <div className="mb-6">
                        <img
                            src={`http://localhost:8070/uploads/${room.photo}` || '/default-room.jpg'}
                            alt={room.name}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold">{room.name}</h3>
                        <p className="text-gray-700">{room.description}</p>
                        <p className="font-medium text-lg text-gray-800">
                            Rate: Rs.{room.rate}/night
                        </p>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleBookingSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Check-In Date</label>
                            <input
                                type="date"
                                name="checkIn"
                                value={formData.checkIn}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Check-Out Date</label>
                            <input
                                type="date"
                                name="checkOut"
                                value={formData.checkOut}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Number of Accommodations</label>
                            <input
                                type="number"
                                name="noOfAccommodations"
                                value={formData.noOfAccommodations}
                                onChange={handleInputChange}
                                min="1"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <p className="font-medium text-lg text-gray-800">
                                Total Cost: Rs.{totalCost}
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#DAA520] text-white py-2 px-4 rounded hover:bg-[#B8860B]"
                        >
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SingleBooking;
