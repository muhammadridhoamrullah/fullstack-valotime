let jwt = require("jsonwebtoken");

let secret = process.env.SECRET;

let signToken = (payload) => {
  return jwt.sign(payload, secret);
};

let verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { signToken, verifyToken };
