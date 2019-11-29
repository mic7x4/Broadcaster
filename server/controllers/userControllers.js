import dotenv from 'dotenv';
import helper from '../helpers/helpers';
import Users from '../model/Users';

dotenv.config();
const { signJwt, hashPassword, compareHash } = helper;
class userControllers {
  // User signup Controlller
  static userSignup(req, res) {
    const {
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      username,
    } = req.body;
    const newUser = {
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      username,
      isAdmin: false,
    };
    const emailIndex = Users.findIndex((uemail) => uemail.email === email);
    const usernameIndex = Users.findIndex((uIndex) => uIndex.username === username);
    if (emailIndex >= 0) return res.json({ message: 'Email already exists' });
    if (usernameIndex >= 0) return res.json({ message: 'Username taken' });
    const hashedPassword = hashPassword(password);
    const userToken = signJwt(newUser);
    newUser.password = hashedPassword;
    const userEmail = newUser.email;
    if (userEmail) {
      Users.push(newUser);
      return res.status(201).json({
        status: res.statusCode,
        message: 'user Created successfull',
        data: {
          userToken,
          id: Users.length + 1,
          firstname,
          lastname,
          email,
          phoneNumber,
          username,
          isAdmin: false,
        },
      });
    }
    return res.status(400).json({
      status: res.statusCode,
      message: 'Email not found',
    });
  }

  //   User signin Controllers
  static userSignin(req, res) {
    const { email, password } = req.body;
    const userwithEmail = Users.find((user) => user.email === email);
    const userEmail = userwithEmail.email;
    const findPassword = userwithEmail.password;
    const compare = compareHash(password, findPassword);
    const userToken = signJwt(email);
    if (userEmail && compare) {
      return res.status(200).json({
        status: res.statusCode,
        message: 'User is successfully logged in',
        data: {
          userToken,
        },
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      message: 'User not found',
    });
  }
}
export default userControllers;
