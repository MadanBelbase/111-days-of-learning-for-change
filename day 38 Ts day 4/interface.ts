interface User {
    readonly dbId: number; // Readonly property, cannot be changed after initialization
    id: number;
    name: string;
    age: number;
    email: string;
    startTrail(): string; // Method that returns a string
    getCoupon(coupon: string): number; // Takes a string and returns a number
  }
  
  // Merging interface to add more properties
  interface User {
    githubToken: string;
  }
  interface Admin extends User {
    role: "admin" | "user"; // Union type
  }
  
  const madan: Admin = {
    dbId: 1,
    id: 1,
    name: "Madan",
    age: 25,
    email: "madan@gmail.com",
    role : "admin",
    githubToken: "githubToken",
    startTrail: () => {
      return "Trial started";
    },
    getCoupon: (coupon: string) => {
      return 10;
    }
  };
  
  // madan.dbId = 2; // ❌ Error: Cannot assign to 'dbId' because it is a read-only property
  