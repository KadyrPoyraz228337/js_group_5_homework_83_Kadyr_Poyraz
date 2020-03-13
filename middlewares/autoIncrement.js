const Track = require('../models/Track');

module.exports = async (req, res, next) => {
  try {
    const trackNumber = await Track.find();
    req.body.trackNumber = trackNumber.length+1;
    next()
  } catch (e) {
    res.status(404).send(e)
  }
};