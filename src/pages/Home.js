import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Typewriter } from "react-simple-typewriter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hotelbg1 from "../img/home-hotel1.jpg";
import hotelbg2 from "../img/home-hotel2.jpg";
import hotelbg3 from "../img/home-hotel3.jpg";
import { getEvents } from "../api/eventApi";  // Import the API function to fetch events
import room from "../img/rooms.jpg";
import dining from "../img/dining.jpg";
import event from "../img/events.png";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const heroImages = [hotelbg1, hotelbg2, hotelbg3];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await getEvents();  // Fetch all events
        setEvents(data.slice(0, 3));  // Get the first three events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Slider {...sliderSettings}>
          {heroImages.map((image, index) => (
            <div key={index} className="relative h-screen">
              <img
                src={image}
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          ))}
        </Slider>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">
            <Typewriter
              words={[
                "Welcome to Hotel Bon Bon",
                "Your Luxury Getaway Awaits",
              ]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={200} // Typing speed in ms
              deleteSpeed={50} // Deleting speed in ms
              delaySpeed={2000} // Delay between words in ms
            />
          </h1>
          <p className="text-xl mb-8">Your luxury getaway in Homagama, Sri Lanka.</p>
          <a
            href="/user/booking"
            className="bg-transparent hover:bg-white hover:border-transparent text-white border border-white px-6 py-3 rounded text-lg font-medium"
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
              <img src={room} alt="Luxury Rooms" className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-4">Luxury Rooms</h3>
              <p>Spacious, air-conditioned rooms with premium amenities.</p>
            </div>
            <div className="bg-gray-100 p-6 shadow rounded">
              <img src={dining} alt="Fine Dining" className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-4">Fine Dining</h3>
              <p>Experience world-class cuisine at our gourmet restaurant.</p>
            </div>
            <div className="bg-gray-100 p-6 shadow rounded">
              <img src={event} alt="Event Spaces" className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-4">Event Spaces</h3>
              <p>Host your events in our versatile and elegant venues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-100 p-6 shadow rounded">
                <EventCard key={event.id} event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
