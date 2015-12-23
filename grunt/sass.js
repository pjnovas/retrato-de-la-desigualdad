module.exports = {
  app: {
    options: {
      style: 'expanded',
      require: 'susy'
    },
    files: {
      "public/css/<%= pkg.name %>.css": 'client/index.scss'
    }
  }
};
