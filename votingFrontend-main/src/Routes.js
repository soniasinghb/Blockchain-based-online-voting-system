import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Vote from "./core/Vote";
import Transaction from "./transaction/Transaction";
import Results from "./core/Results";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/vote" exact component={Vote} />
        <Route path="/transaction" exact component={Transaction} />
        <Route path="/results" exact component={Results} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
