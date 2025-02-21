import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { ViewerContext } from "../context/viewerCtx";
import { IViewerState } from "../types/types";
import tokenService from "@/entities/token/libs/tokenService";

export const ViewerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [viewer, setViewer] = useState<IViewerState>({
    isAuthenticated: false,
  });

  const handleLoginViewer = (accessToken: string) => {
    setViewer({
      isAuthenticated: true,
      accessToken,
    });
    tokenService.setAccessToken(accessToken);
  };

  const handleLogoutViewer = () => {
    setViewer({
      isAuthenticated: false,
      accessToken: null,
    });
    tokenService.deleteAccessToken();
  };

  const values = useMemo(
    () => ({
      ...viewer,
      loginViewer: handleLoginViewer,
      logoutViewer: handleLogoutViewer,
    }),
    [viewer]
  );

  useEffect(() => {
    const token = tokenService.getAccessToken();

    if (token) {
      setViewer({
        isAuthenticated: true,
        accessToken: token,
      });
    }
  }, []);

  return (
    <ViewerContext.Provider
      value={{
        ...viewer,
        loginViewer: handleLoginViewer,
        logoutViewer: handleLogoutViewer,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};
