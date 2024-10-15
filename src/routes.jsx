import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Homepage from "./components/layout/Homepage.jsx";
import LoginPage from "./components/auth/LoginPage.jsx";
import RegisterPage from "./components/auth/RegisterPage.jsx";
import Posts from "./components/posts/Posts.jsx";
import SinglePost from "./components/posts/SinglePost.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "posts", element: <Posts /> },
      { path: "posts/:id", element: <SinglePost /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
