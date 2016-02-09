
import IntroSection from "./IntroSection.jsx";
import MapsSelector from "./MapsSelector.jsx";
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

const twBy = "@_ElFaro_";

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      methodology: null,
      publishers: [],
      testimonials: [],
      scroll: 0
    };

    this.unmounted = false;
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
    this.unmounted = true;
    document.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler() {
    if (!this.unmounted){
      this.setState({ scroll: scrollSpy.currentPositionY() });
    }
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
      else if (top < 0){
        opacity = 1;
      }

      if (opacity > 1) {
        opacity = 1;
      }
    }

    return opacity;
  }

  render() {
    let opacity = this.getToolbarOpacity();

    let social = {
      name: "Un retrato de desigualdad",
      path: "/",
      FBCaption: "El Salvador, para algunos, puede ser una gran prisión. Estos mapas interactivos son el resultado de un experimento con 24 jóvenes del Área Metropolitana de San Salvador, que accedieron a que se registrara su movilización 24 horas al día durante todo octubre de 2015",
      TWText: `Un retrato de desigualdad por ${twBy}`
    };

    return (
      <div>
        <IntroSection opacity={opacity} onContinue={ () => this.onContinue() }/>

        <Toolbar opacity={opacity} social={social}/>

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
