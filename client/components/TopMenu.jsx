
class TopMenu extends React.Component {

  render() {
    return (
      <div className="top-menu">

        <ul className="layers">
          <li><a>Grupo A</a></li>
          <li><a>Grupo B</a></li>
        </ul>

        <ul className="sections">
          <li><a>Testimonios</a></li>
          <li><a>Analice</a></li>
          <li><a>Mapa de Destinos</a></li>
        </ul>

      </div>
    );
  }

};

TopMenu.displayName = "TopMenu";
export default TopMenu;
