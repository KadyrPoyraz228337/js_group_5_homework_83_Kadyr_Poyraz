const express = require('express'),
  isAuth = require('../middlewares/isAuth'),
  TrackHistory = require('../models/TrackHistory'),
  router = express.Router();

router.post('/', isAuth, async (req, res) => {
  try {
    const trackHistory = await TrackHistory.create({
      user: req.currentUser._id,
      track: req.body.track
    });
    res.send(trackHistory);
  } catch (e) {
    res.json(e).status(500)
  }
});

module.exports = router;