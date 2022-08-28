require("dotenv").config();

const express = require("express");
const boom = require("express-boom");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT;
app.use(helmet());
app.use(compression());
app.use(boom());

app.use("/", require("./routes"));

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is running on port ${PORT}`);
});
