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
      registeredHome.push(this); // Add the new home to the array
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
};
