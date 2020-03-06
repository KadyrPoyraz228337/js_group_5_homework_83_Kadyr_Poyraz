const path = require('path'),
  express = require('express'),
  multer = require("multer"),
  nanoid = require('nanoid'),
  returnAuthorAlbums = require('../middlewares/returnAuthorAlbums'),
  Album = require('../models/Album'),
  config = require('../config'),
  router = express.Router(),

  storage = multer.diskStorage({
    destination: (req, file, cd) => cd(null, config.uploadPath),
    filename: (req, file, cd) => cd(null, nanoid() + path.extname(file.originalname))
  }),
  upload = multer({storage});

router.get('/', returnAuthorAlbums, async (req, res) => {
  try {
    const albumsData = await Album.find();
    res.send(albumsData);
  } catch (error) {
    res.send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const albumData = await Album.find({
      _id: req.params.id
    }).populate('artist');

    res.send(albumData);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/', upload.single('coverImage'), async (req, res) => {
  const albumData = req.body;
  try {
    if (req.file) albumData.coverImage = req.file.filename;
    const album = await Album.create(albumData);
    res.send(album);
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;