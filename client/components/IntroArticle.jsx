
import Loading from "./Loading.jsx";

class IntroArticle extends React.Component {

  render() {
    let article = this.props.article;

    if (!article){
      return (
        <Loading />
      );
    }

    return (
      <section className="intro-article">
        <div className="title">
          <h1>Retrato de la Desigualdad</h1>
          <h2>{article.title}</h2>
        </div>
        <div className="section-name">
          <span>Metodología</span>
        </div>
        <div className="body"
          dangerouslySetInnerHTML={{__html: article.body}}>
        </div>
      </section>
    );
  }

};

IntroArticle.displayName = "IntroArticle";
export default IntroArticle;
