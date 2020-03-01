const Album = require('../models/Album');

module.exports = async (req, res, next) => {
  if (req.query.artist) {
    try {
      const artistAlbums = await Album.find({
        artist: req.query.artist
      });
      res.send(artistAlbums);
    } catch (error) {
      res.json(error).status(404);
    }
  } else {
    next()
  }
};