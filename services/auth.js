const argon2 = require('argon2'),
  User = require('../models/User'),
  crypto = require('crypto'),
  jwt = require('jsonwebtoken');

module.exports = class AuthService {
  constructor() {}

  async login(username, password) {
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({username});
      if (!user) {
        throw new Error('Username or password not correct!');
      } else {
        const correctPassword = await argon2.verify(user.password, password);
         if (!correctPassword) {
          throw new Error('Username or password not correct!');
        }

        const token = this.creteJwt(user);
        await User.update({username}, {
          token: token
        });
        resolve({
          user: {
            name: user.username
          },
          token
        });
      }
    })
  }

  async singUp(username, password) {
    return new Promise((async (resolve, reject) => {
      const salt = crypto.randomBytes(32);
      const hash = await argon2.hash(password, {salt});
      const token = this.creteJwt({name: username});

      const user = await User.create({
        username: username,
        password: hash,
        token: token
      });

      resolve({
        user: {
          name: user.username
        },
        token
      })
    }))
  }

  creteJwt(user) {
    return jwt.sign({
      data: {
        name: user.name
      }
    }, 'AswQas4Rta_1', {expiresIn: '6h'})
  }
}