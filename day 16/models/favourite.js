const fs = require("fs");
const path = require("path");
const rootdir = require("../utils/pathutils");

const favouritedataPath = path.join(rootdir, "data", "favourite.json");

module.exports = class Favourite {

  static addTofavourite(homeid, callback) {
    this.getFavourite((favourite) => {
      if (favourite.includes(homeid)) {
        console.log("Home already in favourite");
      } else {
        favourite.push(homeid);
        console.log("Home added to favourite");
        fs.writeFile(favouritedataPath, JSON.stringify(favourite), callback);
      }
    });
  }

  static getFavourite(callback) {
    const filePath = path.join(rootdir, "data", "favourite.json");
    fs.readFile(filePath, (err, data) => {
      // console.log("file read successfully", err, data);
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

}
