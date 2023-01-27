const express = require("express");
const morgan = require("morgan");
const createErrors = require("http-errors");
const env = require("dotenv");
require("./helpers/db");
env.config();

// Import routes
const AuthRoute = require("./routes/auth.route");
const app = express();

// use middleware
app.use(morgan("dev"));
app.use(express.json());

app.get("/", async (req, res, next) => {
  res.send("Hello from express");
});

// use routes jere
app.use("/auth", AuthRoute);

// Not found error handler
app.use(async (req, res, next) => {
  // Manually handle error
  //   const error = new Error("Not found");
  //   error.status = 404;
  //   next(error);

  // Errors handl using http-errors package
  //   next(createErrors.NotFound("This route does not exist!"));
  next(createErrors.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is running in port ${PORT}`);
});
