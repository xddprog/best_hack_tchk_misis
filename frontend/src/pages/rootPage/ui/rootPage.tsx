import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <div className="bg-black h-screen w-screen p-3 relative flex flex-col justify-between">
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="flex-1 overflow-auto text-white">
          <Outlet />
          dwwdwd
        </div>
      </Suspense>
    </div>
  );
};

export default RootPage;
