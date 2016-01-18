import request from "superagent";

const fetcher = type => {
  return function(done) {

    request
      .get(`/api/articles/${type}`)
      .end( (err, res) => {
        if (err) {
          console.dir({
            type,
            status: err.status,
            body: err.response.body,
            text: err.response.text
          });

          return done(err);
        }

        done(null, res.body);
      });
  };
};

export default {
  getMethodologies: fetcher("methodology"),
  getPublishers: fetcher("publishers"),
  getPlaces: fetcher("places"),
  getTestimonials: fetcher("testimonials")
};
