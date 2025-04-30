const { getDb } = require("../utils/databaseutils");
const { ObjectId } = require("mongodb");

module.exports = class Home {
  constructor(housename, location, price, image, rating, contact, _id = null) {
    this.housename = housename;
    this.location = location;
    this.price = price;
    this.image = image;
    this.rating = rating;
    this.contact = contact;
  
    if (_id) {
      this._id = new ObjectId(_id); // ✅ Now it's defined and works
    }
  }
  
  save() {
    const db = getDb();
    if (this._id) {
      // If _id is defined, update the existing document
      const updateFields  = {
        housename: this.housename,
        location: this.location,
        price: this.price,
        image: this.image,
        rating: this.rating,
        contact: this.contact,
      };
      return db
        .collection("homes")
        .updateOne({ _id: this._id }, { $set: updateFields });
      
    } else {
      return db.collection('homes').insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId) {
    const db = getDb();
    return db.collection('homes')
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId) {
    const db = getDb();
    return db.collection('homes').deleteOne({ _id: new ObjectId(homeId) });
  }
};
