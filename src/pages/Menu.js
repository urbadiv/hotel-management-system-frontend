import React, { useState, useEffect } from 'react';
import { getAllMenuItems } from '../api/menuItemApi';
import { createOrder } from '../api/orderApi';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filterType, setFilterType] = useState('All'); // State to track the selected filter type

  // Fetch menu items using provided Axios instance
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await getAllMenuItems();
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items', error);
        alert('Failed to load menu items!');
      }
    };
    fetchMenuItems();
  }, []);

  // Handle order creation
  const handleAddToOrder = async (menuItem) => {
    try {
      const orderData = {
        roomID: 'room123', // Example room ID
        menuItemID: menuItem._id,
        quantity: 1,
      };
      const response = await createOrder(orderData);
      alert(`Order created for ${menuItem.name}!`);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to create order', error);
      alert('Something went wrong while adding to order');
    }
  };

  // Filter menu items by type
  const filteredMenuItems = filterType === 'All'
    ? menuItems
    : menuItems.filter(item => item.type === filterType);

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-4 text-[#DAA520]">Menu</h1>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          className="border-gray-400 border px-3 py-2 rounded-lg"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      {/* Menu Items Section */}
      <div className="flex flex-wrap justify-center gap-6 max-w-screen-lg mx-auto">
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item) => (
            <div
              className="bg-white shadow-md rounded-lg p-4 w-80 text-center transition transform hover:scale-105"
              key={item._id}
            >
              {/* Menu Item Photo */}
              {item.photo && (
                <img
                  src={`http://localhost:8070/uploads/${item.photo}`}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-2"
                />
              )}

              {/* Menu Details */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-sm text-gray-700 mb-2">Type: {item.type}</p>
              <p className="text-sm text-gray-700 mb-4">Price: ${item.price.toFixed(2)}</p>

              {/* Add to Order Button */}
              <button
                className="bg-[#DAA520] hover:bg-[#B8860B] text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                onClick={() => handleAddToOrder(item)}
              >
                Add to Order
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No menu items available for the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
