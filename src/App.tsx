import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./Router";

type Props = {};

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
