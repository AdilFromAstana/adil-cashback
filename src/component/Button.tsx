import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  type?: "primary" | "secondary";
  style?: React.CSSProperties;
};

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "white",
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "#5856D6",
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "primary",
  style: propStyle,
}) => {
  const finalStyle =
    type === "secondary"
      ? { ...styles.button, ...styles.secondary, ...propStyle }
      : { ...styles.button, ...propStyle };

  return (
    <button style={finalStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
