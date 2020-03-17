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

    const collections = await mongoose.connection.db.listCollections().toArray();

    for(let coll of collections) {
      await mongoose.connection.db.dropCollection(coll.name)
    }


    const [alexasndr, zip] = await Artist.create({
      name: 'Александр Пистолетов',
      photo: 'vs5rEjngrKYSDH8OVc-b8.jpeg',
      information: 'Александр на столько крут, что не нуждается в описании'
    }, {
      name: 'Зипуля',
      photo: 'зипуля.jpg',
      information: 'Александр на столько крут, что не нуждается в описании'
    });
    const [vital, zipulya] = await Album.create({
      title: 'Жизненный',
      artist: alexasndr,
      dateOfRelease: 2012,
      coverImage: 'uL5MPjduPdCW0VrVFkbQx.jpg',
    }, {
      title: 'Зипуля бит',
      artist: zip,
      dateOfRelease: 2015,
      coverImage: 'зипуля-альбом.jpg',
    });
    await Track.create({
      title: 'Из России в Украину',
      videoId: 'K6jNEu-JENc',
      album: vital,
      duration: 2.5
    },{
      title: 'Я новый пират',
      videoId: 'LmIyqssFQG0',
      album: vital,
      duration: 4
    }, {
      title: 'Занимаюсь спортом я',
      videoId: 'jXjbTcFBJXA',
      album: zipulya,
      duration: 3.3
    }, {
      title: 'Не будь каблуком',
      videoId: 'R1CesHrh9ck',
      album: zipulya,
      duration: 0.3
    });

    mongoose.connection.close();
};

run().catch(e => {
  throw e
});