
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { render } from 'react-dom';

import Landing from "./components/index.jsx";
import SectionView from "./components/SectionView.jsx";

const routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Landing} />
    <Route path="/:section" component={SectionView} />
  </Router>
);

render(routes, document.getElementById("app"));

export {
  history
};
