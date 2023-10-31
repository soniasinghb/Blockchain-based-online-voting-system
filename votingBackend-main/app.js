const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const voterRoutes = require("./routes/voter");
const authRoutes = require("./routes/auth");
const candidateRoutes = require("./routes/candidate");
const voteRoutes = require("./routes/vote");


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", voterRoutes);
app.use("/api", authRoutes);
app.use("/api", candidateRoutes);
app.use("/api", voteRoutes);

app.listen(process.env.PORT, () => {
    console.log("listening on port:", process.env.PORT);
})