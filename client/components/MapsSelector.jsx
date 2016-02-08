
import Loading from "./Loading.jsx";
import { Link } from "./controls";

class MapsSelector extends React.Component {

  render() {
    let articles = this.props.articles;

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
              if (article.disabled){
                return (
                  <li key={article.number} className="disabled">
                    <div className="wrap">
                      <div className="img"></div>
                      <h4>{article.title}</h4>
                    </div>
                  </li>
                );
              }

              let map = article.map.id || article.map;
              let mapId = map.replace(/-/g, "_");
              let mapImgUrl = `https:\/\/cartocdn-ashbu.global.ssl.fastly.net/elfaro/api/v1/map/static/named/tpl_${mapId}/300/170.png`;

              return (
                <li key={article.number}>
                  <Link className="wrap" to={article.number}>
                    <div className="img"><img src={mapImgUrl}/></div>
                    <h4>{article.title}</h4>
                  </Link>
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
