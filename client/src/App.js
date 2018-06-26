import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Jumbotron from "./components/Jumbotron";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
/*import { Col, Row, Container } from "./components/Grid"; */

const App = () => (
  <Router>
    <div>
      <Jumbotron />
      <Switch>
        <Route exact path="/" component={Home} />
       {/*  <Route exact path="/articles" component={Saved} />  */}
        {/* <Route exact path="/articles/:id" component={Detail} /> */}
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
