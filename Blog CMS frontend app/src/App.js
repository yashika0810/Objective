import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Amplify from "aws-amplify";

import HomePage from "./HomePage";
import ListPage from "./ListPage";
import AddPage from "./AddPage";

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId:
      process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
});

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/list" component={ListPage} />
          <Route path="/add" component={AddPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
