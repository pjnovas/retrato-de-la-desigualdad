
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { render } from 'react-dom';

import Main from "./components/index.jsx";
import Metadata from "./components/Metadata.jsx";
//import SectionView from "./components/SectionView.jsx";

const routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Main} />
    <Route path="/metadata" component={Metadata} />
  </Router>
);

/*
<Route path="/:section" component={SectionView} />
<Route path="/:section/:article" component={SectionView} />
*/

render(routes, document.getElementById("app"));

export {
  history
};
