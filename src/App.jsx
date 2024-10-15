import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
