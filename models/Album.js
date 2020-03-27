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
    },
    published: {
      type: Boolean,
      required: true,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, {
    versionKey: false
  });

module.exports = mongoose.model('Album', AlbumSchema);