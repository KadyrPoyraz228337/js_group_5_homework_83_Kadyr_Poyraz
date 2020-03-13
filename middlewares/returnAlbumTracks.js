const Track = require('../models/Track');

module.exports = async (req, res, next) => {
  if (req.query.album) {
    try {
      const albumTracks = await Track.find({
        album: req.query.album
      });
      console.log(albumTracks);
      res.send(albumTracks);
    } catch (error) {
      req.json(400).status(404)
    }
  } else {
    next();
  }
};