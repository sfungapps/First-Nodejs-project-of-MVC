/*
  blog_index
  blog_details
  blog_create_get
  blog_create_post
  blog_delete
*/

// require database
const nedb = require("../models/blogs");

nedb.loadDatabase();

// render => default folder is "views"

const blog_index = (req, res) => {
	nedb
		.find({})
		.sort({ saveTime: -1 }) //-1 = decending order
		.exec((err, data) => {
			let r = { pageTitle: "All-Blogs", blogs: data };
			if (err) r = err;
			if (r.length == 0) r = "no data";
			res.render("blogs/main", r);
		});
};

const blog_details = (req, res) => {
	nedb.find(req.params, (err, data) => {
		let d = data[0];
		let r = { ...{ pageTitle: "Blog Details" }, blog: d };
		if (err) r = err;
		console.log(d);
		if (d) {
			res.render("blogs/details", r);
		} else {
			res.status(404).render("404", { pageTitle: "404" });
		}
	});
};

const blog_create_get = (req, res) => {
	res.render("blogs/create", { pageTitle: "Create" });
};

const blog_create_post = (req, res) => {
	nedb.insert({ ...req.body, saveTime: Date.now() });
	res.redirect("/");
};

const blog_delete = (req, res) => {
	nedb.remove(req.params, { multi: false }, (err, numRemoved) => {
		if (err) res.json(err);
		res.json({ redirect: "/" });
	});
};

module.exports = {
	blog_index,
	blog_details,
	blog_create_get,
	blog_create_post,
	blog_delete,
};
