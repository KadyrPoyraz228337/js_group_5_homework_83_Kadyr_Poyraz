const path = require('path'),
  express = require('express'),
  multer = require("multer"),
  nanoid = require('nanoid'),
  returnAuthorAlbums = require('../middlewares/returnAuthorAlbums'),
  ifAuth = require('../middlewares/ifAuth'),
  isAuth = require('../middlewares/isAuth'),
  permit = require('../middlewares/permit'),
  Album = require('../models/Album'),
  config = require('../config'),
  router = express.Router(),

  storage = multer.diskStorage({
    destination: (req, file, cd) => cd(null, config.uploadPath),
    filename: (req, file, cd) => cd(null, nanoid() + path.extname(file.originalname))
  }),
  upload = multer({storage});

router.get('/', [ifAuth, returnAuthorAlbums], async (req, res) => {
  try {
    const albumsData = await Album.find();
    res.send(albumsData);
  } catch (error) {
    res.send(error.message);
  }
});

router.put('/:id', [isAuth, permit('admin')], async (req, res) => {
  try {
    const artist = await Album.update({_id: req.params.id}, {
      published: true
    });

    res.send(artist);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const artist = await Album.deleteOne({_id: req.params.id});

    res.send(artist);
  } catch (e) {
    res.status(404).send(e);
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

router.post('/', [isAuth, upload.single('coverImage')], async (req, res) => {
  const albumData = req.body;
  try {
    if (req.file) albumData.coverImage = req.file.filename;
    const album = await Album.create({
      title: albumData.title,
      artist: albumData.artist,
      dateOfRelease: albumData.dateOfRelease,
      coverImage: albumData.coverImage,
      published: false,
      user: req.currentUser._id
    });
    res.send(album);
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;