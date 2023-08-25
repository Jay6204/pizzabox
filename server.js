const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/config");
require("colors");
const morgan = require("morgan");

//config dotenv
dotenv.config();

//connection mongodb
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

//route
app.use("/api/pizzas", require("./routes/pizzaRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoute"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("/", (req, res) => {
  res.send("<h1>Hello From Node server Body</h1>");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running On ${process.env.NODE_ENV} mode on port no ${process.env.PORT}`
      .bgMagenta.white
  );
});
