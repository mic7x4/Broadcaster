import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const saltRound = 10;
const { JWT_SECRET } = process.env;

class helper {
  static signJwt(user) {
    return jwt.sign({ user }, JWT_SECRET, { expiresIn: '24h' });
  }

  static verifyJwt(token) {
    const check = jwt.verify(token, JWT_SECRET);
    return check;
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, saltRound);
  }

  static compareHash(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}


export default helper;
