const express = require('express'),
  AuthUser = require('../services/auth'),
  router = express.Router();

router.post('/', async (req, res) => {
  const name = req.body.name,
    password = req.body.password;
  try {
    const service = new AuthUser;
    const {user, token} = await service.singUp(name, password);

    return res.send({user, token})
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  const password = req.body.password,
    username = req.body.username;
  try {
    const service = new AuthUser();
    const {user, token} = await service.login(username, password);

    return res.send({token});
  } catch (error) {
    console.log(error);
    return res.status(500).send({error: 'Internal server error!'});
  }
});

module.exports = router;