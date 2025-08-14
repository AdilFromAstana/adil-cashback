import React, { useEffect, useState, useRef } from "react";
import type { Shop } from "../../types";
import StoreGallery from "./StoreGallery";

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

  const phone = 7761156416;

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
          backgroundColor: "#335b45",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          zIndex: 1001,
          overflowY: "auto",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.2)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms ease",
          touchAction: "none",
          color: "#fff",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTransitionEnd={onTransitionEnd}
      >
        <h2 style={{ marginBottom: 8 }}>{shop.name}</h2>
        <div style={{ fontSize: 14, color: "#ccc", marginBottom: 12 }}>
          Продуктовый
        </div>

        <StoreGallery
          images={[
            {
              src: "https://findesk.ru/upload/iblock/c79/c790093a232fa5f111b4691b65c0baaf.jpg",
              caption: "Витрина",
            },
            {
              src: "https://biz-nes.ru/wp-content/uploads/2021/09/222-34.jpg",
              caption: "Отдел с овощами",
            },
            {
              src: "https://pridegrupp.ru/upload/iblock/b0c/b0c83882d5181d51d2fa17c531dc6234.jpg",
              caption: "Кассы",
            },
          ]}
        />

        {shop.address && (
          <div style={{ fontSize: 16, marginBottom: 8 }}>📍 {shop.address}</div>
        )}

        <a
          href={`tel:${phone}`}
          style={{
            display: "block",
            fontSize: 16,
            marginBottom: 16,
            color: "#fff",
            textDecoration: "none",
          }}
        >
          📞 {phone}
        </a>

        <div style={{ fontSize: 14, marginBottom: 16 }}>🕒 Круглосуточный</div>

        <div style={{ display: "flex", gap: "12px", marginBottom: 16 }}>
          <a
            href="https://t.me/yourtelegram"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 24, color: "#fff", textDecoration: "none" }}
            title="Telegram"
          >
            📱
          </a>
          <a
            href="https://wa.me/77761156416"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 24, color: "#fff", textDecoration: "none" }}
            title="WhatsApp"
          >
            💬
          </a>
          <a
            href="https://instagram.com/yourshop"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 24, color: "#fff", textDecoration: "none" }}
            title="Instagram"
          >
            📷
          </a>
          <a
            href="https://vk.com/yourshop"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 24, color: "#fff", textDecoration: "none" }}
            title="VK"
          >
            🖤
          </a>
        </div>

        <button
          style={{
            width: "100%",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "12px 0",
            borderRadius: 10,
            fontSize: 16,
          }}
          onClick={() => window.open(`https://go.2gis.com/qb05s`, "_blank")}
        >
          Стать клиентом
        </button>
      </div>
    </>
  );
};

export default ShopDetailsModal;
