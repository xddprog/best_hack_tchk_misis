import type { NavigateOptions } from "react-router-dom";
import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { FC, PropsWithChildren } from "react";
import { ViewerProvider } from "@/entities/viewer/models/provider/viewerProvider";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ViewerProvider>{children}</ViewerProvider>
    </HeroUIProvider>
  );
};
