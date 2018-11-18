const express = require('express');

const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const options = {
    root: __dirname + '/public/',
  }
  res.sendFile('index.html', options);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
