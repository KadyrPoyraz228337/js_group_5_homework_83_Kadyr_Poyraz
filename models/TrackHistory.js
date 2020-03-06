const mongoose = require('mongoose');

const TrackHistorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Track'
  },
  datetime: {
    type: Date,
    default: () => Date.now()
  }
});

module.exports = mongoose.model('TrackHistory', TrackHistorySchema);