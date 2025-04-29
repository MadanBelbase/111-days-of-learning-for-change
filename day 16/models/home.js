const db = require('../utils/databaseutils');

module.exports = class Home {
  constructor(housename, location, price, image, rating, contact) {
    this.housename = housename;
    this.location = location;
    this.price = price;
    this.image = image;
    this.rating = rating;
    this.contact = contact;
    this.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  save() {
    return db.execute(
      'INSERT INTO homes (id, housename, location, price, image, rating, contact) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [this.id, this.housename, this.location, this.price, this.image, this.rating, this.contact]
    )
    .then(([result]) => {
      console.log('Home added successfully');
    })
    .catch(err => {
      console.error('Error adding home:', err);
    });
  
};
  static fetchAll(callback) {
    return db.execute('SELECT * FROM homes') // return the promise
    
  }
   static findById(homeId) {
    return db.execute('SELECT * FROM homes WHERE id = ?', [homeId])
      
    
  }
  static deleteById(homeId) {
    return db.execute('DELETE FROM homes WHERE id = ?', [homeId])
      
};

}
