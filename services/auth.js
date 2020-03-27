const argon2 = require('argon2'),
  User = require('../models/User'),
  crypto = require('crypto'),
  jwt = require('jsonwebtoken');

module.exports = class AuthService {
  constructor() {}

  async login(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({username});
        if (!user) {
          throw new Error('Username or password not correct!');
        } else {
          const correctPassword = await argon2.verify(user.password, password);
          if (!correctPassword) {
            throw new Error('Username or password not correct!');
          }

          const token = this.createJwt(user);
          await User.update({username}, {
            token: token
          });
          resolve({
            user: {
              username: user.username,
              role: user.role
            },
            token
          });
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  async logout(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const message = {message: 'Logout success'};

        if(!token) resolve(message);

        const user = await User.findOne({token});

        if(!user) resolve(message);

        user.token = this.createJwt();
        await user.save();

        resolve(message);
      } catch (e) {
        reject(e)
      }
    })
  }

  async singUp(username, password) {
    return new Promise((async (resolve, reject) => {
      try {
        if(!password) {
          return reject({message: 'User validation failed: password: Path `password` is required.'})
        }

        const salt = crypto.randomBytes(32);
        const hash = await argon2.hash(password, {salt});
        const token = this.createJwt({name: username});

        const user = await User.create({
          username: username,
          password: hash,
          token: token,
        });

        resolve({
          user: {
            username: user.username,
            role: user.role
          },
          token
        })
      } catch (e) {
        if(e.name === 'MongoError') {
          return reject({message: 'A user with that username already exists'})
        }
        reject(e)
      }
    }))
  }

  createJwt(user) {
    return jwt.sign({
      data: {
        name: user.name
      }
    }, 'AswQas4Rta_1', {expiresIn: '6h'})
  }
};