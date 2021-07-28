import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MicroFrontend from "./MicroFrontend";
import { NotificationsContextProvider, NotificationsContext } from '@do/walrus/shell/NotificationsContext';
import "./App.css";

const {
  REACT_APP_WOOF_HOST: woofHost,
  REACT_APP_MEOW_HOST: meowHost,
} = process.env;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title">&#128571; Meow and Woof &#128021;</h1>
      <h4>Random pics of cats and dogs</h4>
    </div>
  );
}

function Woof({ history }) {
  return <MicroFrontend history={history} host={woofHost} name="Woof" />;
}

function Meow({ history }) {
  return <MicroFrontend history={history} host={meowHost} name="Meow" />;
}

function GreetingMeow({ history }) {
  return (
    <div>
      <div className="home">
        <MicroFrontend history={history} host={meowHost} name="Meow" />
      </div>
    </div>
  );
}

function Home({ history }) {
  const [input, setInput] = useState("");

  const handleOnClick = () => {
    history.push(`/cat/${input}`);
  };

  const { notifications } = useContext(NotificationsContext);
  console.log('notifications ', notifications );
  return (
    <div>
      <div className="home">
        <input
          placeholder="Insert a greeting"
          defaultValue={input}
          onBlur={(e) => setInput(e.target.value)}
        />
        <button onClick={handleOnClick}>Greet Me</button>
      </div>

      <div className="home">
        <div className="content">
          <div className="cat">
            <Meow />
          </div>
          <div className="dog">
            <Woof />
          </div>
        </div>
      </div>
    </div>
  );
}

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/cat" >
          <Meow />
        </Route>
      </Switch>
    </Router>

  );
}


function App() {

  return (
    <div>
        <Header/>
        <Routes  />
    </div>
  );
}

export default App;