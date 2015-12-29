
import { convertTitleToPath } from '../utils';
import { Link } from "./controls";

class Gallery extends React.Component {

  render() {
    let section = this.props.section;
    section = convertTitleToPath(section.title);

    let articles = this.props.articles;
    let current = this.props.article || this.props.articles[0];

    if (!current.images || !current.images.length) {
      return (null);
    }

    articles = articles.filter(
      a => a.images && a.images.length > 0 && a.images[0].url
    );

    return (
      <div className="gallery-view">
        <ul>
          { articles.map( a => {
            return (
              <li key={a.number}
                className={a.number === current.number ? "selected" : ""}>
                <Link to={"/" + section + "/" + convertTitleToPath(a.title)}>
                  <img src={a.images[0].url} />
                </Link>
              </li>
            );
          })}
        </ul>
        <h1>{current.title}</h1>
        <div dangerouslySetInnerHTML={{__html: current.body}}></div>
      </div>
    );
  }

};

Gallery.displayName = "Gallery";
export default Gallery;
