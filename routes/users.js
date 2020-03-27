const express = require('express'),
  AuthUser = require('../services/auth'),
  router = express.Router();

router.post('/', async (req, res) => {
  const name = req.body.username,
    password = req.body.password;
  try {
    const service = new AuthUser;
    const {user, token} = await service.singUp(name, password);

    return res.send({...user, token})
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete('/sessions', async (req, res) => {
  try {
    const token = req.get('Authorization').split(' ')[1];

    const service = new AuthUser();
    const success = await service.logout(token);

    res.send(success);
  } catch (e) {
    res.send({message: 'Logout success'});
  }
});

router.post('/sessions', async (req, res) => {
  const password = req.body.password,
    username = req.body.username;
  try {
    const service = new AuthUser();
    const {user, token} = await service.login(username, password);

    return res.send({...user, token});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;