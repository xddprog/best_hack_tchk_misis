import ThemeProvider from "@/entities/theme/themeProvider";
import { ViewerProvider } from "@/entities/viewer/models/provider/viewerProvider";
import { routes } from "@/pages/routes/routes";
import { queryClient } from "@/shared/api/queryClient";
import { store } from "@/shared/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

export const RoutesProvider: FC<PropsWithChildren> = () => {
  return (
    <ThemeProvider>
      <ViewerProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <RouterProvider router={routes} />
            <Toaster />
          </Provider>
        </QueryClientProvider>
      </ViewerProvider>
    </ThemeProvider>
  );
};
