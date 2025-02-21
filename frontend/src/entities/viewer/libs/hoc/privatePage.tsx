import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useViewer } from "../../models/hooks/useViewer";
import tokenService from "@/entities/token/libs/tokenService";
import { ERouteNames } from "@/shared/utils/pathVariables";

export const privatePage = (children: React.ReactNode) => {
  return <PrivatePage>{children}</PrivatePage>;
};

const PrivatePage: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loginViewer } = useViewer();
  const pathname = useLocation();

  useEffect(() => {
    const token = tokenService.getAccessToken();

    if (token) {
      loginViewer(token);
    } else {
      navigate(ERouteNames.LOGIN_ROUTE);
    }
  }, [pathname]);

  return isAuthenticated ? children : null;
};
