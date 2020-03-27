module.exports = (...roles) => (req, res, next) => {
  if(!req.currentUser) {
    return res.status(401).send({message: 'Unauthenticated'})
  }

  if(!roles.includes(req.currentUser.role)) {
    return res.status(401).send({message: 'Forbidden'})
  }

  next()
};