import { h, render } from "preact";
import { Router } from "preact-router";
import { Home, Messages } from "./routes";

import "./style.css";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col">
      <Router>
        <Messages path="/" />
        <Messages path="/messages" />
      </Router>
    </div>
  );
}

render(<App />, document.body);
