const express = require('express'),
  returnArtistTracks = require('../middlewares/returnArtistTracks'),
  Track = require('../models/Track'),
  router = express.Router();

router.get('/', returnArtistTracks, async (req, res) => {
  try {
    const tracksData = await Track.find();
    res.send(tracksData);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {
  const trackData = req.body;
  try {
    const track = new Track(trackData);
    track.save();

    res.send(track);
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;