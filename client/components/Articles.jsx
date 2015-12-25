
//import Article from "./Article.jsx";

class Articles extends React.Component {

  render() {
    return (
      <div className="article-view">
        Articulos para la seccion actual ({this.props.section})
      </div>
    );
  }

};

Articles.displayName = "Articles";
export default Articles;
