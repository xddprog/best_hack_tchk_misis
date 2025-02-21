import { createBrowserRouter, Navigate } from "react-router-dom";
import RootPage from "../rootPage";
import { ERouteNames } from "@/shared/utils/pathVariables";
import { lazy } from "react";
import ErrorPage from "../errorPage";

const AuthPage = lazy(() => import("@/pages/authPage"));
const LoginPage = lazy(() => import("@/pages/authPage/ui/loginPage"));
const RegisterPage = lazy(() => import("@/pages/authPage/ui/registerPage"));
const DashboardPage = lazy(() => import("@/pages/dashboardPage"));

export const routes = createBrowserRouter([
  {
    path: ERouteNames.DEFAULT_ROUTE,
    element: <RootPage />,
    children: [
      {
        path: "",
        element: <Navigate to={ERouteNames.DASHBOARD_ROUTE} />,
      },
      {
        path: ERouteNames.DASHBOARD_ROUTE,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: ERouteNames.AUTH_ROUTE,
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to={ERouteNames.LOGIN_ROUTE} />,
      },
      {
        path: ERouteNames.LOGIN_ROUTE,
        element: <LoginPage />,
      },
      {
        path: ERouteNames.REGISTRATION_ROUTE,
        element: <RegisterPage />,
      },
    ],
  },
]);
