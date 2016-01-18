
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
          return (
            <li key={article.number}
              onClick={ e => this.props.onSelect(article.number) }
              className={selected === article.number ? "selected" : ""}>
              <h4>{article.subtitle}</h4>
              <div><img src=""/></div>
            </li>
          );
        })}
      </ul>
    );
  }

};

MapsSelector.displayName = "MapsSelector";
export default MapsSelector;
