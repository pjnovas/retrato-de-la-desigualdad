import request from "superagent";

const fetcher = type => {
  return function(done) {

    if (window.app.sections.hasOwnProperty(type)) {
      // Already fetched - maybe add localstorage later?
      return done(null, window.app.sections[type]);
    }

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

        window.app.sections[type] = res.body; // store as client cache
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
