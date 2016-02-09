module.exports = {

  app: {
    files: [ 'client/**/*.scss', 'client/dist/<%= pkg.name %>.js' ],
    tasks: [ 'eslint', 'sass', 'copy:compiled' ],
    options: {
      atBegin: true
    }
  }

};
