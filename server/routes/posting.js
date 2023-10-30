const postingRoute = require("express").Router();
const PostingController = require("../controllers/postingController");

postingRoute.get("/", PostingController.getPosting);
postingRoute.post("/createPost", PostingController.createPosting);
postingRoute.get("/detail/:id", PostingController.detailPosting);
postingRoute.put("/update/:id", PostingController.update);
postingRoute.delete("/delete/:id", PostingController.delete);
postingRoute.get("/search/:keyword", PostingController.searching);

module.exports = postingRoute;
