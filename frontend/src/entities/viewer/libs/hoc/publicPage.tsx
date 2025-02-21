import { FC, PropsWithChildren, useEffect } from "react";
import { useViewer } from "../../models/hooks/useViewer";
import { useNavigate } from "react-router-dom";
import tokenService from "@/entities/token/libs/tokenService";
import { ERouteNames } from "@/shared/utils/pathVariables";

export const publicPage = (children: React.ReactNode) => {
  return <PublicPage>{children}</PublicPage>;
};

const PublicPage: FC<PropsWithChildren> = ({ children }) => {
  const { loginViewer } = useViewer();
  const navigate = useNavigate();

  useEffect(() => {
    const token = tokenService.getAccessToken();

    if (token) {
      loginViewer(token);
      navigate(ERouteNames.DEFAULT_ROUTE);
    }
  }, [loginViewer, navigate]);

  return children;
};
