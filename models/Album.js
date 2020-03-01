const mongoose = require('mongoose'),

  AlbumSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true
    },
    dateOfRelease: {
      type: String,
      required: true
    },
    coverImage: {
      type: String,
      required: true
    }
  }, {
    versionKey: false
  });

module.exports = mongoose.model('Album', AlbumSchema);