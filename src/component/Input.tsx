import React from "react";

// Типизируем пропсы для Input, наследуя все стандартные атрибуты инпута
type InputProps = React.ComponentPropsWithoutRef<"input">;

const styles: { [key: string]: React.CSSProperties } = {
  input: {
    width: "100%",
    padding: "12px 15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    marginBottom: "15px",
  },
};

const Input: React.FC<InputProps> = (props) => {
  return <input style={styles.input} {...props} type="tel" />;
};

export default Input;
