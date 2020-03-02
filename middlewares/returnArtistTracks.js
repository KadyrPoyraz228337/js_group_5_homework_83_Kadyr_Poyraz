const Track = require('../models/Track'),
  Album = require('../models/Album');

module.exports = async (req, res, next) => {
  if (req.query.artist) {
    try {
      let tracks = [];
      const albumData = await Album.find({
        artist: req.query.artist
      });
      (await Promise.all(albumData.map(album => {
        return Track.find({
          album: album._id
        });
      }))).forEach(tracksItem => {
        tracks = [...tracks, ...tracksItem]
      });
      res.send(tracks);
    } catch (error) {
      res.json(error).status(400);
    }
  } else {
    next()
  }
};