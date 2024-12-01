const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", () => {
  console.log("connected to DB", (e) => console.log("DB error", e));
});

app.use((req, res, next) => {
  req.user = {
    _id: "674c762893d8bfac2997afc2",
  };
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
