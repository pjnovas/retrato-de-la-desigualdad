module.exports = {

  app: {
    files: [ 'client/**/*.scss', 'public/<%= pkg.name %>.js' ],
    tasks: [ 'eslint', 'sass' ],
    options: {
      atBegin: true
    }
  }

};
