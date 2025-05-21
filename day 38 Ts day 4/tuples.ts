// Note: This is a union-typed array, not a tuple
const user: (string | number)[] = [1, "hc"]; // ✅ Elements can be in any order or type (string or number)

// Tuple: fixed order and type
let tuser: [string, number] = ["hc", 1]; // ✅ First is string, second is number

tuser = ["hc", 2]; // ✅ Still matches [string, number]
// tuser = [1, "hc"]; // ❌ Error: order and types do not match the tuple definition

//! Tuples enforce both the type and the order of elements

// RGB color representation using a tuple of three numbers
let rgb: [number, number, number] = [255, 0, 0]; // ✅ This represents the color red

// Defining a tuple type alias
type User = [number, string]; // 👈 First element must be a number, second a string

const user1: User = [1, "hc"]; // ✅ Valid User tuple

// Modifying an element within its correct type
user1[1] = "hc"; // ✅ OK, still a string

// user1.push(true); // ❌ Error: 'true' is not assignable to 'string | number' in this tuple
  
