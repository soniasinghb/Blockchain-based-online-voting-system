const { signIn, signUp, signOut } = require("../controllers/auth");

const router = require("express").Router();


router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/signout", signOut);

module.exports = router;