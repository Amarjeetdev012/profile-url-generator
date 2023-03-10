import { User } from '../model/user.model.js';
import bcrypt from 'bcryptjs';

export const getUser = async (req, res) => {
  try {
    const userName = req.params.id;
    User.findOne({ userName: userName })
      .then((doc) => {
        if (doc) {
          doc.link = undefined;
          doc.password = undefined;
          res
            .status(200)
            .send({ status: true, message: 'user info', data: doc });
        } else {
          return res
            .status(404)
            .send({ status: false, message: 'no user found' });
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};


export const generateLink = async (req, res) => {
  try {
    const data = req.body;
    const { name, userName, email, password } = data;
    const baseUrl = 'http://localhost:3000';
    const userLink = `${baseUrl}/users/${userName}`;
    const user = await User.findOne({ userName: userName });
    if (user) {
      return res.status(200).send({
        status: true,
        message: 'user link already created',
        link: user.link,
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const userData = {
      name: name,
      userName: userName,
      email: email,
      link: userLink,
      password: hash,
    };
    const userObj = await User.create(userData);
    res
      .status(201)
      .send({ status: true, message: 'user link created', link: userObj.link });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
