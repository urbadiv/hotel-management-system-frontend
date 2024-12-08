import React, { useEffect, useState } from 'react';
import { getBookingsByUser, updateBooking, deleteBooking } from '../api/bookingApi';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure accessibility

const UserBooking = () => {
    const [bookings, setBookings] = useState([]);
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
        fetchBookings();
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

    const handleDelete = async (id) => {
        try {
            await deleteBooking(id);
            setBookings((prev) => prev.filter((booking) => booking._id !== id));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div className="p-4 m-10">
            <h2 className="text-2xl font-bold mb-4 font-sans">My Bookings</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-60 border-collapse border border-gray-300">
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
                                    {/* <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => openModal(booking)}
                                    >
                                        Update
                                    </button> */}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(booking._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Update Booking"
                className="modal"
                overlayClassName="overlay"
            >
                <h2 className="text-xl font-bold mb-4">Update Booking</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate();
                    }}
                >
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Check-In</label>
                        <input
                            type="date"
                            value={updatedData.checkIn ? new Date(updatedData.checkIn).toISOString().split('T')[0] : ''}
                            onChange={(e) =>
                                setUpdatedData((prev) => ({ ...prev, checkIn: e.target.value }))
                            }
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">Check-Out</label>
                        <input
                            type="date"
                            value={updatedData.checkOut ? new Date(updatedData.checkOut).toISOString().split('T')[0] : ''}
                            onChange={(e) =>
                                setUpdatedData((prev) => ({ ...prev, checkOut: e.target.value }))
                            }
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">No of Accommodations</label>
                        <input
                            type="number"
                            value={updatedData.noOfAccommodations || ''}
                            onChange={(e) =>
                                setUpdatedData((prev) => ({ ...prev, noOfAccommodations: e.target.value }))
                            }
                            className="border border-gray-300 rounded p-2 w-full"
                            min="1"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-300 px-4 py-2 rounded mr-2"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default UserBooking;
