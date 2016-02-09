module.exports = {
  all: {
    options: {
      //banner: '<%= banner %>',
      stripBanners: {
        line: true
      },
    },
    files: {
      'public/js/<%= pkg.name %>.js': [ 'public/js/<%= pkg.name %>.js' ]
    }
  }
};
