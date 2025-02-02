const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", () => {
  console.log("connected to DB", (e) => console.log("DB error", e));
});

// routes
app.use(express.json());
app.use(cors());
app.use("/", routes);

// celebrate error handler
app.use(errors());

// our centralised handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
