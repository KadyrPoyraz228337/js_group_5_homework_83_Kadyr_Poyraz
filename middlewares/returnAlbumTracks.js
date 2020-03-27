const Track = require('../models/Track');

module.exports = async (req, res, next) => {
  if (req.query.album) {
    try {
      let albumTracks = null;
      if(req.currentUser.role === 'admin') {
        albumTracks = await Track.find({album: req.query.album});
      } else {
        albumTracks = await Track.find({
          $or: [
            {published: true, album: req.query.album},
            {user: req.currentUser._id, published: false, album: req.query.album}
          ]
        });
      }
        res.send(albumTracks);
    } catch (error) {
      req.json(400).status(404)
    }
  } else {
    next();
  }
};