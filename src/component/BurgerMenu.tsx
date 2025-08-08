// src/components/BurgerMenu.tsx

import React, { useState } from "react";
import type { ViewState } from "../App";

const styles: { [key: string]: React.CSSProperties } = {
  burgerIcon: { cursor: "pointer", padding: "10px", zIndex: 101 },
  line: {
    width: "25px",
    height: "3px",
    backgroundColor: "#333",
    margin: "5px 0",
    transition: "0.4s",
  },
  menuOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 99,
  },
  menu: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: "250px",
    backgroundColor: "white",
    paddingTop: "80px",
    boxShadow: "-2px 0 5px rgba(0,0,0,0.2)",
    zIndex: 100,
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
  },
  menuOpen: { transform: "translateX(0)" },
  menuItem: {
    padding: "15px 20px",
    cursor: "pointer",
    fontSize: "18px",
    borderBottom: "1px solid #eee",
  },
};

type BurgerMenuProps = {
  userType: "customer" | "owner" | "cashier";
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  userType,
  onNavigate,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Обертка, чтобы закрывать меню после клика
  const handleNavigate = (view: ViewState) => {
    onNavigate(view);
    setIsOpen(false);
  };

  const renderMenuItems = () => {
    switch (userType) {
      case "customer":
        return (
          <>
            <div
              style={styles.menuItem}
              onClick={() => handleNavigate("customer_dashboard")}
            >
              Главная
            </div>
            <div
              style={styles.menuItem}
              onClick={() => handleNavigate("shopping_list")}
            >
              История покупок
            </div>
            <div
              style={styles.menuItem}
              onClick={() => handleNavigate("settings")}
            >
              Настройки
            </div>
            <div
              style={styles.menuItem}
              onClick={() => handleNavigate("partner_registration")}
            >
              Стать партнером
            </div>
          </>
        );
      case "owner":
        return (
          <>
            <div
              style={styles.menuItem}
              onClick={() => handleNavigate("cashier_dashboard")}
            >
              Режим кассы
            </div>
            <div
              style={styles.menuItem}
              onClick={() => handleNavigate("clients_list")}
            >
              Список клиентов
            </div>
            <div
              style={styles.menuItem}
              onClick={() => handleNavigate("settings")}
            >
              Настройки
            </div>
          </>
        );
      case "cashier":
        return (
          <>
            <div
              style={styles.menuItem}
              onClick={() => handleNavigate("cashier_dashboard")}
            >
              Касса
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div style={styles.burgerIcon} onClick={() => setIsOpen(!isOpen)}>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
      </div>
      {isOpen && (
        <div style={styles.menuOverlay} onClick={() => setIsOpen(false)}></div>
      )}
      <div style={{ ...styles.menu, ...(isOpen && styles.menuOpen) }}>
        {renderMenuItems()}
        <div style={styles.menuItem} onClick={onLogout}>
          Выйти
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
