const { getDb } = require("../utils/databaseutils");
const { ObjectId } = require("mongodb");

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = new ObjectId(homeId); // Convert to ObjectId on creation
  }

  save() {
    const db = getDb();
    return db.collection("favourite").insertOne(this);
  }

  static getFavourite() {
    const db = getDb();
    return db.collection("favourite")
      .find()
      .toArray();
  }
  static deleteById(homeId) {
    const db = getDb();
    return db.collection('favourite').deleteOne({ _id: new ObjectId(homeId) });
  }
}
