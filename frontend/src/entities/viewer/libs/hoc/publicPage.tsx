import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useViewer } from "../../models/hooks/useViewer";
import { useNavigate } from "react-router-dom";
import tokenService from "@/entities/token/libs/tokenService";
import { ERouteNames } from "@/shared/utils/pathVariables";
import { Spinner } from "@heroui/spinner";

export const publicPage = (children: React.ReactNode) => {
  return <PublicPage>{children}</PublicPage>;
};

const PublicPage: FC<PropsWithChildren> = ({ children }) => {
  const { loginViewer } = useViewer();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = tokenService.getAccessToken();

    if (token) {
      loginViewer(token);
      navigate(ERouteNames.DEFAULT_ROUTE);
    } else {
      setIsLoading(false);
    }
  }, [loginViewer, navigate]);

  if (isLoading) {
    return <Spinner color="secondary" />;
  }

  return children;
};
