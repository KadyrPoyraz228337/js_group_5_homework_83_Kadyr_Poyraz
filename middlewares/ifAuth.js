const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    if (!authHeader) {
      return res.status(404).send({error: 'Access denied'})
    } else {
      const [type, token] = authHeader.split(' ');
      const user = await User.findOne({token});
      if (type !== 'token' || !user) {
        return res.status(404).send({error: 'Access denied'})
      } else {
        req.currentUser = user;
        next();
      }
    }
  } else {
    req.currentUser = {role: 'user'};
    return next()
  }
};