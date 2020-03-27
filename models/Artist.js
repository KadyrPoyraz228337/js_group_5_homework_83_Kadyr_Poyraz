const mongoose = require('mongoose'),

  ArtistSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    information: {
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

module.exports = mongoose.model('Artist', ArtistSchema);