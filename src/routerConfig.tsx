import Home from "./Screens/Home";
import Login from "./Screens/Login";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];
