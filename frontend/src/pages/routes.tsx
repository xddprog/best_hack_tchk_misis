import { createBrowserRouter } from "react-router-dom";
import RootPage from "./rootPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
]);
