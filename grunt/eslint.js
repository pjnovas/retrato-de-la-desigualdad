module.exports = {
  options: {
    config: 'eslint.json',
    reset: true
  },
  target: ['client/**/*.js', '!client/dist/**/*.js']
};
