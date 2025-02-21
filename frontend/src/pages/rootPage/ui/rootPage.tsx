import ThemeSwitcher from "@/features/theme/ui/themeSwitcher";
import { Spinner } from "@heroui/spinner";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <div className="h-screen w-screen p-3 relative flex flex-col justify-between">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <div className="flex-1 overflow-auto">
          <ThemeSwitcher />
          <Outlet />
          CRM APP |
        </div>
      </Suspense>
    </div>
  );
};

export default RootPage;
