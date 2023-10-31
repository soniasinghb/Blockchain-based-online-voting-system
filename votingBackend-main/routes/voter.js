const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getVoterById, getVoter } = require("../controllers/voter");

const router = require("express").Router();

router.param("voterId", getVoterById);

router.get("/voter/:voterId", getVoter);

module.exports = router;