import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const styles = {
  container: {
    color: "#d4af37",
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  card: {
    borderRadius: "12px",
    padding: "16px",
  },
  label: { fontWeight: "bold" as const, fontSize: 14 },
  value: { fontSize: 14, color: "#d4af37" },
  button: {
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    marginBottom: "10px",
  },
};

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.client);
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      setMessage("Заполните оба поля");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/profile/change-password", {
        oldPassword,
        newPassword,
      });
      setMessage("Пароль успешно изменён");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage("Ошибка при смене пароля");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <p>Загрузка...</p>}
      {message && (
        <p style={{ color: message.includes("Ошибка") ? "red" : "green" }}>
          {message}
        </p>
      )}

      {user && (
        <div style={styles.card}>
          <p>
            <span style={styles.label}>Имя:</span>{" "}
            <span style={styles.value}>{user.name || "—"}</span>
          </p>
          <p>
            <span style={styles.label}>Email:</span>{" "}
            <span style={styles.value}>{user.email}</span>
          </p>
          <p>
            <span style={styles.label}>Телефон:</span>{" "}
            <span style={styles.value}>{user.phone || "—"}</span>
          </p>
          <p>
            <span style={styles.label}>Тип регистрации:</span>{" "}
            <span style={styles.value}>{user.registrationType}</span>
          </p>
          <p>
            <span style={styles.label}>Статус:</span>{" "}
            <span style={styles.value}>
              {user.isActive ? "Активен" : "Не активен"}
            </span>
          </p>

          {user.confirmationToken && (
            <p style={{ color: "orange" }}>Аккаунт не подтвержден</p>
          )}
        </div>
      )}

      <div style={styles.card}>
        <h3>Смена пароля</h3>
        <input
          style={styles.input}
          type="password"
          placeholder="Старый пароль"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          style={styles.button}
          onClick={changePassword}
          disabled={loading}
        >
          Изменить пароль
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
