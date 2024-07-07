import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Votar from "./Screens/Votar";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/votar",
    element: <Votar />,
  },
];
