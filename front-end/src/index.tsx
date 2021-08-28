import { h, render } from "preact";
import { Router } from "preact-router";
import { Home, Messages, SignUp } from "./routes";

import "./style.css";

const App = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
      <Router>
        <Home path="/" />
        <Messages path="/messages" />
        <SignUp path="/signup" />
      </Router>
    </div>
  );
};

render(<App />, document.body);
