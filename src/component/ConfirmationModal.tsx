// src/components/ConfirmationModal.tsx

import React from "react";
import Button from "./Button";

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modal: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
  },
  message: {
    fontSize: "16px",
    color: "#555",
    margin: "0 0 25px 0",
  },
  actions: {
    display: "flex",
    gap: "15px",
  },
};

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <Button
            onClick={onClose}
            type="secondary"
            style={{ backgroundColor: "#eee", color: "#333" }}
          >
            Нет, остаться
          </Button>
          <Button onClick={onConfirm} style={{ backgroundColor: "#E53935" }}>
            Да, выйти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
