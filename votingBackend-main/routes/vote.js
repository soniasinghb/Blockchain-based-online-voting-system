// const { getVoterById, getVoter } = require("../controllers/voter");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { vote, election, results } = require("../controllers/vote")
const router = require("express").Router();

// router.param("voterId", getVoterById);

router.post("/vote/:voterId/:electionId/:candidateId", vote);
router.get("/elections", election);
router.get("/results/:electionId", results);

module.exports = router;