
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import { render } from 'react-dom';

import Home from "./components/Home/index.jsx";

// Opt-out of persistent state, not recommended.
// TODO: checkout adding server routes from Parse.com
//const history = createHistory({
//  queryKey: false
//});

const history = null; // use hash history, to develop on client side without a server.

const routes = (
  <Router history={history}>
    <Route path="/" component={Home} />
  </Router>
);

render(routes, document.getElementById("app"));

export {
  history
};
