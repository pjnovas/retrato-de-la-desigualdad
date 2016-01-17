
class MapsSelector extends React.Component {

  render() {
    return (
      <ul className="maps-selector">
        <li>
          <h4>Mapa 1</h4>
          <div><img src=""/></div>
        </li>
        <li>
          <h4>Mapa 2</h4>
          <div><img src=""/></div>
        </li>
        <li>
          <h4>Mapa 3</h4>
          <div><img src=""/></div>
        </li>
        <li>
          <h4>Mapa 4</h4>
          <div><img src=""/></div>
        </li>
      </ul>
    );
  }

};

MapsSelector.displayName = "MapsSelector";
export default MapsSelector;
