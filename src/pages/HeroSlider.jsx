// HeroSlider.jsx

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// স্লাইড ইমেজ ইমপোর্ট
import Easily from "../assets/slider/Water-Bill.jpg";
import Electricity from "../assets/slider/Water-Bill.jpg";
import Water from "../assets/slider/water-bill.jpg";
import Internet from "../assets/slider/Water-Bill.jpg";
import { Link } from "react-router";

// স্লাইডের ডেটা অ্যারে
const slides = [
  {
    img: Easily,
    title: "Pay Your Bills Easily",
    text: "Manage all your utility bills in one place. Electricity, gas, water, internet - pay them all with just a few clicks!",
    link: "/bills"
  },
  {
    img: Electricity,
    title: "Electricity Bills",
    text: "Never miss an electricity bill. Track and pay on time.",
    link: "/pages/electricity/"
  },
  {
    img: Water,
    title: "Water Bill Payment",
    text: "Pay your water bills from the comfort of your home.",
    link: "/pages/water/"
  },
  {
    img: Internet,
    title: "Internet Bill",
    text: "Seamless internet bill payment with instant confirmation.",
    link: "/pages/internet/"
  }
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    fade: true
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="px-4">
            <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center shadow-lg">
              {/* স্লাইড ছবি */}
              <div className="md:w-1/2 mb-6 md:mb-0">
                <img 
                  src={slide.img} 
                  alt={slide.title}
                  className="w-full max-w-md rounded-lg shadow-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/500x300?text=Image+Not+Found";
                  }}
                />
              </div>

              {/* স্লাইড টেক্সট ও বাটন */}
              <div className="md:w-1/2 md:pl-8 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg mb-6">{slide.text}</p>
                <Link 
                  to={slide.link}
                  className="inline-block bg-white text-amber-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300"
                >
                  Pay Bills Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
