module.exports = {
  all: {
    options: {
      report: 'gzip'
    },
    files: {
      'public/css/<%= pkg.name %>.css': [ 'public/css/<%= pkg.name %>.css' ]
    }
  }
};
