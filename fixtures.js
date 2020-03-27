const mongoose = require('mongoose');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require('./models/User');

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

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name)
  }

  const [admin, user, user2] = await User.create({
    "role" : "admin",
    "username" : "admin",
    "password" : "$argon2i$v=19$m=4096,t=3,p=1$UKYYmzICR+TT8o+jTlurV1qt7gUPx72VNzzrqspY+as$vvgQwNZA4uf054aQ7Tr7NiskrMwmF5PthVbA3HB+muw", // admin
    "token" : "asclaslfkn4l45khv324bj42jh34bjk234jkjb234ln",
  }, {
    "role" : "user",
    "username" : "user",
    "password" : "$argon2i$v=19$m=4096,t=3,p=1$VTPqUjiSDwoGl/JcZ4TPFx++hlodJoMC7OlHnCjaI24$l7bkb4qG+pCHKuuz30Qqv6JXkwMqIaMaP8EGsFsGR4g", // user
    "token" : "asdasdadfgd32jh234j2lh234j23;42;4k;;dfsk;w3",
  }, {
    "role" : "user",
    "username" : "user2",
    "password" : "$argon2i$v=19$m=4096,t=3,p=1$M7axK6xaofv1FxS+R4Rqkkl99fARvmxU6C0iwQQRkh8$ZzMtq5GaWGx0XXJanMEdOXetUMFkdmeDjpAiTWmi50E", // user2
    "token" : "asdafgd32jh234j2l23234342234sd42;4k;;dfsk;w3",
  });

  const [zip, alexandr] = await Artist.create({
    name: 'Зипуля',
    photo: 'зипуля.jpg',
    information: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
    published: false,
    user: user2
  }, {
    name: 'Александр Пистолетов',
    photo: 'пистолетов.jpeg',
    information: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
    published: true,
    user: user
  });

  const [one, two, oneZ, twoZ] = await Album.create({
    title: 'Первый альбом',
    artist: alexandr,
    dateOfRelease: '11.12.2015',
    coverImage: 'скачемнадельфинах.jpg',
    published: false,
    user: user
  }, {
    title: 'Второй альбом',
    artist: alexandr,
    dateOfRelease: '01.12.2015',
    coverImage: 'самурай.jpg',
    published: true,
    user: user
  },{
    title: 'Underground',
    artist: zip,
    dateOfRelease: '01.12.1228',
    coverImage: 'зипуля-первый-альбом.jpg',
    published: false,
    user: user2
  },{
    title: 'Это зип',
    artist: zip,
    dateOfRelease: '01.12.1337',
    coverImage: 'зипуля-второй-альбом.jpg',
    published: false,
    user: user2
  });

  await Track.create({
    title: 'Самурай',
    album: two,
    duration: 4.4,
    trackNumber: 1,
    videoId: 'myqOELuVpKc',
    published: true,
    user: user
  },{
    title: 'Я русский богатырь',
    album: two,
    duration: 4.4,
    trackNumber: 2,
    videoId: 'bjyccXpUGVc',
    published: false,
    user: user
  },{
    title: 'Из России в Украину',
    album: one,
    duration: 2.5,
    trackNumber: 3,
    videoId: 'K6jNEu-JENc&t=36s',
    published: true,
    user: user
  },{
    title: 'Я стал новым пиратом',
    album: one,
    duration: 6,
    trackNumber: 4,
    videoId: '6L02_JxjBmo',
    published: false,
    user: user
  },{
    title: 'Не будь каблуком',
    album: oneZ,
    duration: 0.3,
    trackNumber: 5,
    videoId: 'R1CesHrh9ck',
    published: false,
    user: user2
  },{
    title: 'Подземная',
    album: oneZ,
    duration: 3.5,
    trackNumber: 6,
    videoId: '0yHwpwE5xrA',
    published: false,
    user: user2
  },{
    title: 'Это zip',
    album: twoZ,
    duration: 3,
    trackNumber: 7,
    videoId: 'Qfe99MXP01c',
    published: false,
    user: user2
  },{
    title: 'Занимаюсь спортом я',
    album: twoZ,
    duration: 3.3,
    trackNumber: 8,
    videoId: 'jXjbTcFBJXA',
    published: false,
    user: user2
  });

    mongoose.connection.close();
};

run().catch(e => {
  throw e
});