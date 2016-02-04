
import Loading from "./Loading.jsx";

class MapsSelector extends React.Component {

  render() {
    let articles = this.props.articles;
    let selected = this.props.selected;

    if (!articles){
      return (
        <Loading />
      );
    }

    return (
      <div className="maps-selector">

        <div className="content-center">

          <h1>Mapas</h1>

          <div className="narrow-content">
            <ul>
            { articles.map( article => {
              let map = article.map.id || article.map;
              let mapId = map.replace(/-/g, "_");
              let mapImgUrl = `https:\/\/cartocdn-ashbu.global.ssl.fastly.net/elfaro/api/v1/map/static/named/tpl_${mapId}/300/170.png`;

              return (
                <li key={article.number}
                  onClick={ e => this.props.onSelect(article.number) }
                  className={selected === article.number ? "selected" : ""}>
                  <div className="wrap">
                    <div className="img"><img src={mapImgUrl}/></div>
                    <h4>{article.subtitle}</h4>
                  </div>
                </li>
              );
            })}
            </ul>
          </div>
        </div>
      </div>
    );
  }

};

MapsSelector.displayName = "MapsSelector";
export default MapsSelector;
