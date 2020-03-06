const express = require('express'),
  mongoose = require('mongoose'),
  config = require('./config'),
  artists = require('./routes/artists'),
  albums = require('./routes/albums'),
  tracks = require('./routes/tracks'),
  users = require('./routes/users'),
  track_history = require('./routes/track_history'),
  app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const run = async () => {
  await mongoose.connect(
    'mongodb://localhost:27017/music',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  );

  app.use('/artists', artists);
  app.use('/albums', albums);
  app.use('/tracks', tracks);
  app.use('/users', users);
  app.use('/track_history', track_history);

  app.listen(config.port, async () => {
    console.log(`HTTP server start on ${config.port} port!`);
  })
};

run().catch(error => {
  console.error(error);
});