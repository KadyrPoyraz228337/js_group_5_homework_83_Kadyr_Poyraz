const express = require('express'),
  mongoose = require('mongoose'),
  config = require('./config'),
  artists = require('./app/artists'),
  albums = require('./app/albums'),
  tracks = require('./app/tracks'),
  app = express();

app.use(express.json());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect(
    'mongodb://localhost:27017/music',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  app.use('/artists', artists);
  app.use('/albums', albums);
  app.use('/tracks', tracks);

  app.listen(config.port, async () => {
    console.log(`HTTP server start on ${config.port} port!`);
  })
};

run().catch(error => {
  console.error(error);
});