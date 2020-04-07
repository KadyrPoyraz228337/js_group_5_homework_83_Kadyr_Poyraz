const
  path = require('path'),
  express = require('express'),
  multer = require("multer"),
  nanoid = require('nanoid'),
  isAuth = require('../middlewares/isAuth'),
  ifAuth = require('../middlewares/ifAuth'),
  permit = require('../middlewares/permit'),
  Artist = require('../models/Artist'),
  config = require('../config'),
  router = express.Router(),

  storage = multer.diskStorage({
    destination: (req, file, cd) => cd(null, config.uploadPath),
    filename: (req, file, cd) => cd(null, nanoid() + path.extname(file.originalname))
  }),
  upload = multer({storage});

router.get('/', ifAuth, async (req, res) => {
  try {
    let artistsData = null;
    if(req.currentUser.role === 'admin') {
      artistsData = await Artist.find();
    } else {
      artistsData = await Artist.find({
        $or: [
          {published: true},
          {user: req.currentUser._id, published: false}
        ]
      });
    }
    res.send(artistsData);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const artistData = await Artist.findOne({
      _id: req.params.id
    });
    res.send(artistData);
  } catch (error) {
    res.send(error);
  }
});

router.put('/:id', [isAuth, permit('admin')], async (req, res) => {
  try {
    const artist = await Artist.update({_id: req.params.id}, {
      published: true
    });

    res.send(artist);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete('/:id', [isAuth, permit('admin')], async (req, res) => {
  try {
    const artist = await Artist.deleteOne({_id: req.params.id});

    res.send(artist);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post('/', [isAuth, upload.single('photo')], async (req, res) => {
  const artistData = req.body;
  try {
    if (req.file) artistData.photo = req.file.filename;
    const artist = await Artist.create({
      name: artistData.name,
      information: artistData.information,
      photo: artistData.photo,
      published: false,
      user: req.currentUser._id
    });
    res.send(artist);
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
});

module.exports = router;