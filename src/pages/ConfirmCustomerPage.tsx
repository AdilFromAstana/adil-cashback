import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../component/Button";
import { useDispatch } from "react-redux";
import { clientLogin } from "../store/slices/clientSlice";
import api from "../api/axiosInstance";

const styles = {
  container: {
    padding: 20,
    textAlign: "center",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  title: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  message: {
    fontSize: "16px",
    color: "#fff",
    lineHeight: 1.6,
    marginBottom: "30px",
  },
} as const;

type Status = "loading" | "success" | "error";

const ConfirmCustomerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("Подтверждаем ваш аккаунт...");

  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Ошибка: токен подтверждения не найден.");
      return;
    }

    const confirmAccount = async () => {
      try {
        const res = await api.post("/auth/confirm/customer", { token });

        const { user, accessToken, walletId, roles } = res.data;

        if (!user || !accessToken) {
          throw new Error("Неверный ответ от сервера");
        }

        dispatch(clientLogin({ user: user, accessToken, roles }));
        setStatus("success");

        if (walletId) {
          setMessage(
            "Аккаунт подтвержден! Перенаправляем вас на страницу магазина"
          );

          setCountdown(3); // Начинаем с 3 секунд
          const timer = setInterval(() => {
            setCountdown((prevCount) => {
              if (prevCount === null || prevCount <= 1) {
                clearInterval(timer);
                navigate(`/wallets/${walletId}`);
                return null;
              }
              return prevCount - 1;
            });
          }, 1000); // Обновляем каждую секунду
        } else {
          setMessage(
            "Аккаунт подтвержден! Перенаправляем в ваш личный кабинет..."
          );
          setTimeout(() => {
            navigate("/shops");
          }, 3000);
        }
      } catch (err) {
        setStatus("error");
        if (axios.isAxiosError(err)) {
          setMessage(
            err.response?.data?.message ||
              "Ошибка подтверждения. Возможно, ссылка устарела."
          );
        } else {
          setMessage("Произошла неизвестная ошибка.");
        }
      }
    };

    confirmAccount();
  }, [searchParams, navigate]);

  const renderContent = () => {
    switch (status) {
      case "success":
        return { icon: "✅", title: "Отлично!" };
      case "error":
        return { icon: "❌", title: "Что-то пошло не так" };
      default:
        return { icon: "⏳", title: "Подождите..." };
    }
  };

  const { icon, title } = renderContent();

  return (
    <div style={styles.container}>
      <div style={styles.icon}>{icon}</div>
      <h2 style={styles.title}>{title}</h2>
      {/* --- 3. Отображаем таймер в сообщении --- */}
      <p style={styles.message}>
        {message}
        {countdown !== null && ` через ${countdown}...`}
      </p>
      {status === "error" && (
        <Button onClick={() => navigate("/login")}>
          Вернуться на страницу входа
        </Button>
      )}
    </div>
  );
};

export default ConfirmCustomerPage;
