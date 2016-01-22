
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
      <ul className="maps-selector">
        { articles.map( article => {
          let mapId = article.map.replace(/-/g, "_");
          let mapImgUrl = `https:\/\/cartocdn-ashbu.global.ssl.fastly.net/elfaro/api/v1/map/static/named/tpl_${mapId}/300/170.png`;

          return (
            <li key={article.number}
              onClick={ e => this.props.onSelect(article.number) }
              className={selected === article.number ? "selected" : ""}>
              <h4>{article.subtitle}</h4>
              <div><img src={mapImgUrl}/></div>
            </li>
          );
        })}
      </ul>
    );
  }

};

MapsSelector.displayName = "MapsSelector";
export default MapsSelector;
