
import {Element, scroller} from 'react-scroll';

import Loading from "./Loading.jsx";
import Places from "./Places.jsx";
import Toolbar from "./Toolbar.jsx";
import Logos from "./Logos.jsx";

import {
  getPublishers,
  getPlaces
} from "../api";

class MapArticle extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      publishers: [],
      places: [],
      article: null,

      layers: [],
      selectedPlace: null,

      showEditorial: true,
      showPlaces: false,
      showAnalysis: false
    };

    this.cVis = null;
    this.cLayers = null;
  }

  componentDidMount(){

    getPlaces( (err, places) => {
      if (err){
        return;
      }

      getPublishers( (err, publishers) => {
        if (!err){

          let [article] = publishers.filter(
            art => art.number === this.props.params.publisher
          );

          if (article){
            this.setState({ publishers, places, article }, () => {
              setTimeout(() => this.initMap(), 500);
              setTimeout(() => window.scrollTo(0, 0), 1000);
            });
          }

          //else NOT FOUND!
        }
      });

    });
  }

  initMap(){
    if (!this.state.article){
      return;
    }

    let article = this.state.article;
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

  onLayerClick(index){
    let layers = this.state.layers;
    let [_layer] = layers.filter( l => l.index === index );
    let idx = index;

    if (_layer.active){
      this.cLayers[idx].sub.hide();
      _layer.active = false;
    }
    else {
      this.cLayers[idx].sub.show();
      _layer.active = true;
    }

    this.setState({ layers });

    if (this.state.showPlaces){
      let currShow = (idx === 0 ? this.showLA : this.showLB);
      this.togglePlaces(idx === 0 ? "a" : "b", !currShow);
    }
  }

  createMarkers() {
    let places = this.state.places;
    let map = this.cVis.getNativeMap();

    const mPlace = p => {
      let img = p.images && p.images.length && p.images[0].thumb || "";

      let group = p.meta.groups;
      if (group.a && group.b){
        group = 'both';
      }
      else if (group.a){
        group = 'a';
      }
      else {
        group = 'b';
      }

      var icon = L.divIcon({
        className: "marker-icon",
        iconSize: [25, 25],
        html: '<div id="'+p.number+'" class="group-' + group + '" ></div>',
        popupAnchor: [2, -12],
        //iconAnchor: [0, 0],
      });

      let self = this;

      return L
        .marker(p.meta.coords, { icon })
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
        })
        .on('click', function(e) {
          /*
          let placeNumber = e.originalEvent.target.id;
          let div = e.originalEvent.target.parentElement;

          [].map.call(
            document.getElementById('map').querySelectorAll('.selected'),
            el => el.classList.remove('selected')
          );

          div.classList.remove("selected");
          div.classList.add("selected");

          map.setView(this._latlng, 16, { animate: true });

          let [selectedPlace] = self.state.places.filter(
            pl => pl.number === placeNumber);

          self.setState({ selectedPlace });
          */

          let placeNumber = e.originalEvent.target.id;

          let [selectedPlace] = places.filter(pl => pl.number === placeNumber);
          self.onPlaceSelect(selectedPlace);
        });
    };

    let markersA = places.filter( p => p.meta.groups.a ).map(mPlace);
    let markersB = places.filter( p => p.meta.groups.b ).map(mPlace);

    this.markersLA = L.layerGroup(markersA);
    this.markersLB = L.layerGroup(markersB);

    this.togglePlaces("a", false);
    this.togglePlaces("b", false);
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

  onPlaceSelect(place) {
    [].map.call(
      document.getElementById('map').querySelectorAll('.selected'),
      el => el.classList.remove('selected')
    );

    this.setState({ selectedPlace: place }, () => {
      let ele = document.getElementById(place.number);

      if (ele){
        let div = ele.parentElement;
        if (div){
          window.setTimeout(() => div.classList.add("selected"), 500);
        }
      }

      let map = this.cVis.getNativeMap();
      map.setView(place.meta.coords, 16, { animate: true });
    });
  }

  onTabChange(id){
    switch(id) {
      case "editorial":
        if (!this.state.showEditorial){
          this.setState({ showEditorial: true, showPlaces: false });
          this.togglePlaces("a", false);
          this.togglePlaces("b", false);
        }
        break;
      case "places":
        if (!this.state.showPlaces){
          this.setState({ showEditorial: false, showPlaces: true });
          //scroller.scrollTo("ele-places", true, 500, -50);
          this.showPlacesLayer();
        }
        break;
    }
  }

  showPlacesLayer() {
    let layers = this.state.layers;
    let [layer1, layer2] = layers;

    if (layer1.active){
      this.togglePlaces("a", true);
    }

    if (layer2.active){
      this.togglePlaces("b", true);
    }
  }

  onEditorialTabChange(id){
    switch(id) {
      case "editorial":
        if (this.state.showAnalysis){
          this.setState({ showAnalysis: false });
        }
        break;
      case "analysis":
        if (!this.state.showAnalysis){
          this.setState({ showAnalysis: true });
          //scroller.scrollTo("ele-places", true, 500, -50);
        }
        break;
    }
  }

  render() {
    let article = this.state.article;

    if (!this.state.publishers.length || !article){
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
              onClick={ () => this.onLayerClick(layer.index) }>
              {layer.name}
            </a>

          </li>
        );
      });
    }
    //<span>{layer.info}</span>

    let [author] = article.authors || [""];
    let [analysisAuthor] = article.analysis && article.analysis.authors || [""];

    let bottomContent = null;
    if (this.state.showAnalysis){
      bottomContent = (
        <div className="analysis">
          <div className="body" dangerouslySetInnerHTML={{__html: article.analysis.body}}></div>
          <div className="author">{analysisAuthor}</div>
          <div className="author-mobile">{analysisAuthor}</div>
        </div>
      );
    }
    else {
      bottomContent = (
        <div className="editorial-article">
          <div className="author-mobile">{author}</div>
          <h2>{article.subtitle}</h2>
          <div className="author">{author}</div>
          <div className="intro" dangerouslySetInnerHTML={{__html: article.intro}}></div>
          <div className="body" dangerouslySetInnerHTML={{__html: article.body}}></div>
        </div>
      );
    }

    return (
      <section className="map-article">

        <Toolbar opacity={1} title={article.title} />

        <div className="top-menu">

          <ul className="tabs">
            <li>
              <a className={this.state.showEditorial ? " active" : "" }
                onClick={ () => this.onTabChange("editorial") }>Editorial</a>
            </li>
            <li>
              <a className={this.state.showPlaces ? " active" : "" }
                onClick={ () => this.onTabChange("places") }>Destinos</a>
            </li>
          </ul>

          <ul className="layers">
            {layers}
          </ul>

        </div>

        <div id="map" ref="map" className="map"></div>

        { this.state.showPlaces ?

        <Element name="ele-places" className="content">
          <Places
            current={this.state.selectedPlace}
            places={this.state.places}
            onPlaceClick={ place => this.onPlaceSelect(place) }
            onClose={ () => this.setState({ showPlaces: false }) }/>
        </Element>

        :

        <Element name="ele-places" className="content">
          <div className="km-viz">
            <div>[Visualización KM]</div>
          </div>

          <div className="editorial-content">

            <ul className="editorial-tabs">
              <li>
                <a className={!this.state.showAnalysis ? " active" : "" }
                  onClick={ () => this.onEditorialTabChange("editorial") }>Editorial</a>
              </li>
              <li>
                <a className={this.state.showAnalysis ? " active" : "" }
                  onClick={ () => this.onEditorialTabChange("analysis") }>Análisis Externo</a>
              </li>
            </ul>

            { bottomContent }

          </div>

        </Element>

        }

        <Logos />

      </section>
    );
  }

};

MapArticle.displayName = "MapArticle";
export default MapArticle;
