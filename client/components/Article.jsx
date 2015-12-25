
class Article extends React.Component {

  render() {
    let article = this.props.article;
    return (
      <div className="article-view">
        {article.number} - {article.title}

      </div>
    );
  }

};

Article.displayName = "Article";
export default Article;
