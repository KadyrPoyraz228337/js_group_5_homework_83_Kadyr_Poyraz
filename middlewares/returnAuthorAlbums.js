const Album = require('../models/Album');
const Track = require('../models/Track');

module.exports = async (req, res, next) => {
  if (req.query.artist) {
    try {
      let artistAlbums = null;
      let search = null;
      if(req.currentUser.role === 'admin') {
        artistAlbums = await Album.find({artist: req.query.artist}, null, {sort: {dateOfRelease: 1}});
        search = undefined;
      } else {
        artistAlbums = await Album.find({
          $or: [
            {published: true, artist: req.query.artist},
            {user: req.currentUser._id, published: false, artist: req.query.artist}
          ]
        }, null, {sort: {dateOfRelease: 1}});
        search = {published: true};
      }
      const data = await Promise.all(artistAlbums.map(async albumItem => {
        const totalTracks = await Track.aggregate([
          { $match: {album: albumItem._id, ...search} },
          { $count: 'totalTracks' }
        ]);
        return {...albumItem._doc, ...totalTracks[0]}
      }));
      res.send(data);
    } catch (error) {
      res.json(error).status(404);
    }
  } else {
    next()
  }
};