import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
