import { h, render } from "preact";
import { Router } from "preact-router";
import { Home, SignUp } from "./routes";

import "./style.css";

const App = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
      <Router>
        <Home path="/" />
        <SignUp path="/signup" />
        <Profile path="/profile" />
      </Router>
    </div>
  );
}

render(<App />, document.body);
