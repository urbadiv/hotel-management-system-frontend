import React, { useState, useEffect } from 'react';
import {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} from '../api/menuItemApi';
import Modal from 'react-modal';

const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        type: 'Breakfast',
        photo: null,
    });
    const [editId, setEditId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('All');

    // Fetch menu items
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const { data } = await getAllMenuItems();
                setMenuItems(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMenuItems();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.description || !form.price || !form.type) {
            setError('All fields except photo are required.');
            return;
        }
        setError('');

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('type', form.type);
        if (form.photo) formData.append('photo', form.photo);

        try {
            if (editId) {
                await updateMenuItem(editId, formData);
            } else {
                await createMenuItem(formData);
            }
            setForm({ name: '', description: '', price: '', type: 'Breakfast', photo: null });
            setEditId(null);
            setModalOpen(false);
            const { data } = await getAllMenuItems();
            setMenuItems(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await deleteMenuItem(id);
            setMenuItems(menuItems.filter((item) => item._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // Open edit modal
    const handleEdit = (item) => {
        setForm({
            name: item.name,
            description: item.description,
            price: item.price,
            type: item.type,
            photo: null,
        });
        setEditId(item._id);
        setModalOpen(true);
    };

    // Filter menu items by category
    const filteredMenuItems = filter === 'All'
        ? menuItems
        : menuItems.filter((item) => item.type === filter);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Menu Management</h1>
                <div className="flex items-center space-x-4">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="All">All</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                    <button
                        onClick={() => {
                            setForm({
                                name: '',
                                description: '',
                                price: '',
                                type: 'Breakfast',
                                photo: null,
                            });
                            setEditId(null);
                            setModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    >
                        <span className="text-xl mr-2">+</span> Add Item
                    </button>
                </div>
            </div>

            {/* Menu Items List */}
            <div className="grid gap-4">
                {filteredMenuItems.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border rounded">
                        <div>
                            <h2 className="font-bold">{item.name}</h2>
                            <p>{item.description}</p>
                            <p className="text-gray-500">${item.price.toFixed(2)}</p>
                            <p className="italic">{item.type}</p>
                            {item.photo && (
                                <img
                                    src={`http://localhost:8070/uploads/${item.photo}`}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover mt-2"
                                />
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="bg-green-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                className="bg-white p-6 max-w-lg mx-auto rounded shadow-md"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-bold mb-4">
                    {editId ? 'Update Menu Item' : 'Add Menu Item'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        ></textarea>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                        {editId ? 'Update Item' : 'Add Item'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default MenuManagement;
