const Home = require("../models/home");


exports.getHome = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
    console.log(registeredHome);
    res.render("store/home-list", {
      registeredHome: registeredHome,
      pageTitle: "airbnb Home",
    });
  });
};
exports.getindex = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
    res.render("store/index", {
      registeredHome: registeredHome,
      pageTitle: "airbnb index",
    });
  });
};
exports.getHome = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
    console.log(registeredHome);
    res.render("store/home-list", {
      registeredHome: registeredHome,
      pageTitle: "airbnb Home",
    });
  });
};

exports.getbookings = (req, res, next) => {
    res.render("store/bookings", {
      pageTitle: "Bookings",
    });
};

exports.getfavoritelist = (req, res, next) => {
  res.render("store/favourite-list", {
    pageTitle: "favoritelist",
  });
};
