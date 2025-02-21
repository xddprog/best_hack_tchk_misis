import { Provider } from "./providers/provider";
import { RoutesProvider } from "./providers/routerProvider";

export const App = () => (
  <RoutesProvider>
    <Provider />
  </RoutesProvider>
);
