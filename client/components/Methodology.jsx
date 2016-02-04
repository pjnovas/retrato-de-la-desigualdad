
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
      <div className="methodology">
        <div className="content-center">
          <h1>Metodología</h1>
          <div className="narrow-content">
            <div className="body"
              dangerouslySetInnerHTML={{__html: article.body}}>
            </div>
          </div>
        </div>
      </div>
    );
  }

};

IntroArticle.displayName = "IntroArticle";
export default IntroArticle;
