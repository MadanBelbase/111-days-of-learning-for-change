// ✅ Typed array of strings — only string values are allowed
const superHeros: string[] = ["Iron Man", "Captain America", "Spider Man", "Black Widow", "Thor"];

// ✅ Typed array of numbers — only numeric values are allowed
const heroPower: number[] = [100, 200, 300, 400, 500];

// ✅ Alternative syntax using generics — equivalent to number[]
const heroPower1: Array<number> = [100, 200, 300, 400, 500];

// ℹ️ Note: Both `number[]` and `Array<number>` are valid; preference depends on team or project style


// ✅ Defining a custom type alias for user objects
type user = {
    name: string;        // User's name as a string
    isActive: boolean;   // User's activity status as a boolean
};

// ✅ Declaring a strongly-typed array to store multiple `user` objects
const allUsers: user[] = [];


// ✅ Adding new heroes to the superHeros array — valid operation
superHeros.push("Hulk");
superHeros.push("Doctor Strange");

// ✅ Adding new power levels to heroPower — valid operation
heroPower.push(600);
heroPower.push(700);


// ❌ Invalid — pushing a plain string into a user array
// allUsers.push(""); 
// ❗️Error: Argument of type 'string' is not assignable to parameter of type 'user'

// ❌ Invalid — empty object doesn't match `user` structure
// allUsers.push({}); 
// ❗️Error (in strict mode): Missing required properties 'name' and 'isActive'

// ✅ Correct way — object matches the `user` structure
allUsers.push({ name: "Peter Parker", isActive: true });


// ✅ Multi-dimensional array (2D array) of numbers
const MlModels: number[][] = [
    [1, 2, 3],  // Model 1: Features or metrics
    [4, 5, 6],  // Model 2: Features or metrics
    [7, 8, 9],  // Model 3: Features or metrics
];

// ℹ️ Useful for representing matrices, datasets, or grid-like structures in ML and data science
