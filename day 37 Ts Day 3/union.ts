//! -----------union-----------

let score: number | string = 33;
score = 44;
score = "55";

type newUser = { 
    name: string;
    email: string;
};

type Admin = {
    username: string;
    id: number;
};

// let maddy: newUser | Admin = { name: "maddy", id : 1}; 
// ❌ Error: Type '{ name: string; id: number; }' is not assignable to type 'newUser | Admin'.
// Because this object has properties from both newUser and Admin, but matches neither fully.

let maddy: newUser | Admin;
maddy = { username: "maddy", id : 1}; // valid
maddy = { name: "maddy", email: "maddy@gmail.com" }; // also valid

// Example function with union parameter
function getDbId(id: number | string) {
    if (typeof id === "string") {
        id.toLowerCase(); // ✅ Safe: id is string here
    } else {
        id.toFixed(); // ✅ Safe: id is number here
    }
}

getDbId(3);
getDbId("3");

// Arrays with union types
const data: number[] | string[] = [1, 2, 3, 4, 5]; // valid: all numbers
const data1: number[] | string[] = ["1", "2", "3"]; // valid: all strings
// const data2: number[] | string[] = [1, "2", 3]; 
// ❌ Error: mixed types not allowed here because either all must be numbers OR all strings

const data4: (number | string)[] = [1, "2", 3, "4"]; // valid: array of union types

let pi: 3.14 | 3.14159 | 3.14159265358979323846 = 3.14; // valid
// pi = 7.9; // ❌ Error: 7.9 not assignable to those specific literals

let seatAllotment: "aisle" | "middle" | "window";
seatAllotment = "aisle"; // valid
seatAllotment = "middle"; // valid
// seatAllotment = "aisle1"; // ❌ Error: not assignable to allowed literal types

//! --------------------- ADVANCED CONCEPTS ---------------------

// 1️⃣ Type Guards using 'in' operator:

function printUser(user: newUser | Admin) {
    // Why? 
    // Because newUser and Admin have different properties.
    // Use 'in' to check which property exists to narrow the type safely.
    if ("email" in user) {
        console.log(`New User: ${user.name}, Email: ${user.email}`);
    } else {
        console.log(`Admin User: ${user.username}, ID: ${user.id}`);
    }
}

printUser({ name: "Mady", email: "mady@gmail.com" });  // recognized as newUser
printUser({ username: "admin01", id: 101 });           // recognized as Admin

// If you try to access 'email' without narrowing:
// function printUserWrong(user: newUser | Admin) {
//     console.log(user.email); 
     // ❌ Error: Property 'email' does not exist on type 'newUser | Admin'.
     // TS doesn't know if user is newUser or Admin.
// }

