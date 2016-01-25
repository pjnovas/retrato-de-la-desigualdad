
import {Element, scroller} from 'react-scroll';

import Loading from "./Loading.jsx";
import Places from "./Places.jsx";

class MapArticle extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      layers: [],
      selectedPlace: null,
      showPlaces: false
    };

    this.cVis = null;
    this.cLayers = null;
  }

  componentDidMount(){
    this.initMap();
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.props.article){
      return;
    }

    let nbo = this.props.article.number;
    if (!prevProps.article || nbo !== prevProps.article.number){
      setTimeout(() => this.initMap(), 500);
    }
  }

  initMap(){
    if (!this.props.article){
      return;
    }

    let article = this.props.article;
    let mapId = article.map.id || article.map;
    let articleLayers = article.map.layers || [];

    if (this.cVis){
      this.cVis.container.remove();
      this.cVis = null;
      this.cLayers = null;
    }

    cartodb.createVis(this.refs.map,
        `http:\/\/elfaro.cartodb.com/api/v2/viz/${mapId}/viz.json`, {
      shareable: false,
      title: false,
      description: false,
      search: false,
      tiles_loader: true,
      layer_selector: false,
      cartodb_logo: false,
      fullscreen: true,
      zoom: 12
    })
    .done( (vis, layers) => {
      this.cVis = vis;
      this.mapLayers = layers;

      this.cLayers =
        layers[1].options &&
        layers[1].options.layer_definition &&
        layers[1].options.layer_definition.layers;

      this.setState({
        layers: this.cLayers.map( (l, i) => {
          return {
            index: i,
            active: true,
            info: articleLayers[i] && articleLayers[i].info || "",
            name: l.options.layer_name
          };
        })
      });

      this.createMarkers();
    })
    .error( err => {
      console.log(err);
    });
  }

  onLayerClick(layer){
    let layers = this.state.layers;
    let [_layer] = layers.filter( l => l.index === layer.index );
    let idx = layer.index;
    let currShow = (idx === 0 ? this.showLA : this.showLB)

    if (currShow){
      this.cLayers[idx].sub.hide();
      _layer.active = false;
    }
    else {
      this.cLayers[idx].sub.show();
      _layer.active = true;
    }

    layers[layer.index] = _layer;
    this.setState({ layers });

    this.togglePlaces(idx === 0 ? "a" : "b", !currShow);
  }

  createMarkers() {
    let places = this.props.places;
    let map = this.cVis.getNativeMap();

    const mPlace = p => {
      let img = p.images && p.images.length && p.images[0].thumb || "";

      return L
        .marker(p.meta.coords)
        .bindPopup(`
          <div class="desc">
            <h3>${p.title}</h3>
            <h4>${p.meta.address}</h4>
          </div>
          <div class="img"
            style="background-image: url('${img}')" >
          </div>
        `)
        .on('mouseover', function (e) {
          this.openPopup();
        })
        .on('mouseout', function (e) {
          this.closePopup();
        });
    };

    let markersA = places.filter( p => p.meta.groups.a ).map(mPlace);
    let markersB = places.filter( p => p.meta.groups.b ).map(mPlace);

    this.markersLA = L.layerGroup(markersA);
    this.markersLB = L.layerGroup(markersB);

    this.togglePlaces("a", true);
    this.togglePlaces("b", true);
  }

  togglePlaces(type, visible) {
    let map = this.cVis.getNativeMap();

    if (this.cLayers.length < 2){
      return;
    }

    const toggle = markers => {

      if (visible) {
        map.addLayer(markers);
        return true;
      }

      map.removeLayer(markers);
      return false;
    };

    switch(type) {
      case "a":
        this.showLA = toggle(this.markersLA);
        break;
      case "b":
        this.showLB = toggle(this.markersLB);
        break;
    }
  }

  onPlacesClick() {
    this.setState({ showPlaces: !this.state.showPlaces }, () => {
      if (this.state.showPlaces){
        scroller.scrollTo("ele-places", true, 500, -50);
      }
    });
  }

  onPlaceSelect(place) {
    this.setState({ selectedPlace: place });
  }

  render() {
    let article = this.props.article;

    if (!article){
      return (
        <Loading />
      );
    }

    let layers;
    if (this.state.layers.length > 1){
      layers = this.state.layers.map( (layer, i) => {
        return (
          <li key={i}>
            <a className={layer.active ? "active": ""}
              onClick={ () => this.onLayerClick(layer) }>
              {layer.name}
            </a>
            <span>{layer.info}</span>
          </li>
        );
      });
    }

    let [author] = article.authors || [""];

    return (
      <section className="map-article">
        <div className="top-menu">

          <ul className="layers">
            {layers}
          </ul>

          <div className="places-btn">
            <span>DONDE</span>
            <a className={ this.state.showPlaces ? "active" : "" }
              onClick={ () => this.onPlacesClick() }>Mapa de Destinos</a>
          </div>

        </div>

        <div id="map" ref="map" className="map"></div>

        <Element name="ele-places" className="content">
          <div className="tag">
            <span>{article.title}</span>
          </div>
          <div className="header">
            <div className="author-mobile">{author}</div>
            <h2>{article.subtitle}</h2>
            <div className="author">{author}</div>
          </div>
          <div className="intro" dangerouslySetInnerHTML={{__html: article.intro}}></div>
          <div className="body" dangerouslySetInnerHTML={{__html: article.body}}></div>

          { this.state.showPlaces ?

              <Places
                current={this.state.selectedPlace}
                places={this.props.places}
                onPlaceClick={ place => this.onPlaceSelect(place) }
                onClose={ () => this.setState({ showPlaces: false }) }/>
          : null }
        </Element>

      </section>
    );
  }

};

MapArticle.displayName = "MapArticle";
export default MapArticle;
