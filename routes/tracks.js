const express = require('express'),
  returnArtistTracks = require('../middlewares/returnArtistTracks'),
  returnAlbumTracks = require('../middlewares/returnAlbumTracks'),
  autoincrement = require('../middlewares/autoIncrement'),
  ifAuth = require('../middlewares/ifAuth'),
  isAuth = require('../middlewares/isAuth'),
  permit = require('../middlewares/permit'),
  Track = require('../models/Track'),
  router = express.Router();


router.get('/', ifAuth, returnArtistTracks, returnAlbumTracks, async (req, res) => {
  try {
    const tracksData = await Track.find();
    res.send(tracksData);
  } catch (error) {
    res.send(error);
  }
});

router.put('/:id', [isAuth, permit('admin')], async (req, res) => {
  try {
    const artist = await Track.update({_id: req.params.id}, {
      published: true
    });

    res.send(artist);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const artist = await Track.deleteOne({_id: req.params.id});

    res.send(artist);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post('/', ifAuth, autoincrement, async (req, res) => {
  const trackData = req.body;
  try {
    const track = await Track.create({
      title: trackData.title,
      album: trackData.album,
      duration: trackData.duration,
      trackNumber: trackData.trackNumber,
      videoId: trackData.videoId,
      published: false,
      user: req.currentUser._id
    });
    res.send(track);
  } catch (error) {
    console.log(error);
    res.send(error)
  }
});

module.exports = router;