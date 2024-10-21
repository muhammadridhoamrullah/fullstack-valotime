const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const errorHandling = require("../middlewares/errorHandler");

const router = require("express").Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/login-google", Controller.loginByGoogle);

router.use(authentication);

// agents
router.get("/agents", Controller.agents);
router.get("/agents/:uuid", Controller.agentsByUUID);

// maps
router.get("/maps", Controller.maps);

// weapons
router.get("/weapons", Controller.weapons);

// gamemodes
router.get("/gameModes", Controller.gameModes);

// rank
router.get("/rank", Controller.rank);

// openAI
router.post("/openAI", Controller.OpenAI);

// midtrans
router.post("/generate-midtrans-token", Controller.generateMidtransToken);

// posting
router.post("/posting", Controller.posting);

router.get("/beranda", Controller.beranda);

router.use(errorHandling);

module.exports = router;
