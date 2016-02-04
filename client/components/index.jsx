
import IntroSection from "./IntroSection.jsx";
import MapsSelector from "./MapsSelector.jsx";
import AnalysisArticle from "./AnalysisArticle.jsx";
import Testimonials from "./Testimonials.jsx";
import Methodology from "./Methodology.jsx";
import Logos from "./Logos.jsx";

import Toolbar from "./Toolbar.jsx";

import {
  getMethodologies,
  getPublishers,
  getTestimonials
} from "../api";

import { Element, scroller, scrollSpy } from 'react-scroll';

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      methodology: null,
      publishers: [],
      testimonials: [],
      scroll: 0
    };
  }

  componentDidMount(){

    getMethodologies( (err, methodologies) => {
      if (!err){
        let [methodology] = methodologies;
        this.setState({ methodology });
      }
    });

    getPublishers( (err, publishers) => {
      if (!err){
        this.setState({ publishers });
      }
    });

    getTestimonials( (err, testimonials) => {
      if (!err){
        this.setState({ testimonials });
      }
    });

    document.addEventListener('scroll', this.scrollHandler.bind(this));
    window.setTimeout(() => this.scrollHandler(), 100);
  }

  componentWillUnmount(){
    document.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler() {
    this.setState({ scroll: scrollSpy.currentPositionY() });
  }

  onContinue() {
    scroller.scrollTo("map-selector", true, 1000, -80);
  }

  getToolbarOpacity() {
    let opacity = 0;
    let ele = scroller.get("map-selector");

    if (ele && ele.getBoundingClientRect){
      let top = ele.getBoundingClientRect().top;

      if (top > 0){
        opacity = ((this.state.scroll * 100) / top) / 100;
        opacity = parseFloat(opacity.toFixed(1));
      }

      if (opacity > 1) {
        opacity = 1;
      }
    }

    return opacity;
  }

  render() {
    let opacity = this.getToolbarOpacity();

    return (
      <div>
        <IntroSection opacity={opacity} onContinue={ () => this.onContinue() }/>
        <Toolbar opacity={opacity} />

        <Element name="map-selector">
          <MapsSelector articles={this.state.publishers} />
        </Element>

        <Element name="testimonials">
          <Testimonials articles={this.state.testimonials} />
        </Element>

        <Element name="methodology">
          <Methodology article={this.state.methodology} />
        </Element>

        <Logos />
      </div>
    );
  }

};

Main.displayName = "Main";
export default Main;
