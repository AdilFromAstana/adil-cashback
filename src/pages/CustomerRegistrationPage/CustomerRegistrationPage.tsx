import React from "react";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import Button from "../../component/Button";
import Input from "../../component/Input";
import { useNavigate } from "react-router-dom";

const colors = {
  accent: "#d4af37", // золотистый
  lightBackground: "#335b45", // светлее для полей
  textLight: "#ffffff",
  textMuted: "#cccccc",
  error: "#ff6b6b",
};

const styles = {
  container: {
    padding: 20,
    borderRadius: 12,
    textAlign: "center",
    color: colors.textLight,
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: colors.accent,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    textAlign: "left",
  },
  inputGroup: { marginBottom: "10px" },
  errorText: {
    color: colors.error,
    fontSize: "12px",
    marginTop: "4px",
    textAlign: "left",
  },
  inviteMessage: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: colors.lightBackground,
    border: `1px solid ${colors.accent}`,
    borderRadius: "8px",
    marginBottom: "15px",
    color: colors.textLight,
  },
  apiMessage: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },
  successMessage: {
    backgroundColor: "#335b45",
    color: "#a5d6a7",
  },
  errorMessage: {
    backgroundColor: "#5c1a1a",
    color: colors.error,
  },
  successIcon: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  successText: {
    fontSize: "16px",
    color: colors.textLight,
    lineHeight: 1.5,
    marginBottom: "30px",
  },
  backButton: {
    width: "100%",
    background: "transparent",
    border: "none",
    color: colors.textLight,
    marginTop: "15px",
    cursor: "pointer",
  },
} as const;

const CustomerRegistrationPage: React.FC = () => {
  const nav = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    shopInfo,
    errors,
    isFormValid,
    apiState,
    handleRegister,
  } = useRegistrationForm();

  if (apiState.success) {
    return (
      <div style={styles.container}>
        <div style={styles.successIcon}>✅</div>
        <h2 style={styles.title}>Регистрация почти завершена!</h2>
        <p style={styles.successText}>{apiState.success}</p>
        <Button type="primary">Вернуться на страницу входа</Button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Регистрация клиента</h1>

      {shopInfo.id && (
        <div style={styles.inviteMessage}>
          {shopInfo.loading ? (
            <p>Загрузка...</p>
          ) : (
            <p>
              Вы приглашены магазином <br />
              <strong>"{shopInfo.name}"</strong>
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleRegister} style={styles.form}>
        <div style={styles.inputGroup}>
          <Input
            type="email"
            placeholder="Ваш Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={apiState.loading}
          />
          {errors.email && <div style={styles.errorText}>{errors.email}</div>}
        </div>

        <div style={styles.inputGroup}>
          <Input
            type="password"
            placeholder="Придумайте пароль (мин. 6 симв.)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={apiState.loading}
          />
          {errors.password && (
            <div style={styles.errorText}>{errors.password}</div>
          )}
        </div>

        <div style={styles.inputGroup}>
          <Input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={apiState.loading}
          />
          {errors.confirmPassword && (
            <div style={styles.errorText}>{errors.confirmPassword}</div>
          )}
        </div>

        <Button type="submit" disabled={!isFormValid || apiState.loading}>
          {apiState.loading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </form>

      {apiState.error && (
        <p style={{ ...styles.apiMessage, ...styles.errorMessage }}>
          {apiState.error}
        </p>
      )}

      <button onClick={() => nav("/login/client")} style={styles.backButton}>
        Назад ко входу
      </button>
    </div>
  );
};

export default CustomerRegistrationPage;
