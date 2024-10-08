import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Homepage /> }],
  },
]);

export default router;
