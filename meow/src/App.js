import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import GreetingMeow from "./components/GreetingMeow";
import RandomMeow from "./components/RandomMeow";
import "./App.css";

const defaultHistory = createBrowserHistory();

function App({ history = defaultHistory, TestContext }) {
  return (
    <Router history={history}>
      <Route exact path="/" >
        {/* <RandomMeow TestContext={TestContext} /> */}
      </Route>
      <Route exact path="/cat/:greeting" component={GreetingMeow} />
    </Router>
  );
}

export default App;