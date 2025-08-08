// src/components/Header.tsx

import React, { useState } from "react";
import type { AuthenticatedUser } from "../types";
import type { ViewState } from "../App";
import BurgerMenu from "./BurgerMenu";
import ConfirmationModal from "./ConfirmationModal";

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff",
  },
  title: { margin: 0, fontSize: "20px", fontWeight: "bold" },
};

type HeaderProps = {
  user: AuthenticatedUser | null;
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
};

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) return null;

  const handleLogoutClick = () => setShowLogoutConfirm(true);

  const renderTitle = () => {
    switch (user.type) {
      case "customer":
        return `Здравствуйте, ${user.data.name.split(" ")[0]}!`;
      case "owner":
      case "cashier":
        return user.data.name;
      default:
        return "Панель";
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={onLogout}
        title="Подтверждение выхода"
        message="Вы уверены, что хотите выйти?"
      />
      <header style={styles.header}>
        <h3 style={styles.title}>{renderTitle()}</h3>
        {/* Всегда рендерим бургер-меню, если пользователь залогинен */}
        <BurgerMenu
          userType={user.type}
          onNavigate={onNavigate}
          onLogout={handleLogoutClick}
        />
      </header>
    </>
  );
};

export default Header;
