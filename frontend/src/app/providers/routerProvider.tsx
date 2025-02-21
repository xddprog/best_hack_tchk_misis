import ThemeProvider from "@/entities/theme/themeProvider";
import { routes } from "@/pages/routes/routes";
import { FC, PropsWithChildren } from "react";
import { RouterProvider } from "react-router-dom";

export const RoutesProvider: FC<PropsWithChildren> = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
};
