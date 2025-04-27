const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/home-add", { pageTitle: "Register Your Home" });
};

exports.gethostHome = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
    console.log(registeredHome);
    res.render("host/host-home-list", {
      registeredHome: registeredHome,
      pageTitle: "host-home-list",
    });
  });
};


exports.posthomeadded = (req, res, next) => {
  const { housename, location, price, image, rating, contact } = req.body;
  const home = new Home(housename, location, price, image, rating, contact);
  home.save();
  res.render("host/home-added", { pageTitle: "Home Added Successfully" });
};

