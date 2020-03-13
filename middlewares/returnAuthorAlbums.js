const Album = require('../models/Album');
const Track = require('../models/Track');

module.exports = async (req, res, next) => {
  if (req.query.artist) {
    try {
      const artistAlbums = await Album.find({artist: req.query.artist}, null, {sort: {dateOfRelease: 1}});
      const data = await Promise.all(artistAlbums.map(async albumItem => {
        const totalTracks = await Track.aggregate([
          { $match: {album: albumItem._id} },
          { $count: 'totalTracks' }
        ])
        return {...albumItem._doc, ...totalTracks[0]}
      }))
      res.send(data);
    } catch (error) {
      res.json(error).status(404);
    }
  } else {
    next()
  }
};