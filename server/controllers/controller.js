const axios = require("axios");
const { comparePass } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
let { User, Tag, Post, PostTag } = require("../models/index");
const openAI = require("../helpers/openai");
const midtransClient = require("midtrans-client");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class Controller {
  static async register(req, res, next) {
    try {
      let { email, password, username, fullName } = req.body;
      let newUser = await User.create({
        email,
        password,
        username,
        fullName,
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email) {
        throw { name: "EMAIL_NOT_FOUND" };
      }
      if (!password) {
        throw { name: "PASSWORD_NOT_FOUND" };
      }

      let findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "INVALID_EMAIL_PASS" };
      }

      let comparingPassword = comparePass(password, findUser.password);

      if (!comparingPassword) {
        throw { name: "INVALID_EMAIL_PASS" };
      }

      let access_token = signToken({ id: findUser.id });

      res.json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async agents(req, res, next) {
    try {
      const response = await axios.get("https://valorant-api.com/v1/agents");

      res.json(response.data.data);
    } catch (error) {
      next(error);
    }
  }

  static async agentsByUUID(req, res, next) {
    try {
      let { uuid } = req.params;
      let dataAgents = await axios.get(
        `https://valorant-api.com/v1/agents/${uuid}`
      );
      if (!dataAgents) {
        throw { name: "DATANOTFOUND" };
      }

      res.status(200).json(dataAgents.data.data);
    } catch (error) {
      next(error);
    }
  }

  static async maps(req, res, next) {
    try {
      const response = await axios.get("https://valorant-api.com/v1/maps");

      res.json(response.data.data);
    } catch (error) {
      next(error);
    }
  }

  static async weapons(req, res, next) {
    try {
      const response = await axios.get("https://valorant-api.com/v1/weapons");

      res.json(response.data.data);
    } catch (error) {
      next(error);
    }
  }

  static async gameModes(req, res, next) {
    try {
      const response = await axios.get("https://valorant-api.com/v1/gamemodes");

      res.json(response.data.data);
    } catch (error) {
      next(error);
    }
  }

  static async rank(req, res, next) {
    try {
      const response = await axios.get(
        "https://valorant-api.com/v1/competitivetiers"
      );

      res.json(response.data.data);
    } catch (error) {
      next(error);
    }
  }

  static async OpenAI(req, res, next) {
    try {
      let { map } = req.body;
      let responseOpenAI = await openAI(map);

      res.send(responseOpenAI);
    } catch (error) {
      next(error);
    }
  }

  static async generateMidtransToken(req, res, next) {
    try {
      let findUser = await User.findByPk(req.userId);
      if (!findUser) {
        throw { name: "DATANOTFOUND" };
      }

      // console.log(findUser);

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "Transaction_" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: 5000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: findUser.email,
        },
        finishUrl: "https://google.com/",
      };

      const midtransToken = await snap.createTransaction(parameter);
      // console.log(midtransToken);
      res
        .status(201)
        .json({ midtransToken, redirectUrl: midtransToken.redirect_url });
    } catch (error) {
      next(error);
    }
  }

  static async posting(req, res, next) {
    try {
      let { imgUrl, title, caption, tag } = req.body;
      const posting = await Post.create({
        imgUrl,
        title,
        caption,
        tag,
        UserId: req.userId,
      });

      res.status(200).json(posting);
    } catch (error) {
      next(error);
    }
  }

  static async beranda(req, res, next) {
    try {
      const data = await Post.findAll({
        include: [
          {
            model: User,
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async loginByGoogle(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENTID,
      });

      // console.log(ticket);
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          fullName: payload.given_name + payload.family_name,
          password: String(Math.random() * 1000), // ini bebas
        },
      });
      // console.log(user, ">>>>>", created);

      const access_token = signToken({
        id: user.id,
      });

      const status = created ? 201 : 200;

      res.status(status).json({ access_token });

      // const userid = payload["sub"];
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
