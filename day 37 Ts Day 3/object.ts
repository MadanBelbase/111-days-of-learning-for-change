// ✅ Basic object declaration (commented out for reference)
// const User = {
//     name: "John",
//     age: 30,
//     isActive: true,
// };

// ✅ A function accepting a destructured object as argument with inline type annotations
// function createUser({ name: string, isActive: boolean }) {}

// ✅ Function returning an object with specific structure using inline type annotation
// function createCourse(): { name: string; price: number } {
//     return { name: "Course", price: 10 };
// }

// ✅ Correct call with matching object structure
// createUser({ name: "John", isActive: true });


//! ------------------ TYPE ALIAS ------------------

// ✅ Creating a custom type alias for a user object
// type User = {
//     name: string;
//     email: string;
//     isActive: boolean;
// };

// ✅ Function that expects a `User` type object as its parameter
// function createUser(user: User) {}

// ✅ Function call with a valid user object
// createUser({ name: "maddy", email: "maddy@gmail.com", isActive: true });


//! ------------------ ADVANCED TYPE FEATURES ------------------

type User = {
    readonly _id: string;              // 🔒 `readonly` makes `_id` immutable after initialization
    name: string;
    email: string;
    isActive: boolean;
    creditCardDetails?: number;        // ❓ Optional property — may or may not exist
};

// ✅ Creating an object conforming to the `User` type
let myUser: User = {
    _id: "123",                        // ✅ _id is set once
    name: "Maddy",
    email: "maddy@gmail.com",
    isActive: false,
    creditCardDetails: 1234567890      // Optional field provided here
};

// ✅ Allowed: Changing mutable properties
myUser.email = "maddy123@gmail.com"; 

// ❌ Not allowed: `_id` is readonly
// myUser._id = "456"; // ❗️ Error: Cannot assign to '_id' because it is a read-only property


//! ------------------ INTERSECTION TYPES ------------------

// ✅ Define separate types for different parts of card info
type cardNumber = {
    cardnumber: string;
};

type cardDate = {
    cardDate: string;
};

// ✅ Combine multiple types into one using `&` (intersection)
type cardDetails = cardNumber & cardDate & {
    cvv: number; // 💳 Add additional fields directly during intersection
};

// 🔥 Intersection types help create highly structured and reusable types


