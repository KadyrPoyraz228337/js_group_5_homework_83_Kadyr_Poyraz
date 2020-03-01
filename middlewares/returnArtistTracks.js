const Track = require('../models/Track'),
  Album = require('../models/Album');

module.exports = async (req, res, next) => {
  if(req.query.artist) {
    try {
      const albumData = await Album.find({
        artist: req.query.artist
      });
      const artistTracks = await Track.find({
        album: albumData[0]._id
      });
      res.send(artistTracks);
    } catch (error) {
      res.json(error).status(400);
    }
  } else {
    next()
  }
};