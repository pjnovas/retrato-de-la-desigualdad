
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { render } from 'react-dom';

import Main from "./components/index.jsx";
import Metadata from "./components/Metadata.jsx";
import MapArticle from "./components/MapArticle.jsx";

const routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Main} />
    <Route path="/:publisher" component={MapArticle} />
    <Route path="/metadata" component={Metadata} />
  </Router>
);

render(routes, document.getElementById("app"));

export {
  history
};
