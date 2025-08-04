import React from "react";
import Button from "../component/Button";
import Input from "../component/Input";

type PartnerRegistrationPageProps = {
  onBackToLogin: () => void;
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px" },
  title: { textAlign: "center" },
};

const PartnerRegistrationPage: React.FC<PartnerRegistrationPageProps> = ({
  onBackToLogin,
}) => {
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
          onBackToLogin();
        }}
      >
        Отправить заявку
      </Button>
      <button
        onClick={onBackToLogin}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          color: "#555",
          marginTop: "15px",
          cursor: "pointer",
        }}
      >
        Назад ко входу
      </button>
    </div>
  );
};

export default PartnerRegistrationPage;
