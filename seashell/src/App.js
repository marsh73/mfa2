import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MicroFrontend from "./MicroFrontend";

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

function Meow({ history, TestContext }) {
  return <MicroFrontend history={history} host={meowHost} TestContext={TestContext} name="Meow" />;
}

function GreetingMeow({ history, TestContext }) {
  return (
    <div>
      <div className="home">
        <MicroFrontend history={history} host={meowHost} name="Meow" TestContext={TestContext}/>
      </div>
    </div>
  );
}

function Home({ history, TestContext }) {
  const [input, setInput] = useState("");

  const handleOnClick = () => {
    history.push(`/cat/${input}`);
  };

  const { user } = useContext(TestContext);

  return (
    <div>
      <div className="home">
        <input
          placeholder="Insert a greeting"
          defaultValue={input}
          onBlur={(e) => setInput(e.target.value)}
        />
        <button onClick={handleOnClick}>Greet Me, {user.name}</button>
      </div>

      <div className="home">
        <div className="content">
          <div className="cat">
            {/* <Meow TestContext={TestContext}/> */}
          </div>
          <div className="dog">
            <Woof />
          </div>
        </div>
      </div>
    </div>
  );
}

function Routes({TestContext}) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home TestContext={TestContext} />
        </Route>
        <Route path="/cat" >
          <Meow TestContext={TestContext}/>
        </Route>
      </Switch>
    </Router>

  );
}


function App() {
  const TestContext = createContext(null);
  const [user, updateUser] = useState({name: 'marsh'});


  return (
    <div>
      <TestContext.Provider value={{
        user,
        updateUser
      }}>
        <Header/>
        <Routes TestContext={TestContext} />
      </TestContext.Provider>
    </div>
  );
}

export default App;