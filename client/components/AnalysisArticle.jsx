
import Loading from "./Loading.jsx";

class AnalysisArticle extends React.Component {

  render() {
    let article = this.props.article;

    if (!article){
      return (
        <Loading />
      );
    }

    let [author] = article.authors || [""];

    return (
      <section className="analysis-article">
        <div className="content">
          <div className="tag">
            <span>Analice de Extremos</span>
          </div>
          <div className="body" dangerouslySetInnerHTML={{__html: article.body}}></div>
          <div className="author">{author}</div>
        </div>
      </section>
    );
  }

};

AnalysisArticle.displayName = "AnalysisArticle";
export default AnalysisArticle;
