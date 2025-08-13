import React, { useState } from "react";
import Button from "../component/Button";
import Input from "../component/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { clientLogin } from "../store/slices/clientSlice";

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px" },
  title: { textAlign: "center" },
  formContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  error: { color: "red", textAlign: "center", marginBottom: "10px" },
  linksGroup: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  linkButton: {
    fontSize: "14px",
    cursor: "pointer",
    textAlign: "center",
    marginTop: "15px",
    borderBottom: "2px solid #d4af37",
    display: "inline-block",
  },
};

const CustomerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://d10271f8f0e4.ngrok-free.app/auth/login/customer",
        { email: login, password }
      );

      const { user, accessToken, roles } = response.data;

      if (user && accessToken) {
        dispatch(clientLogin({ user: user, accessToken, roles }));

        navigate("/wallets");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Ошибка входа. Проверьте данные."
        );
      } else {
        setError("Произошла непредвиденная ошибка.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Вход для клиентов</h1>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.formContainer}>
        {/* <PhoneInput
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
        /> */}
        <Input
          type="text"
          placeholder="Почта"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </Button>
      </div>

      <div style={styles.linksGroup}>
        <div
          style={styles.linkButton}
          onClick={() => navigate("/register/customer")}
        >
          Зарегистрироваться
        </div>

        <div
          style={styles.linkButton}
          onClick={() => navigate("/login/employee")}
        >
          Вход для бизнеса
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginPage;
