import React from "react";
import Button from "../component/Button";
import Input from "../component/Input";

type CustomerRegistrationPageProps = {
  onBackToLogin: () => void;
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px" },
  title: { textAlign: "center" },
};

const CustomerRegistrationPage: React.FC<CustomerRegistrationPageProps> = ({
  onBackToLogin,
}) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Регистрация клиента</h1>
      <Input placeholder="Ваше имя" />
      <Input type="tel" placeholder="Номер телефона" />
      <Input type="password" placeholder="Придумайте пароль" />
      <Button
        onClick={() => {
          alert("Вы успешно зарегистрированы!");
          onBackToLogin();
        }}
      >
        Зарегистрироваться
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

export default CustomerRegistrationPage;
