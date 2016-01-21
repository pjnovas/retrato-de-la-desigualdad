
import Loading from "./Loading.jsx";

class MapArticle extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      layers: []
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
    let mapId = article.map;

    if (this.cVis){
      this.cVis.container.remove();
      this.cVis = null;
      this.cLayers = null;
    }

    cartodb.createVis(this.refs.map,
        `http://elfaro.cartodb.com/api/v2/viz/${mapId}/viz.json`, {
      shareable: false,
      title: false,
      description: false,
      search: false,
      tiles_loader: true,
      layer_selector: false,
      cartodb_logo: false,
      fullscreen: false
    })
    .done( (vis, layers) => {
      this.cVis = vis;
      this.cLayers = layers;

      // layer 0 is the base layer, layer 1 is cartodb layer
      let [head, ...tail] = layers;

      this.setState({
        layers: tail.map( (l, i) => {
          let ly = {
            index: i,
            active: false,
            name: l.model.get('layer_name')
          };

          if (i) {
            l.hide();
          }
          else {
            ly.active = true;
          }

          return ly;
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
    let idx = layer.index+1;

    if (this.cLayers[idx].hidden){
      this.cLayers[idx].show();
      _layer.active = true;
    }
    else {
      this.cLayers[idx].hide();
      _layer.active = false;
    }

    layers[layer.index] = _layer;
    this.setState({ layers });
    this.toggleLayers();
  }

  createMarkers() {
    let places = this.props.places;
    let map = this.cVis.getNativeMap();

    this.removeMarkerLayers();

    const mPlace = p => {
      return L
        .marker(p.meta.coords)
        .bindPopup(`
          <h3>${p.title}</h3>
          <div class="img"
            style="background-image: url('${p.images[0].url}')" >
          </div>
          `);
    };

    let markersA = places.filter( p => p.meta.groups.a ).map(mPlace);
    let markersB = places.filter( p => p.meta.groups.b ).map(mPlace);

    this.markersLA = L.layerGroup(markersA);
    this.markersLB = L.layerGroup(markersB);

    this.showLA = true;
    this.showLB = true;

    this.toggleLayers();
  }

  removeMarkerLayers(){
    let map = this.cVis.getNativeMap();

    if (this.showLA){
      map.removeLayer(this.markersLA);
      this.showLA = false;
    }

    if (this.showLB){
      map.removeLayer(this.markersLB);
      this.showLB = false;
    }
  }

  toggleLayers() {
    let map = this.cVis.getNativeMap();
    this.removeMarkerLayers();

    if (this.cLayers.length <= 3){
      //FOR TEST
      map.addLayer(this.markersLA);
      map.addLayer(this.markersLB);

      return;
    }

    if (this.cLayers[1].hidden){
      map.removeLayer(this.markersLA);
      this.showLA = false;
    }
    else if (!this.showLA){
      map.addLayer(this.markersLA);
      this.showLA = true;
    }

    if (this.cLayers[2].hidden){
      map.removeLayer(this.markersLB);
      this.showLB = false;
    }
    else if (!this.showLB){
      map.addLayer(this.markersLB);
      this.showLB = true;
    }
  }

  onPlacesClick() {

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

          <ul className="sections">
            <li>
              <a onClick={ () => this.onPlacesClick() }>Destinos</a>
            </li>
          </ul>

        </div>

        <div ref="map" className="map"></div>
        <div className="content">
          <div className="tag">
            <span>{article.title}</span>
          </div>
          <div className="header">
            <h2>{article.subtitle}</h2>
            <div className="author">{author}</div>
          </div>
          <div className="intro" dangerouslySetInnerHTML={{__html: article.intro}}></div>
          <div className="body" dangerouslySetInnerHTML={{__html: article.body}}></div>
        </div>
      </section>
    );
  }

};

MapArticle.displayName = "MapArticle";
export default MapArticle;
