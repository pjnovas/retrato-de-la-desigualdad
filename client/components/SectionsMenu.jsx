import { convertTitleToPath } from '../utils';
import { Button } from "./controls";

class SectionsMenu extends React.Component {

  render() {
    return (
      <ul>
        { this.props.sections.map( s => {
          return (
            <li key={s.number}
              className={s.number === this.props.selected ? "selected": ""}>
              <Button to={"/" + convertTitleToPath(s.title)}>
                {s.title}
              </Button>
            </li>
          );
        })}
      </ul>
    );
  }

};

SectionsMenu.displayName = "SectionsMenu";
export default SectionsMenu;
