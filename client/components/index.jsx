
//import IntroArticle from "./IntroArticle.jsx";
import MapsSelector from "./MapsSelector.jsx";
import MapArticle from "./MapArticle.jsx";
import AnalysisArticle from "./AnalysisArticle.jsx";
//import Places from "./Places.jsx";
import Testimonials from "./Testimonials.jsx";

import {
  getMethodologies,
  getPublishers,
  getPlaces,
  getTestimonials
} from "../api";

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      methodology: null,
      publishers: [],
      places: [],
      testimonials: [],

      selectedPublisher: null
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
  }

  onChangeMenu(menu) {
    console.log("Menu changed: " + menu);
  }

  onChangeLayer(layer) {
    console.log("Layer changed: " + layer);
  }

  togglePlaces() {
    console.log('Toggle places!');
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

  render() {
    let cPublisher = this.state.selectedPublisher;
    let layers = [];

    return (
      <div>
        <div className="logo"></div>

        <section className="intro">
          <div className="title">
            <h1>Retrato de la Desigualdad</h1>
          </div>
          <div className="body">
            Como se mueven los habitantes de la ciudad. Donde van? Usando sus celulares pudimos detectar donde van los ciudadanos de el Salvador durante sus dias y que hábitos tienen.
          </div>
        </section>

        <MapsSelector
          articles={this.state.publishers}
          selected={cPublisher && cPublisher.number}
          onSelect={ number => this.onChangePublisher(number) } />

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

      </div>
    );
  }

};

Main.displayName = "Main";
export default Main;
