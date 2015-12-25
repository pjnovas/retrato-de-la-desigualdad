
import { convertTitleToPath } from '../utils';
import { Button } from "./controls";

class ArticlesMenu extends React.Component {

  render() {
    let section = this.props.section;
    section = convertTitleToPath(section.title);

    return (
      <ul className="articles">
        { this.props.articles.map( a => {
          return (
            <li key={a.number}
              className={a.number === this.props.selected ? "selected": ""}>
              <Button to={"/" + section + "/" + convertTitleToPath(a.title)}>
                {a.title}
              </Button>
            </li>
          );
        })}
      </ul>
    );
  }

};

ArticlesMenu.displayName = "ArticlesMenu";
export default ArticlesMenu;
