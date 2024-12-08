import React, { useEffect, useState } from 'react';
import { getBookingsByUser, updateBooking, deleteBooking } from '../api/bookingApi';
import { getOrdersByUser, deleteOrder } from '../api/orderApi';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure accessibility

const UserBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await getBookingsByUser();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        const fetchOrders = async () => {
            try {
                const { data } = await getOrdersByUser();
                console.log(data);
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchBookings();
        fetchOrders();
    }, []);

    const openModal = (booking) => {
        setSelectedBooking(booking);
        setUpdatedData({
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            noOfAccommodations: booking.noOfAccommodations,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleUpdate = async () => {
        try {
            if (selectedBooking) {
                await updateBooking(selectedBooking._id, updatedData);
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking._id === selectedBooking._id
                            ? { ...booking, ...updatedData }
                            : booking
                    )
                );
                closeModal();
            }
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const handleDeleteBooking = async (id) => {
        try {
            await deleteBooking(id);
            setBookings((prev) => prev.filter((booking) => booking._id !== id));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            await deleteOrder(id);
            setOrders((prev) => prev.filter((order) => order._id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div className="p-4 m-10 flex gap-8">
            {/* Bookings Section */}
            <div className="flex-2">
                <h2 className="text-2xl font-bold mb-4 font-sans">My Bookings</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Room Type</th>
                                <th className="border border-gray-300 px-4 py-2">Check-In</th>
                                <th className="border border-gray-300 px-4 py-2">Check-Out</th>
                                <th className="border border-gray-300 px-4 py-2">Accommodations</th>
                                <th className="border border-gray-300 px-4 py-2">Total Cost</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {booking.roomID ? booking.roomID.type : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {booking.noOfAccommodations || 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        ${booking.totalCost || '0.00'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleDeleteBooking(booking._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Orders Section */}
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 font-sans">My Orders</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Order Name</th>
                                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="border border-gray-300 px-4 py-2">{order.menuItemName}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {order.quantity}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        Rs:{order.totalCost || '0.00'}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleDeleteOrder(order._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserBooking;
