
import Slider from "react-slick";
import Loading from "./Loading.jsx";

class Testimonials extends React.Component {

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
    let articles = this.props.articles;

    if (!articles || !articles.length){
      return (
        <Loading />
      );
    }

    articles = this.shuffleArray(articles);

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true
    };

    return (
      <section className="testimonials">

        <div className="content">
          <div className="tag">
            <span>Testimonios</span>
          </div>
          <Slider {...settings}>
          { articles.map( article => {
            let [author] = article.authors || [""];

            return (
              <div key={article.number}>
                <div className="body" dangerouslySetInnerHTML={{__html: "\"" + article.body + "\""}}></div>
                <div className="author">{author}</div>
              </div>
            );
          })}
          </Slider>
        </div>

      </section>
    );
  }

};

Testimonials.displayName = "Testimonials";
export default Testimonials;
