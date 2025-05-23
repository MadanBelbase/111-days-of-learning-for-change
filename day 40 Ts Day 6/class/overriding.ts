// Parent class
class Vehicle {
    move(): void {
      console.log("The vehicle is moving");
    }
  }
  
  // Child class
  class Car extends Vehicle {
    move(): void {
      console.log("The car is driving on the road");
    }
  }
  
  // Another child class
  class Bike extends Vehicle {
    move(): void {
      console.log("The bike is speeding through traffic");
    }
  }
  
  // Using the classes
  const genericVehicle = new Vehicle();
  const myCar = new Car();
  const myBike = new Bike();
  
  genericVehicle.move(); // Output: The vehicle is moving
  myCar.move();          // Output: The car is driving on the road
  myBike.move();         // Output: The bike is speeding through traffic
  