const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("addHome", { pageTitle: "Register Your Home" });
};

exports.posthomeadded = (req, res, next) => {
  const { housename, location, price, image, rating, contact } = req.body;
  const home = new Home(housename, location, price, image, rating, contact);
  home.save();
  res.render("homeadded", { pageTitle: "Home Added Successfully" });
};

exports.getHome = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
    console.log(registeredHome);
    res.render("home", {
      registeredHome: registeredHome,
      pageTitle: "airbnb Home",
    });
  });
};

