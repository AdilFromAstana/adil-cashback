// src/App.tsx

import React, { useState } from "react";
import type { AuthenticatedUser } from "./types";
import { businesses, clients } from "./mockData";

import Header from "./component/Header"; // <-- Импортируем наш новый хедер
import LoginPage from "./pages/LoginPage";
import CustomerView from "./pages/CustomerView";
import OwnerView from "./pages/OwnerView";
import CashierView from "./pages/CashierView";
import CustomerRegistrationPage from "./pages/CustomerRegistrationPage";
import PartnerRegistrationPage from "./pages/PartnerRegistrationPage";

type ViewState =
  | "login"
  | "customer_dashboard"
  | "owner_dashboard"
  | "cashier_dashboard"
  | "customer_registration"
  | "partner_registration";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(
    null
  );
  const [view, setView] = useState<ViewState>("login");

  // ... (функция handleLogin остается без изменений) ...
  const handleLogin = (
    login: string,
    password: string,
    type: "customer" | "business"
  ): AuthenticatedUser | null => {
    let user: AuthenticatedUser | undefined;

    if (type === "customer") {
      const cleanPhone = login.replace(/\D/g, "");
      const foundClient = clients.find(
        (c) =>
          c.phone.includes(cleanPhone.slice(-10)) && c.password === password
      );
      if (foundClient) {
        user = { type: "customer", data: foundClient };
        setView("customer_dashboard");
      }
    } else {
      // 'business'
      const foundOwner = businesses.find(
        (b) => b.ownerLogin === login && b.ownerPassword === password
      );
      if (foundOwner) {
        user = { type: "owner", data: foundOwner };
        setView("owner_dashboard");
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
    // ... (эта функция тоже остается почти без изменений, просто передаем меньше пропсов) ...
    if (currentUser) {
      if (currentUser.type === "customer" && view === "partner_registration") {
        return <PartnerRegistrationPage onBackToLogin={handleLogout} />;
      }
      switch (currentUser.type) {
        case "customer":
          return <CustomerView customer={currentUser.data} />;
        case "owner":
          return <OwnerView business={currentUser.data} clients={clients} />;
        case "cashier":
          return <CashierView business={currentUser.data} />;
        default:
          handleLogout();
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
      {/* Хедер теперь рендерится здесь, один раз для всех */}
      <Header
        user={currentUser}
        onLogout={handleLogout}
        onBecomePartner={() => setView("partner_registration")}
      />
      {renderContent()}
    </div>
  );
};

export default App;
