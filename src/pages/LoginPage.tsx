// src/pages/LoginPage.tsx

import React, { useState } from "react";
import Button from "../component/Button";
import Input from "../component/Input";
import type { AuthenticatedUser } from "../types";

type LoginPageProps = {
  onLogin: (
    login: string,
    password: string,
    type: "customer" | "business"
  ) => AuthenticatedUser | null;
  onNavigateToCustomerRegistration: () => void;
  onNavigateToPartnerRegistration: () => void;
};

// Стили для нашего компонента
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px" },
  title: { textAlign: "center" },
  tabsContainer: {
    display: "flex",
    marginBottom: "20px",
    borderBottom: "1px solid #eee",
  },
  tab: {
    flex: 1,
    padding: "15px",
    textAlign: "center",
    cursor: "pointer",
    color: "#888",
    fontWeight: "500",
  },
  activeTab: {
    color: "#007AFF",
    fontWeight: "bold",
    borderBottom: "2px solid #007AFF",
  },
  formContainer: { marginTop: "20px" },
  error: { color: "red", textAlign: "center", marginBottom: "10px" },
  linkButton: {
    fontSize: "14px",
    color: "#007AFF",
    cursor: "pointer",
    textAlign: "center",
    marginTop: "15px",
  },
  separator: { textAlign: "center", margin: "20px 0", color: "#aaa" },
};

const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onNavigateToCustomerRegistration,
  onNavigateToPartnerRegistration,
}) => {
  // Добавляем состояние для активной вкладки
  const [activeTab, setActiveTab] = useState<"customer" | "business">(
    "customer"
  );

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Вызываем onLogin с правильным типом в зависимости от активной вкладки
    const result = onLogin(login, password, activeTab);
    if (!result) {
      setError("Неверные данные для входа");
      // Очищаем поля после неудачной попытки
      setLogin("");
      setPassword("");
    }
  };

  // Сбрасываем поля при переключении вкладок
  const switchTab = (tab: "customer" | "business") => {
    setActiveTab(tab);
    setLogin("");
    setPassword("");
    setError("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Добро пожаловать!</h1>

      {/* Контейнер с вкладками */}
      <div style={styles.tabsContainer}>
        <div
          style={
            activeTab === "customer"
              ? { ...styles.tab, ...styles.activeTab }
              : styles.tab
          }
          onClick={() => switchTab("customer")}
        >
          Я клиент
        </div>
        <div
          style={
            activeTab === "business"
              ? { ...styles.tab, ...styles.activeTab }
              : styles.tab
          }
          onClick={() => switchTab("business")}
        >
          Я бизнес
        </div>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {/* Форма входа */}
      <div style={styles.formContainer}>
        <Input
          type={activeTab === "customer" ? "tel" : "text"}
          placeholder={
            activeTab === "customer" ? "Номер телефона" : "Логин бизнеса"
          }
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Войти</Button>
      </div>

      {/* Кнопки регистрации */}
      {activeTab === "customer" ? (
        <div
          style={styles.linkButton}
          onClick={onNavigateToCustomerRegistration}
        >
          У меня еще нет аккаунта. Зарегистрироваться
        </div>
      ) : (
        <div
          style={styles.linkButton}
          onClick={onNavigateToPartnerRegistration}
        >
          Хочу стать партнером. Оставить заявку
        </div>
      )}
    </div>
  );
};

export default LoginPage;
