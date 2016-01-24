
import Loading from "./Loading.jsx";
import Slider from "react-slick";

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

  render() {
    let articles = this.props.places;

    if (!articles || !articles.length){
      return (
        <Loading />
      );
    }

    let current = this.getCurrent();

    let cImg = current.images &&
      current.images.length &&
      current.images[0].url || "";

    let settings = {
      initialSlide: this.getCurrentIndex(),
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      adaptiveHeight: false,
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 3 } }
      ]
    };

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

            <Slider {...settings}>
              { articles.map( p => {
                let img = p.images && p.images.length && p.images[0].thumb || "";

                return (
                  <div key={p.number}
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
                  </div>
                );
              }) }

            </Slider>

          </div>
        </div>
      </section>
    );
  }

};

Places.displayName = "Places";
export default Places;
