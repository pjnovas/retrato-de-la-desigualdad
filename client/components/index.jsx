
import IntroSection from "./IntroSection.jsx";
import MapsSelector from "./MapsSelector.jsx";
import MapArticle from "./MapArticle.jsx";
import AnalysisArticle from "./AnalysisArticle.jsx";
import Testimonials from "./Testimonials.jsx";
import Logos from "./Logos.jsx";

import {
  getMethodologies,
  getPublishers,
  getPlaces,
  getTestimonials
} from "../api";

import { Element, scroller, scrollSpy } from 'react-scroll';

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      methodology: null,
      publishers: [],
      places: [],
      testimonials: [],

      selectedPublisher: null,
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
        let [selectedPublisher] = publishers;

        this.setState({
          publishers,
          selectedPublisher
        });
      }
    });

    getPlaces( (err, places) => {
      if (!err){
        this.setState({ places });
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

  onChangePublisher(number) {
    if (number === this.state.selectedPublisher.number){
      return;
    }

    let [selectedPublisher] = this.state.publishers.filter(
      art => number === art.number
    );

    if (selectedPublisher){
      this.setState({ selectedPublisher });
    }
  }

  onContinue() {
    scroller.scrollTo("map-selector", true, 500, -60);
  }

  render() {
    let cPublisher = this.state.selectedPublisher;
    let layers = [];
    let opacity = this.state.scroll > 150 ? 1 : 0;
    let tbStyles = { opacity };

    return (
      <div>

        <IntroSection onContinue={ () => this.onContinue() }/>

        <div className="toolbar" style={ tbStyles }>
          <div className="logo-elfaro"></div>
          <div className="logo-retrato"></div>
        </div>

        <Element name="map-selector">
          <MapsSelector
            articles={this.state.publishers}
            selected={cPublisher && cPublisher.number}
            onSelect={ number => this.onChangePublisher(number) }/>
        </Element>

        { this.state.places.length ?
          <MapArticle places={this.state.places} article={cPublisher} />
        : null }


        <div className="footer-content">

          <div className="left">
            <Testimonials articles={this.state.testimonials} />
          </div>

          <div className="right">
          { cPublisher && cPublisher.analysis ?
            <AnalysisArticle article={cPublisher.analysis} />
          : null }
          </div>

        </div>

        <Logos />

      </div>
    );
  }

};

Main.displayName = "Main";
export default Main;
