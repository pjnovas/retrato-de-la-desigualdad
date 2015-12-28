import SectionsMenu from "./SectionsMenu.jsx";
import ArticlesMenu from "./ArticlesMenu.jsx";

class Header extends React.Component {

  render() {
    let p = this.props;

    return (
      <div className="header">
        <SectionsMenu
          sections={p.sections}
          selected={p.section.number}/>
        <ArticlesMenu
          section={p.section}
          articles={p.articles}
          selected={p.article.number}/>
      </div>
    );
  }

};

Header.displayName = "Header";
export default Header;