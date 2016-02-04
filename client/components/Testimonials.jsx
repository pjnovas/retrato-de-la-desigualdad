
import Slider from "react-slick";
import Loading from "./Loading.jsx";

class Testimonials extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      articles: null
    };
  }

  componentWillReceiveProps(nextProps){
    let articles = nextProps.articles;

    if (this.state.articles && this.state.articles.length){
      return;
    }

    this.setState({ articles: this.shuffleArray(articles) });
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  render() {
    let articles = this.state.articles;

    if (!articles || !articles.length){
      return (
        <Loading />
      );
    }

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true
    };

    return (
      <div className="testimonials">
        <div className="content-center">
          <h1>Testimonios</h1>
          <div className="narrow-content">
            <Slider {...settings}>
            { articles.map( article => {
              let [author] = article.authors || [""];

              return (
                <div key={article.number} className="wrap">
                  <div className="body" dangerouslySetInnerHTML={{__html: "\"" + article.body + "\""}}></div>
                  <div className="author">{author}</div>
                </div>
              );
            })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }

};

Testimonials.displayName = "Testimonials";
export default Testimonials;
