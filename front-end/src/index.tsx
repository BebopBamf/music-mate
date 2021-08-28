import { h, render } from "preact";
import { Router } from "preact-router";
import { Home } from "./routes";

import "./style.css";

const App = () => {
  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col">
      <Router>
        <Home path="/" />
      </Router>
    </div>
  );
}

render(<App />, document.body);
