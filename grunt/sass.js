module.exports = {
  app: {
    options: {
      style: 'expanded',
      require: 'susy'
    },
    files: {
      "client/dist/<%= pkg.name %>.css": 'client/index.scss'
    }
  }
};
