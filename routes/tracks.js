const express = require('express'),
  returnArtistTracks = require('../middlewares/returnArtistTracks'),
  returnAlbumTracks = require('../middlewares/returnAlbumTracks'),
  autoincrement = require('../middlewares/autoIncrement'),
  Track = require('../models/Track'),
  router = express.Router();

router.get('/', returnArtistTracks, returnAlbumTracks, async (req, res) => {
  try {
    const tracksData = await Track.find();
    res.send(tracksData);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', autoincrement, async (req, res) => {
  const trackData = req.body;
  try {
    const track = await Track.create(trackData);
    res.send(track);
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;