const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getAllCanditatesFromConstituency } = require("../controllers/candidate");
const { getVoterById, getVoter } = require("../controllers/voter");

const router = require("express").Router();

router.param("voterId", getVoterById);

router.get("/candidate/:voterId", getAllCanditatesFromConstituency);

module.exports = router;