import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
function Layout() {
  return (
    <>
      {/* <Nav /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
    { path: "/", element: <SignIn/> },
      { path: "signUp", element: <SignUp /> },
      { path: "home", element: <Home /> },
    ],
  },
]);

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Router;