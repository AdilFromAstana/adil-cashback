import React from "react";
import Button from "../component/Button";
import Input from "../component/Input";
import { useNavigate } from "react-router-dom";

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px" },
  title: { textAlign: "center" },
};

const EmployeeRegistrationPage: React.FC = () => {
  const nav = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Стать партнером</h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Оставьте заявку, и наш менеджер свяжется с вами.
      </p>
      <Input placeholder="Название вашего бизнеса" />
      <Input placeholder="Ваше имя" />
      <Input type="tel" placeholder="Контактный номер" />
      <Button
        onClick={() => {
          alert("Спасибо! Ваша заявка принята.");
        }}
      >
        Отправить заявку
      </Button>
      <button
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          color: "#555",
          marginTop: "15px",
          cursor: "pointer",
        }}
        onClick={() => nav("/login/client")}
      >
        Назад ко входу
      </button>
    </div>
  );
};

export default EmployeeRegistrationPage;
