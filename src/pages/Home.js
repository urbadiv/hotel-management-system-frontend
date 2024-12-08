import React from "react";
import Slider from "react-slick";
import { Typewriter } from "react-simple-typewriter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hotelbg1 from "../img/home-hotel1.jpg";
import hotelbg2 from "../img/home-hotel2.jpg";
import hotelbg3 from "../img/home-hotel3.jpg";

const Home = () => {
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
            href="#booking"
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
              <h3 className="text-xl font-semibold mb-4">Culinary Workshop</h3>
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
