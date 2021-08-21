const express = require("express");
const blogControllers = require("../controllers/blogControllers");
const router = express.Router();

// this is to parse form-data into object we can use,
// otherwise request data is just undefined
router.use(express.urlencoded({ extended: true }));

router.get("/", blogControllers.blog_index);

// one more 404 handler in blog_details, e.g. "/blogs/asfdsdfsf"

// post request seems cannot be refirected to get request
router.post("/", blogControllers.blog_create_post);
router.get("/create", blogControllers.blog_create_get);
router.get("/:_id", blogControllers.blog_details);
router.delete("/:_id", blogControllers.blog_delete);

module.exports = router;

// _id is the exact "key" in database
// router.get("/single-blog/:_id", (req, res) => {
// 	nedb.find(req.params, (err, data) => {
// 		let r = data;
// 		if (err) r = err;
// 		if (r.length == 0) r = "no data";
// 		res.send(r);
// 	});
// });

// send normal html file to browser
// MUST use absolute path without { root: __dirname }
// res.sendFile("./views/about.html", { root: __dirname });

/*
  router.get("/blogs", (req, res) => {}) is no needed
  becase it's declared in app.use("/blogs", blogRoutes)
  so using "/" here is representing "/blogs"

  this is more resuable in future, because we can just change
  app.use("/blogs", blogRoutes) to something else such as
  app.use("/articles", blogRoutes) 
  and all routers in this page still work
*/
