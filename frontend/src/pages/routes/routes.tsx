import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import RootPage from "../rootPage";
import { ERouteNames } from "@/shared/utils/pathVariables";
import { lazy } from "react";
import ErrorPage from "../errorPage";
import { routesWithHoc } from "./routesWithHoc";
import { privatePage } from "@/entities/viewer/libs/hoc/privatePage";
import { publicPage } from "@/entities/viewer/libs/hoc/publicPage";

const AuthPage = lazy(() => import("@/pages/authPage"));
const LoginPage = lazy(() => import("@/pages/authPage/ui/loginPage"));
const RegisterPage = lazy(() => import("@/pages/authPage/ui/registerPage"));
const DashboardPage = lazy(() => import("@/pages/dashboardPage"));

export const routes = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: <Outlet />,
    children: [
      ...routesWithHoc(privatePage, [
        {
          path: ERouteNames.DEFAULT_ROUTE,
          element: <RootPage />,
          children: [
            {
              path: "",
              element: <Navigate to={ERouteNames.DASHBOARD_ROUTE} replace />,
            },
            {
              path: ERouteNames.DASHBOARD_ROUTE,
              element: <DashboardPage />,
            },
          ],
        },
      ]),
    ],
  },
  {
    path: ERouteNames.AUTH_ROUTE,
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    children: [
      ...routesWithHoc(publicPage, [
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
      ]),
    ],
  },
]);
