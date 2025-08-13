import CustomerRegistrationPage from "./pages/CustomerRegistrationPage/CustomerRegistrationPage";
import ShopsListPage from "./pages/ShopPage";
import CustomerView from "./pages/CustomerView";
import CashierPage from "./pages/CashierPage";
import ClientsPage from "./pages/ClientsPage";
import SettingsPage from "./pages/SettingsPage";
import MainPage from "./pages/MainPage";
import CustomerLoginPage from "./pages/CustomerLoginPage";
import EmployeeLoginPage from "./pages/EmployeeLoginPage";
import WalletsPage from "./pages/WalletsPage/WalletsPage";
import WalletInfoPage from "./pages/WalletInfoPage";
import ProfilePage from "./pages/ProfilePage";
import type { Role } from "./store/slices/clientSlice";
import BecomePartnerPage from "./pages/BecomePartnerPage";
import { Navigate } from "react-router-dom";

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  showInMenu?: boolean;
  roles?: Role[]; // ['customer'], ['cashier', 'admin'], etc.
  label: string;
}

const customerRoutes: AppRoute[] = [
  {
    path: "/wallets",
    element: <WalletsPage />,
    label: "Кошельки",
    showInMenu: true,
    roles: ["customer"],
  },
  {
    path: "/wallets/:walletId",
    element: <WalletInfoPage />,
    label: "Кошельки",
    showInMenu: false,
    roles: ["customer"],
  },
  {
    path: "/shops",
    element: <ShopsListPage />,
    label: "Партнеры",
    showInMenu: true,
    roles: ["customer"],
  },
  {
    path: "/shops/:shopId",
    element: <CustomerView />,
    label: "Просмотр магазина",
    showInMenu: false,
    roles: ["customer"],
  },
  {
    path: "/becomePartner",
    element: <BecomePartnerPage />,
    label: "Стать партнером",
    showInMenu: true,
    roles: ["customer"],
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    label: "Мой профиль",
    showInMenu: true,
    roles: ["customer", "cashier", "admin"],
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    label: "Настройки",
    showInMenu: true,
    roles: ["customer", "admin"],
  },
];

const cashierRoutes: AppRoute[] = [
  {
    path: "/cashier",
    element: <CashierPage />,
    label: "Панель кассира",
    showInMenu: true,
    roles: ["cashier"],
  },
  {
    path: "/clients",
    element: <ClientsPage />,
    label: "Клиенты",
    showInMenu: true,
    roles: ["cashier"],
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    label: "Мой профиль",
    showInMenu: true,
    roles: ["customer", "cashier", "admin"],
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    label: "Настройки",
    showInMenu: true,
    roles: ["customer", "admin"],
  },
];

const guestRoutes: AppRoute[] = [
  {
    path: "/",
    element: <MainPage />,
    label: "Главная",
    showInMenu: true,
    roles: [],
  },
  {
    path: "/login/customer",
    element: <CustomerLoginPage />,
    label: "Вход клиента",
    showInMenu: true,
    roles: [],
  },
  {
    path: "/login/employee",
    element: <EmployeeLoginPage />,
    label: "Вход сотрудника",
    showInMenu: true,
    roles: [],
  },
  // {
  //   path: "/register/employee",
  //   element: <EmployeeRegistrationPage />,
  //   label: "Вход сотрудника",
  //   showInMenu: false,
  //   roles: [],
  // },
  {
    path: "/register/customer",
    element: <CustomerRegistrationPage />,
    label: "Регистрация",
    showInMenu: true,
    roles: [],
  },
];

export function buildRoutes(
  routes: AppRoute[],
  defaultRedirect: string
): AppRoute[] {
  return [
    ...routes,
    {
      path: "*",
      element: <Navigate to={defaultRedirect} replace />,
      label: "",
      showInMenu: false,
      roles: [],
    },
  ];
}

export const customerRoutesWithRedirect = buildRoutes(
  customerRoutes,
  "/wallets"
);
export const guestRoutesWithRedirect = buildRoutes(guestRoutes, "/");
export const cashierRoutesWithRedirect = buildRoutes(cashierRoutes, "/cashier");
