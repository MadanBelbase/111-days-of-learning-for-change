const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/home-edit", {
    pageTitle: "Add a New Home",
    editing: false,
  });
};

exports.gethostHome = (req, res, next) => {
  Home.fetchAll().then((registeredHome) => {
    res.render("host/host-home-list", {
      registeredHome: registeredHome,
      pageTitle: "Host Home List",
    });
  });
};

exports.posthomeadded = (req, res, next) => {
  const {  housename, location, price, image, rating, contact } = req.body;
  const home = new Home(housename, location, price, image, rating, contact);
  home.save().then(() => {
    console.log("Home added successfully", home);
  });

  // 🔧 FIX: fetch data again before rendering host-home-list
  Home.fetchAll().then((registeredHome) => {
    res.render("host/host-home-list", {
      registeredHome: registeredHome,
      pageTitle: "Host Home List",
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/host/host-home-list");
    }

    res.render("host/home-edit", {
      pageTitle: "Edit Home",
      editing: editing,
      home: home,
    });
  });
};


exports.postEdithomeadded = (req, res, next) => {
  const { id, housename, location, price, image, rating, contact } = req.body;

  const updatedHome = new Home(
    housename,
    location,
    price,
    image,
    rating,
    contact,
    id
  );

  // 🔐 Ensure ID is set correctly as a MongoDB ObjectId
  if (id) {
    updatedHome._id = new ObjectId(id);
  }

  updatedHome.save()
    .then(result => {
      console.log("✅ Home updated successfully:", result);
      res.redirect("/host/host-home-list");
    })
    .catch(err => {
      console.error("❌ Error updating home:", err);
      res.status(500).send("Failed to update home");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  console.log("Home deleted successfully", homeId);
  Home.deleteById(homeId, (err) => {
    if (err) {
      console.error("Error deleting home", err);
    }
    // Fetch updated home list after deletion
    Home.fetchAll().then((registeredHome) => {
      res.render("host/host-home-list", {
        registeredHome: registeredHome,
        pageTitle: "Host Home List",
      });
    });
  });
};
