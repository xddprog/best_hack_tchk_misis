import { createContext } from "react";
import { IViewerHandler, IViewerState } from "../types/types";

export const ViewerContext = createContext<IViewerState & IViewerHandler>({
  isAuthenticated: false,
  loginViewer: () => {},
  logoutViewer: () => {},
});
