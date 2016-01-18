
const metaStart = "[#meta]";
const metaEnd = "[/meta]";

const defaultState = {
  metas: {
    coords: ["",""],
    cando: "",
    prices: "",
    distance: "",
    address: "",
    groups: { a: false, b: false },
    times: { day: false, night: false }
  },

  parsed: "",
  error: ""
};

class Metadata extends React.Component {

  constructor(props){
    super(props);
    this.state = Object.create(defaultState);
  }

  onChange(p, v){
    let metas = this.state.metas;
    metas[p] = v;
    this.setState({ metas }, () => this.generate());
  }

  onChangeCoords(idx, value){
    let metas = this.state.metas;
    metas.coords[idx] = value;
    this.setState({ metas }, () => this.generate());
  }

  onChangeCheck(type, index, value){
    let metas = this.state.metas;
    metas[type][index] = value;
    this.setState({ metas }, () => this.generate());
  }

  generate(){
    let parsed = metaStart + JSON.stringify(this.state.metas) + metaEnd;
    this.setState({ parsed, error: "" });
  }

  onChangeParsed(parsed){
    this.setState({ parsed, error: "" }, () => this.parse());
  }

  parse(){
    let body = this.state.parsed;
    let len = metaStart.length;

    let idxStart = body.indexOf(metaStart);
    let idxEnd = body.indexOf(metaEnd);

    if (idxStart === -1){
      this.setState({ error: "No se encontro el inicio '[#meta]'" });
      return;
    }

    if (idxEnd === -1){
      this.setState({ error: "No se encontro el fin '[/meta]'" });
      return;
    }

    let metas;

    try {
      metas = JSON.parse(body.substring(idxStart + len, idxEnd));
    }
    catch (e) {
      this.setState({ error: "Ocurrió un error al Parsear el texto"});
      console.dir(e);
      return;
    }

    this.setState({ metas, error: "" });
  }

  cleanAll(){
    window.location.reload();
  }

  render() {
    let metas = this.state.metas;

    if (!metas){
      return null;
    }

    let coords = metas.coords || ["", ""];

    return (
      <div className="metadata">
        <h1>Metadata</h1>

        <div className="control">
          <label>Coordenadas</label>
          <input className="coord" type="text"
            placeholder="LATITUD" value={coords[0]}
            onChange={e=>this.onChangeCoords(0, e.target.value)}/>
          <input className="coord" type="text"
            placeholder="LONGITUD" value={coords[1]}
            onChange={e=>this.onChangeCoords(1, e.target.value)}/>
        </div>

        <div className="control">
          <label>Se puede</label>
          <textarea value={metas.cando}
            onChange={e=>this.onChange("cando", e.target.value)}/>
        </div>

        <div className="control">
          <label>Precios referencia</label>
          <textarea value={metas.prices}
            onChange={e=>this.onChange("prices", e.target.value)}/>
        </div>

        <div className="control">
          <label>Distancia desde El Salvador del Mundo</label>
          <input type="text" value={metas.distance} className="distance"
            onChange={e=>this.onChange("distance", e.target.value)}/>
        </div>

        <div className="control">
          <label>Dirección</label>
          <input type="text" value={metas.address} className="address"
            onChange={e=>this.onChange("address", e.target.value)}/>
        </div>

        <div className="control">
          <label>Grupo que lo visita</label>

          <div className="check">
            <label htmlFor="groups_a">Grupo A</label>
            <input id="groups_a" type="checkbox" checked={metas.groups.a}
              onChange={e=>this.onChangeCheck("groups", "a", e.target.checked)}/>
          </div>

          <div className="check">
            <label htmlFor="groups_b">Grupo B</label>
            <input id="groups_b" type="checkbox" checked={metas.groups.b}
              onChange={e=>this.onChangeCheck("groups", "b", e.target.checked)}/>
          </div>
        </div>

        <div className="control">
          <label>Tiempo de visita</label>

          <div className="check">
            <label htmlFor="times_day">Día</label>
            <input id="times_day" type="checkbox" checked={metas.times.day}
              onChange={e=>this.onChangeCheck("times", "day", e.target.checked)}/>
          </div>

          <div className="check">
            <label htmlFor="times_night">Noche</label>
            <input id="times_night" type="checkbox" checked={metas.times.night}
              onChange={e=>this.onChangeCheck("times", "night", e.target.checked)}/>
          </div>
        </div>

        <hr/>

        {this.state.error ?
          <div>
            <p className="error">{this.state.error}</p>
            <hr/>
          </div>
        : null }

        <textarea className="parsed" value={this.state.parsed}
          placeholder="Pegar metadata para modificar"
          onChange={e=>this.onChangeParsed(e.target.value)}/>

        <div className="control">
          <a onClick={ () => this.cleanAll() }>Limpiar Todo</a>
        </div>
      </div>
    );
  }

};

Metadata.displayName = "Metadata";
export default Metadata;
