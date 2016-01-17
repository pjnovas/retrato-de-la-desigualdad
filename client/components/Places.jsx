
class Places extends React.Component {

  render() {
    return (
      <section className="places">
        <div className="tag">Mapa de Destinos</div>
        <div className="content">
          <div className="map">A MAP HERE</div>
          <div className="places-list">
            <ul>
              <li>
                <h4>Club Militar <i>San IIdefonso</i></h4>
                <span>Calle oscar luna 114, San IIdefonso</span>
              </li>
              <li>
                <h4>Club Militar <i>San IIdefonso</i></h4>
                <span>Calle oscar luna 114, San IIdefonso</span>
              </li>
              <li>
                <h4>Club Militar <i>San IIdefonso</i></h4>
                <span>Calle oscar luna 114, San IIdefonso</span>
              </li>
              <li>
                <h4>Club Militar <i>San IIdefonso</i></h4>
                <span>Calle oscar luna 114, San IIdefonso</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

};

Places.displayName = "Places";
export default Places;
