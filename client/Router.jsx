
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { render } from 'react-dom';

import Landing from "./components/index.jsx";
import Metadata from "./components/Metadata.jsx";
import SectionView from "./components/SectionView.jsx";

const routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Landing} />
    <Route path="/metadata" component={Metadata} />
    <Route path="/:section" component={SectionView} />
    <Route path="/:section/:article" component={SectionView} />
  </Router>
);

render(routes, document.getElementById("app"));

export {
  history
};
