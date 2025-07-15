import { useEffect, useState } from "react";
import { CarousalData } from "../../../data/CarousalData";
import "./Carousal.css";

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CarousalData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{
          width: `${CarousalData.length * 100}vw`,
          transform: `translateX(-${current * 100}vw)`,
        }}
      >
        {CarousalData.map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt={`car-${item.id}`}
            className="carousel-image"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
