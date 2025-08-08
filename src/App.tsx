// src/App.tsx

import React, { useState } from "react";
import type { AuthenticatedUser, Client } from "./types";
import { businesses, clients } from "./mockData";

import Header from "./component/Header";
import LoginPage from "./pages/LoginPage";
import CustomerView from "./pages/CustomerView";
import CashierView from "./pages/CashierView";
import CustomerRegistrationPage from "./pages/CustomerRegistrationPage";
import PartnerRegistrationPage from "./pages/PartnerRegistrationPage";
import SettingsPage from "./pages/SettingsPage";
import ClientsPage from "./pages/ClientsPage";
import TxHistoryPage from "./pages/TxHistoryPage";

export type ViewState =
  | "login"
  | "customer_dashboard"
  | "cashier_dashboard"
  | "customer_registration"
  | "partner_registration"
  | "settings"
  | "shopping_list"
  | "clients_list";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(
    null
  );
  const [view, setView] = useState<ViewState>("login");

  const handleLogin = (
    login: string,
    password: string,
    type: "customer" | "business"
  ): AuthenticatedUser | null => {
    let user: AuthenticatedUser | undefined;
    if (type === "customer") {
      const foundClient = clients.find(
        (c) =>
          c.phone.includes(login.replace(/\D/g, "").slice(-10)) &&
          c.password === password
      );
      if (foundClient) {
        user = { type: "customer", data: foundClient };
        setView("customer_dashboard");
      }
    } else {
      const foundOwner = businesses.find(
        (b) => b.ownerLogin === login && b.ownerPassword === password
      );
      if (foundOwner) {
        user = { type: "owner", data: foundOwner };
        setView("cashier_dashboard");
      } else {
        const foundCashier = businesses.find(
          (b) => b.cashierLogin === login && b.cashierPassword === password
        );
        if (foundCashier) {
          user = { type: "cashier", data: foundCashier };
          setView("cashier_dashboard");
        }
      }
    }
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("login");
  };

  const renderContent = () => {
    if (currentUser) {
      switch (view) {
        case "customer_dashboard":
          return <CustomerView customer={currentUser.data as any} />;
        case "cashier_dashboard":
          return <CashierView business={currentUser.data as any} />;
        case "settings":
          const goBackToDashboard = () => {
            if (currentUser.type === "customer") setView("customer_dashboard");
            if (currentUser.type === "owner") setView("cashier_dashboard");
            if (currentUser.type === "cashier") setView("cashier_dashboard");
          };
          return <SettingsPage onBack={goBackToDashboard} />;
        case "shopping_list":
          return <TxHistoryPage customer={currentUser.data as Client} />;
        case "partner_registration":
          return <PartnerRegistrationPage onBackToLogin={handleLogout} />;
        case "clients_list":
          return <ClientsPage />;
        default:
          if (currentUser.type === "customer") setView("customer_dashboard");
          if (currentUser.type === "owner") setView("cashier_dashboard");
          if (currentUser.type === "cashier") setView("cashier_dashboard");
          return null;
      }
    }

    switch (view) {
      case "customer_registration":
        return (
          <CustomerRegistrationPage onBackToLogin={() => setView("login")} />
        );
      case "partner_registration":
        return (
          <PartnerRegistrationPage onBackToLogin={() => setView("login")} />
        );
      default:
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToCustomerRegistration={() =>
              setView("customer_registration")
            }
            onNavigateToPartnerRegistration={() =>
              setView("partner_registration")
            }
          />
        );
    }
  };

  return (
    <div>
      <Header
        user={currentUser}
        onLogout={handleLogout}
        onNavigate={setView} // Передаем одну функцию для всей навигации
      />
      {renderContent()}
    </div>
  );
};

export default App;
