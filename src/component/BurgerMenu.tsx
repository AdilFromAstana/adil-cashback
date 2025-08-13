import React, { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clientLogout } from "../store/slices/clientSlice";
import { employeeLogout } from "../store/slices/employeeSlice";
import type { RootState } from "../store/store";
import { type AppRoute } from "../routesConfig";

const styles: { [key: string]: React.CSSProperties } = {
  crossContainer: {
    width: "24px",
    height: "24px",
    position: "relative" as const,
    cursor: "pointer",
  },
  line: {
    position: "absolute" as const,
    height: "3px",
    width: "100%",
    backgroundColor: "#d4af37",
    top: "50%",
    left: 0,
    transformOrigin: "center",
    borderRadius: "2px",
  },
  line1: { transform: "rotate(45deg)" },
  line2: { transform: "rotate(-45deg)" },
  menuOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100svh",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100000,
  },
  menu: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100%",
    width: "250px",
    backgroundColor: "#335b45",
    boxShadow: "-2px 0 5px rgba(0,0,0,0.2)",
    zIndex: 100001,
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
  },
  menuOpen: { transform: "translateX(0)" },
  menuItem: {
    color: "white",
    padding: "15px 20px",
    cursor: "pointer",
    fontSize: "18px",
    borderBottom: "1px solid #eee",
    userSelect: "none",
  },
  menuItemActive: {
    backgroundColor: "#2a4a37",
    color: "#d4af37",
    fontWeight: "bold",
    cursor: "default",
  },
};

interface BurgerMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  routes: AppRoute[];
}

const BurgerMenu: React.FC<BurgerMenuProps> = memo(
  ({ isOpen, setIsOpen, routes }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const checkActive = (routePath: string) =>
      location.pathname === routePath ||
      location.pathname.startsWith(routePath + "/");

    const clientAuth = useSelector(
      (state: RootState) => state.client.isAuthenticated
    );
    const employeeAuth = useSelector(
      (state: RootState) => state.employee.isAuthenticated
    );

    let onLogout: () => void = () => navigate("/login");

    if (clientAuth) {
      onLogout = () => {
        navigate("/");
        dispatch(clientLogout());
      };
    } else if (employeeAuth) {
      onLogout = () => {
        navigate("/");
        dispatch(employeeLogout());
      };
    }

    const handleNavigate = (path: string) => {
      navigate(path);
      setIsOpen(false);
    };

    return (
      <>
        {isOpen && (
          <div style={styles.menuOverlay} onClick={() => setIsOpen(false)} />
        )}

        <div style={{ ...styles.menu, ...(isOpen && styles.menuOpen) }}>
          <div
            style={{
              padding: "15px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label
              style={{ fontSize: 24, color: "#d4af37", lineHeight: "24px" }}
            >
              Меню
            </label>
            <div
              style={styles.crossContainer}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div style={{ ...styles.line, ...styles.line1 }}></div>
              <div style={{ ...styles.line, ...styles.line2 }}></div>
            </div>
          </div>
          <div style={{ height: "100%", overflowY: "scroll" }}>
            {routes
              .filter((route) => route.showInMenu)
              .map((item) => {
                const active = checkActive(item.path);
                return (
                  <div
                    key={item.path}
                    style={{
                      ...styles.menuItem,
                      ...(active ? styles.menuItemActive : {}),
                    }}
                    onClick={
                      active ? undefined : () => handleNavigate(item.path)
                    }
                  >
                    {item.label}
                  </div>
                );
              })}
            <div
              style={styles.menuItem}
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
            >
              Выйти
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default BurgerMenu;
