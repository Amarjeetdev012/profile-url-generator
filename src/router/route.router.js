import express from 'express';
import { User } from '../model/user.model.js';

const router = express.Router();

router.get('/users/:id', (req, res, next) => {
  try {
    const userName = req.params.id;
    User.findOne({ userName: userName })
      .then((doc) => {
        res
          .status(200)
          .send({ status: true, message: 'user info', data: doc });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
});

router.post('/generateLink', async (req, res) => {
  const data = req.body;
  const { name, userName, email } = data;
  const baseUrl = 'http://localhost:3000';
  const userLink = `${baseUrl}/users/${userName}`;

  const user = await User.findOne({ userName: userName });
  if (user) {
    return res
      .status(200)
      .send({ status: true, message: 'user link already created', data: user });
  }
  const userData = {
    name: name,
    userName: userName,
    email: email,
    link: userLink,
  };
  const userObj = await User.create(userData);
  res
    .status(201)
    .send({ status: true, message: 'user link created', data: userObj });
});

export default router;
