const mongoose = require('mongoose');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
    await mongoose.connect(
      'mongodb://localhost:27017/music',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );

    const oleg = await Artist.create({
      name: 'Олег',
      photo: 'BAPY-D5iZsbIaIEdDD3gZ.jpg',
      information: 'Some information about Oleg'
    });
    const aye = await Album.create({
      title: 'Ауе',
      artist: oleg,
      dateOfRelease: 2002,
      coverImage: 'rNCEqzubzaJuJ0dQ5IBEu.jpg'
    });
    await Track.create({
      title: 'Something track',
      album: aye,
      duration: 5
    },{
      title: 'Something track 2',
      album: aye,
      duration: 5
    });
};

run().catch(e => {
  throw e
});