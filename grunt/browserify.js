var _ = require('lodash');

var options = {
  browserifyOptions: {
    debug: true
  },
  debug: true,
  extension: [ '.js', '.jsx' ],
  transform: [
    [ 'babelify', {
      presets: [
        "stage-0",
        "es2015",
        "react"
      ],
      plugins: [
        "transform-runtime",
        "babel-plugin-add-module-exports",
        "transform-class-properties"
      ]
    } ],
    [ require('grunt-react').browserify, { global: true } ],
  ],
};

var optsW = _.extend(_.clone(options), { watch: true });

module.exports = {
  app: {
    options: options,
    src: ['client/index.js'],
    dest: 'public/js/<%= pkg.name %>.js'
  },

  watch: {
    options: optsW,
    src: ['client/index.js'],
    dest: 'public/js/<%= pkg.name %>.js'
  }

};
