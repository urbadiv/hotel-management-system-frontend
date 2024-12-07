// src/pages/Home.jsx
import React from "react";
import hotelbg from "../img/home-hotel.jpg";

const Home = () => {
  return (
    <main className="bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url("+hotelbg+")",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Hotel Paradise</h1>
          <p className="text-xl mb-8">
            Your luxury getaway in Ahmedabad, India.
          </p>
          <a
            href="#booking"
            className="bg-blue-600 px-6 py-3 rounded text-lg font-medium hover:bg-blue-700"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-4">Luxury Rooms</h3>
              <p>Spacious, air-conditioned rooms with premium amenities.</p>
            </div>
            <div className="bg-gray-100 p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-4">Fine Dining</h3>
              <p>Experience world-class cuisine at our gourmet restaurant.</p>
            </div>
            <div className="bg-gray-100 p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-4">Event Spaces</h3>
              <p>Host your events in our versatile and elegant venues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-16 bg-blue-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Book Your Stay</h2>
          <form className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <div className="mb-4">
              <label
                htmlFor="checkin"
                className="block text-left font-medium mb-2"
              >
                Check-In Date
              </label>
              <input
                type="date"
                id="checkin"
                className="w-full border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="checkout"
                className="block text-left font-medium mb-2"
              >
                Check-Out Date
              </label>
              <input
                type="date"
                id="checkout"
                className="w-full border-gray-300 rounded px-4 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Book Now
            </button>
          </form>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-4">Live Music Night</h3>
              <p>Join us for an unforgettable evening of live music.</p>
            </div>
            <div className="bg-gray-100 p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-4">
                Culinary Workshop
              </h3>
              <p>Learn the art of fine dining from our master chefs.</p>
            </div>
            <div className="bg-gray-100 p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-4">Wedding Showcase</h3>
              <p>Explore our stunning venues for your special day.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
