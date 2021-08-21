const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
// for envrionment details in terminal
const morgan = require("morgan");
const port = process.env.PORT || 5000;

// register view engine
// render => default folder is "views"
// for another folder name, add the following
// app.set("views", "folderName");
app.set("view engine", "ejs");

// user is only allowed to access files in folder "public"
app.use(express.static("public"));
// app.use(express.json());
app.use(morgan("dev"));

app.listen(port, () => {
	console.log(`Server running at port ${port}`);
});

app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/about", (req, res) => {
	res.render("about", { pageTitle: "About" });
});

// "blogRoutes" is only applied to routers starting with "/blogs"
app.use("/blogs", blogRoutes);

// use takes any request, so it's the last one for 404
app.use((req, res) => {
	console.log("app.js 404");
	res.status(404).render("404", { pageTitle: "404" });
});
