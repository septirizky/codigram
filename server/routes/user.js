const userRoute = require("express").Router();
const UserController = require("../controllers/userController");

userRoute.get("/", UserController.getUser);
userRoute.post("/register", UserController.register);
userRoute.post("/login", UserController.login);
userRoute.get("/detail/:id", UserController.detailUser);
userRoute.put("/update/:id", UserController.update);
userRoute.delete("/delete/:id", UserController.delete);

module.exports = userRoute;
