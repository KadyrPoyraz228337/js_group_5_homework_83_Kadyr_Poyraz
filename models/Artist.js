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
        }
    }, {
        versionKey: false
    });

module.exports = mongoose.model('Artist', ArtistSchema);