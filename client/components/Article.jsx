
class Article extends React.Component {

  render() {
    let article = this.props.article;
    return (
      <div className="article-view">
        {article.hasMap ?
          <div className="article-map">
            <iframe width="100%" height="520" frameBorder="0" src={article.map.url} allowFullScreen>
            </iframe>
          </div>
        : null }
        <div className="article-content">
          <h1>{article.title}</h1>
          <div dangerouslySetInnerHTML={{__html: article.body}}></div>
        </div>
      </div>
    );
  }

};

Article.displayName = "Article";
export default Article;
