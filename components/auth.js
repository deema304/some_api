const secret = require('../config/config').tokenSecret;
const jwt = require('jsonwebtoken');

class Auth {
  constructor() {}

  createToken(email) {
    return jwt.sign({email},
      secret,
      {
        expiresIn: '1min'
      }
    );
  }

  validateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };
}

module.exports = Auth;