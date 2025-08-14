import React, { useState } from "react";
import Button from "../component/Button";
import FloatingInput from "../component/FloatingInput";
import api from "../api/axiosInstance";

const BecomePartnerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    cashbackPercent: 3,
    description: "",
    address: "",
    city: "",
    latitude: "",
    longitude: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Введите название магазина");
      return;
    }
    if (!formData.address.trim()) {
      alert("Введите адрес магазина");
      return;
    }
    if (!formData.city.trim()) {
      alert("Введите город");
      return;
    }
    if (formData.cashbackPercent < 0 || formData.cashbackPercent > 100) {
      alert("Кэшбэк должен быть от 0 до 100%");
      return;
    }

    try {
      const res = await api.post("/shops/create", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Shop created:", res.data);
      alert("Заявка отправлена успешно");
    } catch (error: any) {
      console.error("Ошибка при создании магазина:", error);
      alert(error.response?.data?.message || "Ошибка при создании магазина");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          textAlign: "center",
          lineHeight: 1,
          fontSize: 32,
          fontWeight: 700,
          color: "#d4af37",
        }}
      >
        Стать партнёром
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <FloatingInput
          label="Название магазина *"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FloatingInput
          type="number"
          name="cashbackPercent"
          label="Кэшбэк (%)"
          value={formData.cashbackPercent}
          onChange={handleChange}
          min={0}
          max={100}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />

        <FloatingInput
          type="text"
          name="address"
          label="Адрес *"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <FloatingInput
          type="text"
          name="city"
          label="Город *"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <FloatingInput
          type="number"
          name="latitude"
          label="Широта"
          value={formData.latitude}
          onChange={handleChange}
          step="any"
        />

        <FloatingInput
          type="number"
          name="longitude"
          label="Долгота"
          value={formData.longitude}
          onChange={handleChange}
          step="any"
        />

        <FloatingInput
          type="url"
          name="imageUrl"
          label="Ссылка на изображение"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <Button type="submit">Отправить заявку</Button>
      </form>
    </div>
  );
};

export default BecomePartnerPage;
