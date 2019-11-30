import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Users from "./components/users";
import Post from "./components/post";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/auth/:id?" component={Post}></Route>
      </Router>
    </div>
  );
}

export default App;
