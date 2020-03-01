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
        }
    }, {
        versionKey: false
    });

module.exports = mongoose.model('Track', TrackSchema);