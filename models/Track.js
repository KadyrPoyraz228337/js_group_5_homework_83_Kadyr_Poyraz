const mongoose = require('mongoose'),

  TrackSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    trackNumber: {
      type: Number,
      required: true,
      default: 1
    },
    videoId: String
  }, {
    versionKey: false
  });

module.exports = mongoose.model('Track', TrackSchema);