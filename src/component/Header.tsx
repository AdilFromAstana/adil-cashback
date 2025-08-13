import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clientLogout } from "../store/slices/clientSlice";
import { employeeLogout } from "../store/slices/employeeSlice";
import BurgerMenu from "./BurgerMenu";
import ConfirmationModal from "./ConfirmationModal";
import type { AppRoute } from "../routesConfig";

const styles = {
  header: {
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "65px",
    borderBottom: "1px solid #d4af37",
  },
  title: { margin: 0, fontSize: "20px", fontWeight: "bold", color: "#d4af37" },
  burgerIcon: { cursor: "pointer" },
  line: {
    width: "25px",
    height: "3px",
    backgroundColor: "#d4af37",
    margin: "5px 0",
    transition: "0.4s",
  },
} as const;

const Header: React.FC<{ routes: AppRoute[] }> = memo(({ routes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    dispatch(clientLogout());
    dispatch(employeeLogout());
    setShowLogoutConfirm(false);
    navigate("/login/customer");
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Подтверждение выхода"
        message="Вы уверены, что хотите выйти?"
      />
      <header style={styles.header}>
        <h3 style={styles.title}>Әділ Сауда</h3>
        <div style={styles.burgerIcon} onClick={() => setIsOpen(!isOpen)}>
          <div style={styles.line}></div>
          <div style={styles.line}></div>
          <div style={styles.line}></div>
        </div>
        <BurgerMenu setIsOpen={setIsOpen} isOpen={isOpen} routes={routes} />
      </header>
    </>
  );
});

export default Header;
