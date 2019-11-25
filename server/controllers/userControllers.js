import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../model/Users";

require("dotenv").config();
const { JWT_SECRET } = process.env;
class userControllers {
  // user can sign up controller
  static userSignup(req, res) {
    const {
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      username
    } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: err });
      const newUser = [
        {
          id: Users.length + 1,
          firstname,
          lastname,
          email,
          password,
          phoneNumber,
          username,
          isAdmin: false
        }
      ];
      const findEmail = Users.find(user => user.email === email);
      const findUsername = Users.find(user => user.username === username);
      if (findEmail) return res.status(400).send("user with that email exists");
      if (findUsername) return res.status(400).send("username already exists");
      const userToken = jwt.sign({ newUser }, JWT_SECRET);
      newUser.password = hash;
      Users.push(newUser);
      return res.status(201).json({
        status: res.statusCode,
        message: "user Created successfull",
        data: {
          userToken,
          firstname,
          lastname,
          email,
          phoneNumber,
          username
        }
      });
    });
  }
}
export default userControllers;
