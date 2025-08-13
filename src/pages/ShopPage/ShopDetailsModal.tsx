import React, { useEffect, useState, useRef } from "react";

type Shop = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

interface ShopDetailsModalProps {
  shop: Shop;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 100;

const ShopDetailsModal: React.FC<ShopDetailsModalProps> = ({
  shop,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const touchStartY = useRef<number | null>(null);
  const currentTranslateY = useRef(0);

  const handleClose = () => {
    setVisible(false);
  };

  const onTransitionEnd = () => {
    if (!visible) {
      setShouldRender(false);
      onClose();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null || !modalRef.current) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;

    // Разрешаем свайп вниз только если скролл у модалки на 0 (т.е. верх)
    if (diff > 0 && modalRef.current.scrollTop === 0) {
      currentTranslateY.current = diff;
      e.currentTarget.style.transform = `translateY(${diff}px)`;
      e.currentTarget.style.transition = "none";
      e.preventDefault(); // отменяем скролл страницы/модалки
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (currentTranslateY.current > SWIPE_THRESHOLD) {
      handleClose();
    } else {
      e.currentTarget.style.transform = `translateY(0)`;
      e.currentTarget.style.transition = "transform 300ms ease";
    }
    touchStartY.current = null;
    currentTranslateY.current = 0;
  };

  useEffect(() => {
    setVisible(true);
    return () => {
      touchStartY.current = null;
      currentTranslateY.current = 0;
      setVisible(false);
      setShouldRender(true);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <div
        id="card-background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100svh",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms ease",
          pointerEvents: visible ? "auto" : "none",
        }}
        onClick={handleClose}
      />
      <div
        ref={modalRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "75vh",
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          zIndex: 1001,
          overflowY: "auto",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.2)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms ease",
          touchAction: "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTransitionEnd={onTransitionEnd}
      >
        <h2>{shop.name}</h2>
        <p>Широта: {shop.latitude}</p>
        <p>Долгота: {shop.longitude}</p>
        <a href="https://go.2gis.com/qb05s" target="_blank">
          Открыть в 2ГИС
        </a>
      </div>
    </>
  );
};

export default ShopDetailsModal;
