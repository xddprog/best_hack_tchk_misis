import { useContext } from "react";
import { ViewerContext } from "../context/viewerCtx";

export const useViewer = () => {
  return useContext(ViewerContext);
};
