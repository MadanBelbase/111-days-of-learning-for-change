const Favourite = require("../models/favourite");
const Home = require("../models/home");
const { ObjectId } = require("mongodb");

// Home Listing
exports.getHome = (req, res, next) => {
  Home.fetchAll()
    .then((registeredHome) => {
      res.render("store/home-list", {
        registeredHome: registeredHome,
        pageTitle: "airbnb Home",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Database error");
    });
};

// Index Page
exports.getindex = (req, res, next) => {
  Home.fetchAll()
    .then((registeredHome) => {
      res.render("store/index", {
        registeredHome: registeredHome,
        pageTitle: "airbnb index",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Database error");
    });
};

// Bookings Page
exports.getbookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "Bookings",
  });
};

exports.getfavoritelist = (req, res, next) => {
  Favourite.getFavourite()
    .then((favourites) => {
      return Home.fetchAll().then((registeredHome) => {
        const favouriteHomeIds = favourites
          .filter(fav => fav.homeId)
          .map(fav => fav.homeId.toString());

        const favouriteHomes = registeredHome.filter(home =>
          favouriteHomeIds.includes(home._id.toString())
        );

        res.render("store/favourite-list", {
          pageTitle: "Favorite List",
          favouriteHomes: favouriteHomes,
        });
      });
    })
    .catch((err) => {
      console.error("Error fetching favorite list:", err);
      res.status(500).send("Failed to fetch favorite list");
    });
};

// Add to Favourite
exports.postAddTofavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  const fav = new Favourite(homeId);

  fav.save()
    .then((result) => {
      console.log("Home added to favourite", result);
      res.redirect("/favourite");
    })
    .catch((err) => {
      console.error("Error adding to favourite", err);
      res.status(500).send("Failed to add to favourite");
    });
};

// Home Details Page
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId)
    .then((home) => {
      if (home) {
        res.render("store/home-detalis", {
          pageTitle: "Home Details",
          home: home,
        });
      } else {
        res.status(404).send("Home not found");
      }
    })
    .catch((err) => {
      console.error("Error fetching home details", err);
      res.status(500).send("Failed to fetch home details");
    });
};
