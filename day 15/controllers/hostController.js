const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/home-edit", {
    pageTitle: "Add a New Home",
    editing: false,
  });
};

exports.gethostHome = (req, res, next) => {
  Home.fetchAll((registeredHome) => {
    res.render("host/host-home-list", {
      registeredHome: registeredHome,
      pageTitle: "Host Home List",
    });
  });
};

exports.posthomeadded = (req, res, next) => {
  const { housename, location, price, image, rating, contact } = req.body;
  const home = new Home(housename, location, price, image, rating, contact);
  home.save();

  // 🔧 FIX: fetch data again before rendering host-home-list
  Home.fetchAll((registeredHome) => {
    res.render("host/host-home-list", {
      registeredHome: registeredHome,
      pageTitle: "Host Home List",
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId, (home) => {
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

  const updatedHome = new Home(housename, location, price, image, rating, contact);
  updatedHome.id = id; // assign ID manually for update

  updatedHome.save(); // ✅ Use instance method

  console.log("Home updated successfully", updatedHome);
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
 
      console.log( "Home deleted successfully", homeId);
      Home.deleteById(homeId, (err) => {
        if (err) {
          console.error("Error deleting home", err);
        }
        // Fetch updated home list after deletion
        Home.fetchAll((registeredHome) => {
          res.render("host/host-home-list", {
            registeredHome: registeredHome,
            pageTitle: "Host Home List",
          });
       });
       });
       
      }
 