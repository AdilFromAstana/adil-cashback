// src/pages/LoginPage.tsx

import React, { useState } from "react";
import Button from "../component/Button";
import Input from "../component/Input";
import type { AuthenticatedUser } from "../types";
import PhoneInput from "react-phone-input-2";

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
    const result = onLogin(login, password, activeTab);
    if (!result) {
      setError("Неверные данные для входа");
      setLogin("7");
      setPassword("");
    }
  };

  const switchTab = (tab: "customer" | "business") => {
    setActiveTab(tab);
    setLogin("7");
    setPassword("");
    setError("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Добро пожаловать!</h1>

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
        <PhoneInput
          country={"kz"}
          value={login}
          onChange={setLogin}
          placeholder="Номер телефона"
          onlyCountries={["kz"]}
          disableDropdown
          countryCodeEditable={false}
          defaultMask="-(...)-...-..-.."
          alwaysDefaultMask={true}
          inputStyle={{
            height: "50px",
            width: "100%",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
          buttonStyle={{
            border: "1px solid #ccc",
            borderRadius: "8px 0 0 8px",
            backgroundColor: "white",
          }}
          containerStyle={{
            marginBottom: "15px",
          }}
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
