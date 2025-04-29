const Favourite = require("../models/favourite");
const Home = require("../models/home");


exports.getHome = (req, res, next) => {
   Home.fetchAll().then(([registeredHome, fields]) => {
    // console.log(registeredHome);
    res.render("store/home-list", {
      registeredHome: registeredHome,
      pageTitle: "airbnb Home",
    });
  });
};
exports.getindex = (req, res, next) => {
  Home.fetchAll().then(([registeredHome, fields]) => {
    res.render("store/index", {
      registeredHome: registeredHome,
      pageTitle: "airbnb index",
    });
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Database error");
  });
};


exports.getHome = (req, res, next) => {
  Home.fetchAll().then(([registeredHome, fields]) => {
    // console.log(registeredHome);
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
  Favourite.getFavourite((favourite) => {
    // console.log("favourite list", favourite);
    Home.fetchAll().then(([registeredHome, fields]) => {
      const favouriteHomes = registeredHome.filter((home) =>
        favourite.includes(home.id)
      );
      // console.log("favourite homes", favouriteHomes);
      res.render("store/favourite-list", {
        pageTitle: "favoritelist",
        favouriteHomes: favouriteHomes,
      });
    });
  });
};

exports.postAddTofavourite = (req, res, next) => {
   Favourite.addTofavourite(req.body.id , (err) => {
     if (err) {
       console.log("Error adding to favourite", err);
     }
     console.log("Home added to favourite" ,req.body.id);
   });
   res.redirect("/favourite")
}


exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  // console.log("At home details page", homeId);
  Home.findById(homeId)
    .then(([homes]) => {
      const home = homes[0]; // Fixed the typo here
      if (home) {
         console.log("At home detalis page", home);
        res.render("store/home-detalis", {
          pageTitle: "Home Details",
          home: home,
        });
      } else {
        res.status(404).send("Home not found");
      }
    });
};
