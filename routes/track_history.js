const express = require('express'),
  isAuth = require('../middlewares/isAuth'),
  TrackHistoryService = require('../services/trackHistory'),
  router = express.Router();

router.post('/', isAuth, async (req, res) => {
  try {
    const id = req.currentUser._id.toString();
    const track = req.body.track;

    const trackHistoryService = new TrackHistoryService();
    const trackHistory = await trackHistoryService.setTrack(id, track);
    res.send(trackHistory);
  } catch (e) {
    res.json(e).status(500)
  }
});

router.get('/', isAuth, async (req, res) => {
  try {
    const id = req.currentUser._id;

    const trackHistoryService = new TrackHistoryService();
    const trackHistory = await trackHistoryService.getHistory(id);
    res.send(trackHistory);
  } catch (e) {
    res.json(e).status(500)
  }
});

module.exports = router;