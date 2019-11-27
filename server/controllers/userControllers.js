import dotenv from 'dotenv';
import helper from '../helpers/helpers';
import Users from '../model/Users';

dotenv.config();
const { signJwt, hashPassword } = helper;
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
    const newUser = [
      {
        id: Users.length + 1,
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        username,
        isAdmin: false,
      },
    ];
    const hashedPassword = hashPassword(password);
    const userToken = signJwt(newUser);
    newUser.password = hashedPassword;
    Users.push(newUser);
    return res.status(201).json({
      status: res.statusCode,
      message: 'user Created successfull',
      data: {
        userToken,
        firstname,
        lastname,
        email,
        phoneNumber,
        username,
      },
    });
  }
}
export default userControllers;
