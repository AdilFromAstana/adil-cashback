import React, { useState, useRef } from "react";

interface StoreGalleryProps {
  images: { src: string; caption?: string }[];
}

const StoreGallery: React.FC<StoreGalleryProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide(); // свайп влево
    if (diff < -50) prevSlide(); // свайп вправо
    touchStartX.current = null;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        borderRadius: 10
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Слайды */}
      <div
        style={{
          display: "flex",
          transition: "transform 0.3s ease",
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              minWidth: "100%",
              position: "relative",
              userSelect: "none",
            }}
          >
            <img
              src={img.src}
              alt={img.caption || `Фото ${index + 1}`}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            {img.caption && (
              <div
                style={{
                  position: "absolute",
                  bottom: "5px",
                  left: "5px",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки (ПК) */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          padding: "5px 8px",
          cursor: "pointer",
          borderRadius: "50%",
        }}
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          padding: "5px 8px",
          cursor: "pointer",
          borderRadius: "50%",
        }}
      >
        ▶
      </button>

      {/* Индикаторы */}
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "5px",
        }}
      >
        {images.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: current === idx ? "white" : "rgba(255,255,255,0.5)",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StoreGallery;
