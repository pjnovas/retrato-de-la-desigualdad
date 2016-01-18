
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

      this.setMarker(["13.718787","-89.202793"]);

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
  }

  setMarker(coord){
    let map = this.cVis.getNativeMap();

    if (this.marker){
      map.removeLayer(this.marker);
    }

    this.marker = new L.Marker(coord);
    map.addLayer(this.marker);
    this.marker.bindPopup("<b>Hello world!</b><br />I am a test Marker!.").openPopup();
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
          <a key={i} className={layer.active ? "active": ""}
            onClick={ () => this.onLayerClick(layer) }>
            {layer.name}
          </a>
        );
      });
    }

    let [author] = article.authors || [""];

    return (
      <section className="map-article">
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
