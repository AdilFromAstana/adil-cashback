import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "secondary" | "submit";
  style?: React.CSSProperties;
  disabled?: boolean;
};

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "white",
    backgroundColor: "#d4af37",
    transition: "background-color 0.2s ease-in-out",
    opacity: 1,
  },
  secondary: {
    backgroundColor: "#5856D6",
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "primary",
  style: propStyle,
  disabled = false,
}) => {
  let finalStyle =
    type === "secondary"
      ? { ...styles.button, ...styles.secondary, ...propStyle }
      : { ...styles.button, ...propStyle };

  if (disabled) {
    finalStyle = { ...finalStyle, ...styles.disabled };
  }

  return (
    <button
      style={finalStyle}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"} // Правильно обрабатываем тип
      disabled={disabled} // <-- 4. Передаем пропс в HTML-элемент
    >
      {children}
    </button>
  );
};

export default Button;
