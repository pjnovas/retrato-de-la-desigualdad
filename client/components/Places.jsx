
import Loading from "./Loading.jsx";

class Places extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      disableLeft: false,
      disableRight: false
    };
  }

  getCurrent() {
    return this.props.current || this.props.places[0];
  }

  getCurrentIndex() {
    let places = this.props.places;
    let cIndex = -1;
    let current = this.getCurrent();

    places.forEach( (p, i) => {
      if (p.number === current.number) {
        cIndex = i;
        return false;
      }
    });

    return cIndex;
  }

  moveToPrev() {
    let idx = this.getCurrentIndex();
    if (idx !== -1){
      if (idx > 0){
        this.props.onMoveTo(idx-1);
        this.checkDisableArrows(idx-1);
        return;
      }

      this.setState({ disableLeft: true });
    }
  }

  moveToNext() {
    let idx = this.getCurrentIndex();
    if (idx !== -1){
      if (idx < this.props.places.length-1){
        this.props.onMoveTo(idx+1);
        this.checkDisableArrows(idx+1);
        return;
      }

      this.setState({ disableRight: true });
    }
  }

  checkDisableArrows(nextIndex){
    if (nextIndex === 0){
      this.setState({ disableLeft: true });
    }
    else {
      this.setState({ disableLeft: false });
    }

    if (nextIndex === this.props.places.length-1){
      this.setState({ disableRight: true });
    }
    else {
      this.setState({ disableRight: false });
    }
  }

  render() {
    let articles = this.props.places;

    if (!articles || !articles.length){
      return (
        <Loading />
      );
    }

    let current = this.props.current || articles[0];

    let cImg = current.images &&
      current.images.length &&
      current.images[0].url || "";

    return (
      <section className="places">
        <div className="content-place">
          <div className="picture">
            <img src={cImg} />
          </div>
          <div className="content">
            <div className="wrap">
              <div className="header">
                <h2>{current.title}</h2>
                <h3>{current.meta.address}</h3>
              </div>
              <div className="body"
                dangerouslySetInnerHTML={{__html: current.body}}>
              </div>
              <div className="fields">
                <div>
                  <label>Se puede</label>
                  <span>{current.meta.cando}</span>
                </div>
                <div>
                  <label>Precios de referencia</label>
                  <span>{current.meta.prices}</span>
                </div>
                <div>
                  <label>Distancia desde El Salvador del Mundo</label>
                  <span>{current.meta.distance}</span>
                </div>
                <div>
                  <label>Dirección</label>
                  <span>{current.meta.address}</span>
                </div>
                <div>
                  <label>Grupo que lo visita</label>
                  <span>
                    {current.meta.groups.a ? "A" : ""}
                    {current.meta.groups.a && current.meta.groups.b ? " y " : ""}
                    {current.meta.groups.b ? "B" : ""}
                  </span>
                </div>
                <div>
                  <label>Tiempo de visita</label>
                  <span>
                    {current.meta.times.day ? "Día" : ""}
                    {current.meta.times.day && current.meta.times.night ? " y " : ""}
                    {current.meta.times.night ? "Noche" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="places-list">
            <div className="tag">Otros Destinos</div>

            <div className="arrows">
              {!this.state.disableLeft ?
              <a className="left"
                onClick={ () => this.moveToPrev() }>&lt;</a>
              : null }

              {!this.state.disableRight ?
              <a className="right"
                onClick={ () => this.moveToNext() }>&gt;</a>
              : null }
            </div>

            <ul>
              { articles.map( p => {
                let img = p.images && p.images.length && p.images[0].thumb || "";

                return (
                  <li key={p.number}
                    className={"place-item " + (p.number === current.number ? "selected" : "")}
                    onClick={ () => this.props.onPlaceClick(p) }>
                    <div className="place-content">
                      <div className="desc">
                        <h3>{p.title}</h3>
                        <h4>{p.meta.address}</h4>
                      </div>
                      <div className="img"
                        style={{ backgroundImage: "url('" + img + "')" }} >
                      </div>
                    </div>
                  </li>
                );
              }) }
            </ul>
          </div>
        </div>
      </section>
    );
  }

};

Places.displayName = "Places";
export default Places;
