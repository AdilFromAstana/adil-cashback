import React from "react";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "20px 0",
    color: "#888",
    fontSize: "14px",
    fontWeight: "500",
  },
  line: {
    flexGrow: 1,
    height: "1px",
    backgroundColor: "#ddd",
  },
  text: {
    padding: "0 15px", // Расстояние между линиями и текстом
  },
};

type DividerProps = {
  children: React.ReactNode;
};

const Divider: React.FC<DividerProps> = ({ children }) => {
  return (
    <div style={styles.container}>
      <div style={styles.line}></div>
      <span style={styles.text}>{children}</span>
      <div style={styles.line}></div>
    </div>
  );
};

export default Divider;
