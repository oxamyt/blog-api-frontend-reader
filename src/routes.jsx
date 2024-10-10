import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Posts from "./components/Posts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "posts", element: <Posts /> },
    ],
  },
]);

export default router;
