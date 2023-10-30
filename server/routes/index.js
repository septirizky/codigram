const route = require("express").Router();

route.get("/", (req, res, next) => {
  res.json({ message: "Welcome" });
});

const usersRouter = require("./user");
const postingRouter = require("./posting");

route.use("/user", usersRouter);
route.use("/posting", postingRouter);

module.exports = route;
