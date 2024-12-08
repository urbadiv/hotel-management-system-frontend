import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuItemById } from '../api/menuItemApi';
import { createOrder } from '../api/orderApi';

const SingleMenuItem = () => {
  const { id } = useParams(); // Retrieve menu item ID from URL params
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await getMenuItemById(id);
        setMenuItem(response.data);
      } catch (error) {
        console.error('Error fetching menu item:', error);
        alert('Failed to load menu item details!');
      }
    };

    fetchMenuItem();
    console.log(id);
  }, [id]);

  const handleOrder = async () => {
    if (!menuItem || quantity < 1) {
      alert('Invalid menu item or quantity!');
      return;
    }

    const orderData = {
 // Assumes user ID is stored in local storage
      roomID: "sampleRoomID", // Replace with the appropriate room ID logic if applicable
      menuItemID: menuItem._id,
      menuItemName: menuItem.name,
      totalCost: menuItem.price * quantity,
      quantity,
    };

    try {
      
      
      await createOrder(orderData);
      alert('Order placed successfully!');
      navigate('/user/menu'); // Navigate back to the menu after order placement
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  if (!menuItem) {
    return <p>Loading menu item details...</p>;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-4 text-[#DAA520]">{menuItem.name}</h1>

      {/* Menu Item Details */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {menuItem.photo && (
          <img
            src={`http://localhost:8070/uploads/${menuItem.photo}`}
            alt={menuItem.name}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6">
          <p className="text-gray-700 mb-4">{menuItem.description}</p>
          <p className="text-gray-800 font-semibold mb-2">Type: {menuItem.type}</p>
          <p className="text-gray-800 font-semibold mb-4">Price: ${menuItem.price.toFixed(2)}</p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2 text-gray-700">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="border px-2 py-1 rounded w-20 text-center"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* Add to Order Button */}
          <button
            className="bg-[#DAA520] hover:bg-[#B8860B] text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
            onClick={handleOrder}
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleMenuItem;