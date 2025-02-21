import { routes } from "@/pages/routes";
import { FC, PropsWithChildren } from "react";
import { RouterProvider } from "react-router-dom";

export const RoutesProvider: FC<PropsWithChildren> = () => {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};
