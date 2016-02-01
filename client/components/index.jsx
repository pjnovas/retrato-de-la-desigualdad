
//import IntroArticle from "./IntroArticle.jsx";
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
            <h1>Un retrato de la desigualdad</h1>
          </div>
          <div className="body">
            El Salvador, para algunos, puede ser una gran prisión. Estos mapas interactivos son el resultado de un experimento con 24 jóvenes del Área Metropolitana de San Salvador, que accedieron a que se registrara su movilización 24 horas al día durante todo octubre de 2015. El resultado, que confirma que la expresión popular “del Salvador del Mundo para abajo” acierta al aludir a dos mundos determinados por el nivel de ingresos, da luz sobre el acceso al ocio y la cultura de los jóvenes salvadoreños, probablemente también condicionado por la inseguridad.
          </div>
        </section>

        <MapsSelector
          articles={this.state.publishers}
          selected={cPublisher && cPublisher.number}
          onSelect={ number => this.onChangePublisher(number) }/>

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
