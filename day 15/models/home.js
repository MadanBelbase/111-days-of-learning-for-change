const fs = require("fs");
const path = require("path");
const rootdir = require("../utils/pathutils");
const { error } = require("console");
const { console } = require("inspector");

// fake database
let registeredHome = []; // Array to store registered homes

module.exports = class Home {
  constructor(housename, location, price, image, rating, contact) {
    this.housename = housename;
    this.location = location;
    this.price = price;
    this.image = image;
    this.rating = rating;
    this.contact = contact;
  }

  save() {
    Home.fetchAll((registeredHome) => {
      if (this.id) // edit home
        {
            registeredHome = registeredHome.map((home) => {
              if (home.id === this.id) {
                home.id === this.id ? this :  home // Update the existing home with the new data
              }
              return home;
            }
            );
        }
        else // new home
        {
          this.id = Math.random().toString(); // Generate a random ID for the home
          registeredHome.push(this); // Add the new home to the array
        }
      fs.writeFile(
        path.join(rootdir, "data", "homes.json"),
        JSON.stringify(registeredHome),
        (err) => {
          if (err) {
            console.error("Error writing to file", err);
          } else {
            console.log("Data written successfully");
          }
        }
      );
    });
  }

  static fetchAll(callback) {
    // Read the registered homes from the file
    const filePath = path.join(rootdir, "data", "homes.json");
    fs.readFile(filePath, (err, data) => {
      console.log("file read successfully", err, data);
      callback(!err ? JSON.parse(data) : []); // Parse the data and pass it to the callback
    });
  }
   static findById(homeId, callback) {
    Home.fetchAll((homes) => {
      const homefound = homes.find((home) => home.id === homeId);
      callback(homefound); // Pass the found home to the callback
    });
  }

  static deleteById(homeId, callback) {
    Home.fetchAll((homes) => {
      const updatedHomes = homes.filter((home) => home.id !== homeId);
      fs.writeFile(
        path.join(rootdir, "data", "homes.json"),
        JSON.stringify(updatedHomes),
        (err) => {
          if (err) {
            console.error("Error writing to file", err);
          } else {
            callback(); // Call the callback after deletion
          }
        }
      );
    });
  }

};


