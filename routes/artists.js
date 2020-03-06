const path = require('path'),
  express = require('express'),
  multer = require("multer"),
  nanoid = require('nanoid'),
  Artist = require('../models/Artist'),
  config = require('../config'),
  router = express.Router(),

  storage = multer.diskStorage({
    destination: (req, file, cd) => cd(null, config.uploadPath),
    filename: (req, file, cd) => cd(null, nanoid() + path.extname(file.originalname))
  }),
  upload = multer({storage});

router.get('/', async (req, res) => {
  try {
    const artistsData = await Artist.find();
    res.send(artistsData);
  } catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const artistData = await Artist.findOne({
      _id: req.params.id
    });
    console.log(artistData);
    res.send(artistData);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', upload.single('photo'), async (req, res) => {
  const artistData = req.body;
  try {
    if (req.file) artistData.photo = req.file.filename;
    const artist = await Artist.create(artistData);
    res.send(artist);
  } catch (error) {
    res.status(400).send(error)
  }
});

module.exports = router;