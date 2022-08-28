require("dotenv").config();

const boom = require("express-boom");
const compression = require("compression");
const helmet = require("helmet");

const express = require("express");
const app = express();

const PORT = process.env.PORT;
app.use(helmet());
app.use(compression());
app.use(boom());

app.use("/", require("./routes"));

app.listen(PORT, "127.0.0.1", () => {
  console.log("listening on port 3000");
});
