import React, { useEffect, useState } from 'react';
import { getBookingsByUser } from '../api/bookingApi';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const { data } = await getBookingsByUser();
                setBookings(data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Could not fetch bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div className="text-center text-xl">Loading your bookings...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">My Bookings</h2>
                {bookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white p-4 shadow-lg rounded-lg border border-gray-200"
                            >
                                <h3 className="text-lg font-semibold mb-2">Room ID: {booking.roomID}</h3>
                                <p>
                                    <strong>Check-In:</strong> {new Date(booking.checkIn).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Check-Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Number of Accommodations:</strong> {booking.noOfAccommodations}
                                </p>
                                <p>
                                    <strong>Total Cost:</strong> Rs. {booking.totalCost}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-lg text-gray-700">You don't have any bookings yet.</div>
                )}
            </div>
        </section>
    );
};

export default MyBookings;
