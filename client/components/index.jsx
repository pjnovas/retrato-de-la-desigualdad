
import IntroArticle from "./IntroArticle.jsx";
import MapsSelector from "./MapsSelector.jsx";
import TopMenu from "./TopMenu.jsx";
import MapArticle from "./MapArticle.jsx";
import AnalysisArticle from "./AnalysisArticle.jsx";
//import Places from "./Places.jsx";
import Testimonials from "./Testimonials.jsx";

class Main extends React.Component {

  render() {
    return (
      <div>
        <div className="logo"></div>

        <IntroArticle />
        <MapsSelector />
        <TopMenu />
        <MapArticle />
        <AnalysisArticle />

        <Testimonials />
      </div>
    );
  }

};

Main.displayName = "Main";
export default Main;
