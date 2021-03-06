const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config()


const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});


app.use(require("./routes/api"));
app.use(require("./routes/html"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
