import { Spinner } from "@heroui/spinner";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AuthPage;
