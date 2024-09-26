/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

// CarouselItem Component
const CarouselItem = ({ children }) => {
  return <div className="flex-shrink-0 w-full">{children}</div>;
};

// Carousel Component
const Carousel = ({ children, autoplayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Function to go to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  // Function to go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
    );
  };

  // Autoplay effect
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        handleNext();
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [currentIndex, autoplay, autoplayInterval]);

  // Function to handle dot click
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        {children}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-red-200 hover:bg-red-400 text-white p-1 px-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-red-200 hover:bg-red-400 text-white p-1 px-2 rounded-full"
      >
        &gt;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {React.Children.map(children, (child, index) => (
          <span
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-red-600" : "bg-red-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Slider Component
const Slider = () => {
  const slides = [
    {
      id: 1,
      imgSrc:
        "https://img.freepik.com/free-photo/flyer-with-copyspace-portrait-young-caucasian-woman-isolated-with-copyspace_155003-27627.jpg?t=st=1726128381~exp=1726131981~hmac=a3335c87be0096bb4e593fd9c83f4324eb023ded3a1aa3cf63a52f9b60598b88&w=1380",
    },
    {
      id: 2,
      imgSrc:
        "https://img.freepik.com/premium-photo/women-s-men-s-hands-delivering-gift-boxes_58797-1346.jpg?w=1380",
    },
  ];

  return (
    <Carousel autoplayInterval={3000}>
      {slides.map((slide) => (
        <CarouselItem key={slide.id}>
          <div className="flex h-40 lg:h-96 min-w-full items-center justify-center">
            <img
              src={slide.imgSrc}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-contain md:object-cover"
            />
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default Slider;
