module.exports = function (app) {
  // Serve index.html at the root route of the website
  app.get('/', (req, res) => {
    res.sendFile('index.html');
  });
};
