module.exports = {
  compiled: {
    files: [
      { 'public/js/<%= pkg.name %>.js': [ 'client/dist/<%= pkg.name %>.js' ] },
      { 'public/css/<%= pkg.name %>.css': [ 'client/dist/<%= pkg.name %>.css' ] }
    ]
  }
};
