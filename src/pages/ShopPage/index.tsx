import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopsList from "./ShopsList"; // ваш список (адаптируем ниже)
import ShopsMap from "./ShopsMap"; // карта (адаптируем ниже)

const styles = {
  container: {
    padding: "20px",
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "20px",
    color: "#d4af37",
    fontWeight: "700",
    lineHeight: 1,
    fontSize: 32,
  },

  toggleButtonsWrapper: {
    position: "fixed",
    bottom: 30,
    right: 30,
    display: "flex",
    borderRadius: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },

  toggleButton: (active: boolean) => ({
    padding: "12px 24px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: active ? "#335b45" : "#d4af37",
    backgroundColor: active ? "#d4af37" : "transparent",
    transition: "all 0.25s ease",
    userSelect: "none" as "none",
  }),
} as const;

type Shop = {
  id: number;
  name: string;
  latitude: number; // широта
  longitude: number; // долгота
  imageUrl?: string;
};

const ShopsPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  useEffect(() => {
    axios
      .get("https://d10271f8f0e4.ngrok-free.app/shops")
      .then((res) => {
        setShops(res.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Загрузка магазинов...</h2>
      </div>
    );

  return (
    <div style={styles.container}>
      <div style={styles.title}>Партнеры</div>
      {viewMode === "list" ? (
        <ShopsList shops={shops} />
      ) : (
        <ShopsMap shops={shops} />
      )}
      <div style={styles.toggleButtonsWrapper}>
        <button
          style={styles.toggleButton(true)} // всегда активна одна кнопка, тк одна кнопка для переключения
          onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
        >
          {viewMode === "map" ? "Список" : "Карта"}
        </button>
      </div>
    </div>
  );
};

export default ShopsPage;
