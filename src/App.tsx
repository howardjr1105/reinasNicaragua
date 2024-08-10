import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./Router";
import PrivateRoutes from "./Routers/PrivateRoutes";
import PublicRoutes from "./Routers/PublicRouter";
import { Home, Login, Votar } from "./pages";
import Admin from "./Screens/Admin";

type Props = {};

const Roles = {
  Admin: 1,
  Jurado: 2,
};

function App({}: Props) {
  return (
    <Router>
      <Suspense>
        <AppRouter />
      </Suspense>
    </Router>
  );
}

export default App;
