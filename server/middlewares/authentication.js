const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    if (!authorization) {
      throw { name: "UNAUTHORIZED" };
    }
    let token = authorization.split(" ")[1];

    let payload = verifyToken(token);

    // if(!payload){
    //     throw { name : "UNAUTHORIZED"}
    // }

    let findUser = await User.findByPk(payload.id);
    if (!findUser) {
      throw { name: "UNAUTHORIZED" };
    }

    req.userId = findUser.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
