
import Slider from "react-slick";
import Loading from "./Loading.jsx";

class Testimonials extends React.Component {

  render() {
    let articles = this.props.articles;

    if (!articles || !articles.length){
      return (
        <Loading />
      );
    }

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
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
                <div className="body" dangerouslySetInnerHTML={{__html: article.body}}></div>
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
