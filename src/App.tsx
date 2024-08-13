import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { admin, espera, final, home, login, votar } from "./Routers/Patch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Page/Login";
import PublicRoutes from "./Routers/PublicRouter";
import Home from "./Page/Home";
import PrivateRoutes from "./Routers/PrivateRoutes";
import Admin from "./Page/Admin";
import Votar from "./Page/Votar";
import Espera from "./Page/Espera";
import Final from "./Page/Final";

type Props = {};

function App({}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route index path={login} element={<Login />} />
        </Route>

        <Route path="/" element={<PrivateRoutes allowroled={[2]} />}>
          <Route index path={home} element={<Home />} />
        </Route>

        <Route path="/" element={<PrivateRoutes allowroled={[1]} />}>
          <Route index path={admin} element={<Admin />} />
        </Route>

        <Route path="/" element={<PrivateRoutes allowroled={[2]} />}>
          <Route index path={votar} element={<Votar />} />
        </Route>

        <Route path="/" element={<PrivateRoutes allowroled={[2]} />}>
          <Route index path={espera} element={<Espera />} />
        </Route>

        <Route path="/" element={<PrivateRoutes allowroled={[2]} />}>
          <Route index path={final} element={<Final />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
