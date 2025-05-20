// ✅ A simple function that accepts a number and returns a number
function addTwo(num: number): number {
    return num + 2;
}

// ✅ Accepts a string and returns the uppercase version
function getUpper(val: String) {
    return val.toUpperCase();
    // Tip: Prefer 'string' (lowercase) instead of 'String' (capitalized object type)
    // So use: val: string
}

// ✅ Function with multiple parameters but no return type (implicitly returns void)
function sighUpUse(name: String, email: string, isPaid: boolean) {
    // Note: 'String' should ideally be 'string'
    // Function has no return, so it's void implicitly
}

// ✅ Arrow function with default parameter
let loginUser = (name: string, email: string, isPaid: boolean = false) => {
    // isPaid is optional due to default value
}

// ✅ Function calls
addTwo(4);
getUpper("Madan");
sighUpUse("Maddy", "madan@gmail.com", true);
loginUser("maddy", "maddy@gamil.com", true);


// ✅ Arrow function that accepts and returns a string
const getHello = (s: string): string => {
    return " ";
}


// ✅ Array of strings
const heros = ["thor", "spiderman", "ironman"];
// const heros = [1, 2, 3, 4, 5]; // uncomment to test with numbers instead

// ✅ Mapping over heros array — specifying return type as string
heros.map((hero): string => {
    return `Hero is ${hero}`;
});


//! -----------------------------
//! void
//! -----------------------------

/*
  ❓ When to use 'void' in a function:
  1. When the function does NOT return anything
  2. When it's used for side effects (logging, updating a value, etc.)
  3. When the function is purely for utility (like debug/log functions)
*/

function consoleError(errmsg: string): void {
    console.log(errmsg);
    // return 1; // ❌ Error: Function has return type 'void'
}


//! -----------------------------
//! never
//! -----------------------------

/*
  ❓ When to use 'never':
  1. When the function NEVER returns — e.g., infinite loops
  2. When the function always throws an error
  3. Used to indicate unreachable code or impossible types
*/

function handleError(errmsg: string): never {
    throw new Error(errmsg); // Function execution stops here
}

// ✅ Ensures this file is treated as a module and prevents variable name clashes
export {};
