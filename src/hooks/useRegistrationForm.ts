// src/hooks/useRegistrationForm.ts
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { validateEmail } from "../utils/validateEmail";

interface Form {
  email: string;
  password: string;
  invitedByShopId?: number;
  registrationType: "shop" | "self";
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface UseRegistrationFormReturn {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;

  shopInfo: { id?: string; name: string; loading: boolean };

  errors: FormErrors;
  isFormValid: boolean;

  apiState: { loading: boolean; success: string; error: string };
  handleRegister: (e: React.FormEvent) => Promise<void>;
}

export const useRegistrationForm = (): UseRegistrationFormReturn => {
  const [searchParams] = useSearchParams();
  const shopId = searchParams.get("shopId") || undefined;

  const [shopName, setShopName] = useState("");
  const [shopNameLoading, setShopNameLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const newErrors: FormErrors = {};

    if (email && !validateEmail(email)) {
      newErrors.email = "Некорректный формат email";
    }

    if (password && password.length < 6) {
      newErrors.password = "Пароль должен быть не менее 6 символов";
    }

    if (confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    setIsFormValid(
      Object.keys(newErrors).length === 0 &&
        !!email &&
        !!password &&
        !!confirmPassword
    );
  }, [email, password, confirmPassword]);

  useEffect(() => {
    if (shopId) {
      axios
        .get(`https://d10271f8f0e4.ngrok-free.app/shops/${shopId}`)
        .then((res) => setShopName(res.data.name))
        .catch(() => setShopName(`ID: ${shopId}`))
        .finally(() => setShopNameLoading(false));
    } else {
      setShopNameLoading(false);
    }
  }, [shopId]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload: Form = {
        email,
        password,
        invitedByShopId: Number(shopId),
        registrationType: shopId ? "shop" : "self",
      };
      const res = await axios.post(
        "https://d10271f8f0e4.ngrok-free.app/auth/register/customer",
        payload
      );
      if (res.status === 201) {
        setSuccessMessage(
          "Регистрация успешна! Подтвердите аккаунт через письмо на вашей почте."
        );
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(
          err.response?.data?.message || "Ошибка при регистрации"
        );
      } else {
        setErrorMessage("Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    shopInfo: { id: shopId, name: shopName, loading: shopNameLoading },
    errors, // <-- Отдаем новый объект ошибок
    isFormValid,
    apiState: { loading, success: successMessage, error: errorMessage },
    handleRegister,
  };
};
